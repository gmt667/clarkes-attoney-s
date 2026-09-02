"use client";

import { Studio } from "sanity";
import sanityConfig from "@/sanity.config";

export default function StudioClient() {
  return <Studio config={sanityConfig} />;
}
