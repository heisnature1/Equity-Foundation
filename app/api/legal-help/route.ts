import { NextResponse } from "next/server";
import { createSupabasePublicServerClient } from "@/lib/supabase-public-server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const submission = {
    full_name: String(formData.get("fullName") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim() || null,
    contact_method: String(formData.get("contactMethod") ?? "").trim(),
    issue: String(formData.get("issue") ?? "").trim(),
    details: String(formData.get("details") ?? "").trim(),
    language: String(formData.get("language") ?? "").trim(),
  };

  if (
    !submission.full_name ||
    !submission.phone ||
    !submission.contact_method ||
    !submission.issue ||
    !submission.details ||
    !submission.language
  ) {
    return NextResponse.json(
      { error: "Please complete all required fields." },
      { status: 400 },
    );
  }

  const supabase = createSupabasePublicServerClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Legal-help submissions are not configured." },
      { status: 503 },
    );
  }

  const { error } = await supabase
    .from("legal_help_requests")
    .insert(submission);

  if (error) {
    return NextResponse.json(
      { error: "The request could not be submitted." },
      { status: 500 },
    );
  }

  return NextResponse.redirect(
    new URL("/legal-help?submitted=1", request.url),
    303,
  );
}
