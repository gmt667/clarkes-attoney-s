import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { getPrismaClient } from "@/lib/prisma";

const enquiryRecipients = [
  "info@clarkesattorneys.mw",
  "geoffrey@clarkesattorneys.mw",
] as const;

const verifiedSender =
  process.env.RESEND_FROM_EMAIL ?? "Clarkes Attorneys <noreply@clarkesattorneys.mw>";

const rateLimitWindowMs = 15 * 60 * 1000;
const maxSubmissionsPerWindow = 5;
const submissionAttempts = new Map<string, { count: number; resetAt: number }>();

const contactSchema = z.object({
  name: z.string().trim().min(2, "Full name is required.").max(120),
  email: z.string().trim().email("A valid email address is required.").max(180),
  phone: z.string().trim().min(7, "Phone number is required.").max(40),
  subject: z.string().trim().min(3, "Subject is required.").max(160),
  legalService: z.string().trim().min(2, "Please select or enter a legal service.").max(160),
  message: z.string().trim().min(20, "Please provide a short message.").max(4000),
  source: z.string().trim().max(80).default("Website enquiry form"),
  company: z.string().trim().max(0).optional(),
  startedAt: z.coerce.number().optional(),
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderEmail(submission: z.infer<typeof contactSchema>) {
  const safe = {
    name: escapeHtml(submission.name),
    email: escapeHtml(submission.email),
    phone: escapeHtml(submission.phone),
    subject: escapeHtml(submission.subject),
    legalService: escapeHtml(submission.legalService),
    source: escapeHtml(submission.source),
    message: escapeHtml(submission.message).replace(/\n/g, "<br />"),
  };

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #172033; max-width: 680px; padding: 24px; border: 1px solid #e7dbc6; border-radius: 14px; background-color: #ffffff;">
      <h2 style="color: #0B192C; margin: 0 0 16px; font-size: 24px; border-bottom: 2px solid #B89343; padding-bottom: 12px;">New Clarkes Attorneys Website Enquiry</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 0 0 18px;">
        <tbody>
          <tr><td style="padding: 8px 0; color: #64748b; width: 170px;">Full Name</td><td style="padding: 8px 0;"><strong>${safe.name}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Email Address</td><td style="padding: 8px 0;"><a href="mailto:${safe.email}" style="color: #0B4A6F;">${safe.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Phone Number</td><td style="padding: 8px 0;">${safe.phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Subject</td><td style="padding: 8px 0;">${safe.subject}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Legal Service Required</td><td style="padding: 8px 0;">${safe.legalService}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Source</td><td style="padding: 8px 0;">${safe.source}</td></tr>
        </tbody>
      </table>
      <div style="background: #FAF8F5; padding: 18px; border-radius: 12px; border-left: 4px solid #B89343;">
        <h3 style="color: #0B192C; margin: 0 0 10px; font-size: 16px;">Message</h3>
        <div>${safe.message}</div>
      </div>
      <p style="font-size: 13px; color: #64748b; margin-top: 20px;">Reply directly to this email to respond to the client.</p>
    </div>
  `;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the form and complete all required fields.",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const submission = parsed.data;
  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  const now = Date.now();
  const attempt = submissionAttempts.get(clientIp);

  if (attempt && attempt.resetAt > now && attempt.count >= maxSubmissionsPerWindow) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries were submitted. Please try again later." },
      { status: 429 }
    );
  }

  submissionAttempts.set(clientIp, {
    count: attempt && attempt.resetAt > now ? attempt.count + 1 : 1,
    resetAt: attempt && attempt.resetAt > now ? attempt.resetAt : now + rateLimitWindowMs,
  });

  if (submission.company) {
    return NextResponse.json(
      { ok: false, error: "Your enquiry could not be accepted." },
      { status: 400 }
    );
  }

  if (submission.startedAt && now - submission.startedAt < 1000) {
    return NextResponse.json(
      { ok: false, error: "Your enquiry could not be accepted. Please try again." },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email delivery is not configured yet. Please add RESEND_API_KEY on the server.",
      },
      { status: 503 }
    );
  }

  let savedToDb = false;
  const prisma = getPrismaClient();

  if (prisma) {
    try {
      await prisma.contactSubmission.create({
        data: {
          name: submission.name,
          email: submission.email,
          phone: submission.phone,
          subject: submission.subject,
          legalService: submission.legalService,
          message: submission.message,
          source: submission.source,
        } as never,
      });
      savedToDb = true;
    } catch (error) {
      console.error("Failed to save enquiry:", error);
    }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: verifiedSender,
      to: [...enquiryRecipients],
      subject: `[Website Enquiry] ${submission.subject}`,
      replyTo: submission.email,
      html: renderEmail(submission),
      text: [
        "New Clarkes Attorneys Website Enquiry",
        "",
        `Full Name: ${submission.name}`,
        `Email Address: ${submission.email}`,
        `Phone Number: ${submission.phone}`,
        `Subject: ${submission.subject}`,
        `Legal Service Required: ${submission.legalService}`,
        `Source: ${submission.source}`,
        "",
        "Message:",
        submission.message,
      ].join("\n"),
    });

    if (result.error) {
      throw result.error;
    }

    return NextResponse.json({
      ok: true,
      savedToDb,
      recipients: enquiryRecipients,
      message: "Your enquiry has been accepted for delivery.",
    });
  } catch (error) {
    console.error("Failed to send enquiry email via Resend:", error);
    return NextResponse.json(
      {
        ok: false,
        savedToDb,
        error:
          "Your enquiry could not be sent. Please try again or contact Clarkes Attorneys directly.",
      },
      { status: 502 }
    );
  }
}
