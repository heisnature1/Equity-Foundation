import { NextResponse } from "next/server";
import { createSupabasePublicServerClient } from "@/lib/supabase-public-server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const submission = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    subject: String(formData.get("subject") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  if (Object.values(submission).some((value) => !value)) {
    return NextResponse.json({ error: "All contact fields are required." }, { status: 400 });
  }

  const supabase = createSupabasePublicServerClient();
  const { error } = await supabase.from("contact_submissions").insert(submission);

  if (error) {
    return NextResponse.json({ error: "The message could not be submitted." }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/contact?submitted=1", request.url), 303);
}
