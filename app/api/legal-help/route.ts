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
    region: String(formData.get("region") ?? "").trim() || null,
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

  let { error } = await supabase.from("legal_help_requests").insert(submission);

  // Resilience: if the optional `region` column has not been added yet (an older
  // schema), PostgREST rejects the whole insert. Drop the field and retry so a
  // missing optional column can never block a visitor's submission.
  if (error && error.code === "PGRST204" && /region/i.test(error.message)) {
    const { region: _region, ...withoutRegion } = submission;
    void _region;
    ({ error } = await supabase.from("legal_help_requests").insert(withoutRegion));
  }

  if (error) {
    console.error("legal-help insert failed:", error);
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
