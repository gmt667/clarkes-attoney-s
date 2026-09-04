import { defineArrayMember, defineField, defineType } from "sanity";

export const schemaTypes = [
  defineType({
    name: "siteValue",
    title: "Site Value",
    type: "document",
    fields: [
      defineField({
        name: "title",
        type: "string",
        validation: (Rule) => Rule.required().max(80),
      }),
      defineField({
        name: "text",
        type: "text",
        rows: 4,
        validation: (Rule) => Rule.required().max(400),
      }),
      defineField({
        name: "order",
        type: "number",
        hidden: true,
      }),
    ],
  }),
  defineType({
    name: "practiceArea",
    title: "Practice Area",
    type: "document",
    fields: [
      defineField({
        name: "title",
        type: "string",
        validation: (Rule) => Rule.required().max(100),
      }),
      defineField({
        name: "description",
        type: "text",
        rows: 3,
        validation: (Rule) => Rule.required().max(250),
      }),
      defineField({
        name: "items",
        type: "array",
        of: [defineArrayMember({ type: "string" })],
        validation: (Rule) => Rule.required().min(1),
      }),
      defineField({
        name: "order",
        type: "number",
        hidden: true,
      }),
    ],
  }),
  defineType({
    name: "attorney",
    title: "Attorney",
    type: "document",
    fields: [
      defineField({
        name: "name",
        type: "string",
        validation: (Rule) => Rule.required().max(100),
      }),
      defineField({
        name: "role",
        type: "string",
        validation: (Rule) => Rule.required().max(100),
      }),
      defineField({
        name: "bio",
        type: "text",
        rows: 5,
        validation: (Rule) => Rule.required().max(1000),
      }),
      defineField({
        name: "email",
        type: "string",
        validation: (Rule) => Rule.required().email(),
      }),
      defineField({
        name: "order",
        type: "number",
        hidden: true,
      }),
    ],
  }),
  defineType({
    name: "supportTeamMember",
    title: "Professional Support Team Member",
    type: "document",
    fields: [
      defineField({
        name: "name",
        title: "Full Name",
        type: "string",
        validation: (Rule) => Rule.required().max(100),
      }),
      defineField({
        name: "position",
        title: "Official Position",
        type: "string",
        validation: (Rule) => Rule.required().max(100),
      }),
      defineField({
        name: "description",
        title: "Description",
        type: "text",
        rows: 3,
        validation: (Rule) => Rule.required().max(360),
      }),
      defineField({
        name: "email",
        title: "Company Email",
        type: "string",
        validation: (Rule) => Rule.required().email(),
      }),
      defineField({
        name: "image",
        title: "Profile Image Path",
        type: "string",
        description: "Use a verified local path such as /images/support-team/alice-kapindula.jpg.",
      }),
      defineField({
        name: "order",
        type: "number",
        hidden: true,
      }),
    ],
  }),
  defineType({
    name: "post",
    title: "Blog Post",
    type: "document",
    fields: [
      defineField({
        name: "title",
        type: "string",
        validation: (Rule) => Rule.required().max(120),
      }),
      defineField({
        name: "slug",
        type: "slug",
        options: { source: "title" },
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "excerpt",
        type: "text",
        rows: 4,
        validation: (Rule) => Rule.required().max(300),
      }),
      defineField({
        name: "publishedAt",
        type: "datetime",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "category",
        type: "string",
        validation: (Rule) => Rule.required().max(80),
      }),
    ],
  }),
  defineType({
    name: "client",
    title: "Client",
    type: "document",
    fields: [
      defineField({
        name: "name",
        type: "string",
        validation: (Rule) => Rule.required().max(120),
      }),
      defineField({
        name: "order",
        type: "number",
        hidden: true,
      }),
    ],
  }),
  defineType({
    name: "document",
    title: "Document",
    type: "document",
    fields: [
      defineField({
        name: "title",
        type: "string",
        validation: (Rule) => Rule.required().max(120),
      }),
      defineField({
        name: "order",
        type: "number",
        hidden: true,
      }),
    ],
  }),
  defineType({
    name: "contactDetails",
    title: "Contact Details",
    type: "document",
    fields: [
      defineField({
        name: "phoneNumbers",
        type: "array",
        of: [defineArrayMember({ type: "string" })],
        validation: (Rule) => Rule.required().min(1),
      }),
      defineField({
        name: "email",
        type: "string",
        validation: (Rule) => Rule.required().email(),
      }),
      defineField({
        name: "poBox",
        type: "string",
        validation: (Rule) => Rule.required().max(120),
      }),
      defineField({
        name: "location",
        type: "text",
        rows: 3,
        validation: (Rule) => Rule.required().max(300),
      }),
    ],
  }),
];
