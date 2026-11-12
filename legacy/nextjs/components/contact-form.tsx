"use client";

import { useEffect, useState } from "react";
import { contactEmail, primaryPhoneHref } from "@/lib/navigation";
import { ArrowRight, CheckCircle, Loader2, XCircle } from "lucide-react";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  legalService: string;
  message: string;
  company: string;
  startedAt: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  legalService: "",
  message: "",
  company: "",
  startedAt: "",
};

const legalServices = [
  "Litigation",
  "Corporate Advisory",
  "Property and Real Estate",
  "Intellectual Property",
  "Public Law",
  "Alternative Dispute Resolution",
  "Other Legal Matter",
];

function validate(values: FormValues) {
  const errors: FormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!emailPattern.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.phone.trim().length < 7) errors.phone = "Please enter a phone number.";
  if (values.subject.trim().length < 3) errors.subject = "Please enter a subject.";
  if (values.legalService.trim().length < 2) {
    errors.legalService = "Please choose the legal service required.";
  }
  if (values.message.trim().length < 20) {
    errors.message = "Please provide a little more detail about your enquiry.";
  }

  return errors;
}

export function ContactForm({ source = "Website enquiry form" }: { source?: string }) {
  const [service, setService] = useState<"checking" | "ready" | "unavailable">("checking");
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    fetch("/api/contact", { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        const data = await response.json();
        if (active) setService(response.ok && data.ok === true ? "ready" : "unavailable");
      })
      .catch(() => { if (active) setService("unavailable"); })
      .finally(() => clearTimeout(timeout));
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, []);
  const [values, setValues] = useState({
    ...INITIAL_VALUES,
    startedAt: "",
  });
  useEffect(() => {
    setValues((previous) => ({ ...previous, startedAt: Date.now().toString() }));
  }, []);
  const [errors, setErrors] = useState<FormErrors>({});
  const [state, setState] = useState<FormState>({ status: "idle" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.status === "submitting" || service !== "ready") return;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setState({
        status: "error",
        message: "Please correct the highlighted fields before submitting.",
      });
      return;
    }

    setState({ status: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source }),
        signal: AbortSignal.timeout(20000),
      });

      const data = (await response.json().catch(() => ({ ok: false }))) as {
        ok: boolean;
        message?: string;
        error?: string;
        details?: Partial<Record<keyof FormValues, string[]>>;
      };

      if (!response.ok || !data.ok) {
        const serverErrors = Object.fromEntries(
          Object.entries(data.details ?? {}).map(([field, messages]) => [
            field,
            messages?.[0],
          ])
        ) as FormErrors;
        setErrors(serverErrors);
        setState({
          status: "error",
          message:
            data.error ??
            "Your enquiry could not be sent. Please check the form and try again.",
        });
        return;
      }

      setState({
        status: "success",
        message:
          data.message ??
          "Your enquiry has been accepted for delivery to Clarkes Attorneys.",
      });
      setValues({ ...INITIAL_VALUES, startedAt: Date.now().toString() });
      setErrors({});
    } catch {
      setState({
        status: "error",
        message:
          "Could not connect to the enquiry service. Please try again shortly.",
      });
    }
  }

  const isSubmitting = state.status === "submitting";
  const draftBody = `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nService: ${values.legalService}\n\n${values.message}`;
  const emailDraft = `mailto:${contactEmail}?subject=${encodeURIComponent(values.subject || "Website enquiry")}&body=${encodeURIComponent(draftBody)}`;

  if (state.status === "success") {
    return (
      <div className="contact-form contact-form-feedback contact-form-success" role="status">
        <CheckCircle className="feedback-icon" />
        <h3>Enquiry accepted</h3>
        <p>{state.message}</p>
        <button
          type="button"
          className="button button-ghost"
          onClick={() => setState({ status: "idle" })}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <h3>Send an enquiry</h3>
      <p className="form-intro">
        Tell us briefly how we can help. The firm will review your enquiry and contact you.
      </p>
      <div className="form-service-status" role="status">
        {service === "checking" ? <p>Checking enquiry availability…</p> : null}
        {service === "unavailable" ? <p>Online enquiries are currently unavailable. Please email or call the firm. Your message has not been sent.</p> : null}
        <p><a href={emailDraft}>Email the firm{values.message ? " with your draft" : ""}</a> · <a href={primaryPhoneHref}>Call the firm</a></p>
        {service === "unavailable" ? <small>The email link opens your email app. Review the message and send it there.</small> : null}
      </div>

      {state.status === "error" ? (
        <div className="form-feedback form-error" role="alert">
          <XCircle size={16} />
          <p>{state.message}</p>
        </div>
      ) : null}

      <input
        className="hidden-field"
        name="company"
        type="text"
        value={values.company}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <input name="startedAt" type="hidden" value={values.startedAt} readOnly />

      <label>
        Full name
        <input
          name="name"
          type="text"
          placeholder="Your full name"
          required
          minLength={2}
          maxLength={120}
          value={values.name}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name ? <span className="field-error" id="name-error">{errors.name}</span> : null}
      </label>

      <label>
        Email address
        <input
          name="email"
          type="email"
          placeholder="Your email address"
          required
          maxLength={180}
          value={values.email}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email ? <span className="field-error" id="email-error">{errors.email}</span> : null}
      </label>

      <label>
        Phone number
        <input
          name="phone"
          type="tel"
          placeholder="+265 ..."
          required
          minLength={7}
          maxLength={40}
          value={values.phone}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone ? <span className="field-error" id="phone-error">{errors.phone}</span> : null}
      </label>

      <label>
        Subject
        <input
          name="subject"
          type="text"
          placeholder="Brief subject of your enquiry"
          required
          minLength={3}
          maxLength={160}
          value={values.subject}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject ? <span className="field-error" id="subject-error">{errors.subject}</span> : null}
      </label>

      <label>
        Legal service required
        <select
          name="legalService"
          required
          value={values.legalService}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.legalService)}
          aria-describedby={errors.legalService ? "legal-service-error" : undefined}
        >
          <option value="">Select a service</option>
          {legalServices.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.legalService ? (
          <span className="field-error" id="legal-service-error">{errors.legalService}</span>
        ) : null}
      </label>

      <label>
        Message
        <textarea
          name="message"
          rows={5}
          placeholder="Please describe the matter briefly. Do not include highly sensitive details until the firm confirms representation."
          required
          minLength={20}
          maxLength={4000}
          value={values.message}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? <span className="field-error" id="message-error">{errors.message}</span> : null}
      </label>

      <button className="button button-solid" type="submit" disabled={isSubmitting || service !== "ready"}>
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="spin" />
            Sending...
          </>
        ) : (
          <>
            Send enquiry
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
