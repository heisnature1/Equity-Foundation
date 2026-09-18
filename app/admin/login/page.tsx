import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminLoginPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <main className="admin-shell">
      <div className="page-card admin-card">
        <p className="eyebrow">Equity Bridge Foundation</p>
        <h1 className="section-title">Admin sign in</h1>
        <p>Sign in to manage enquiries, legal-help requests, and public resources.</p>
        <AdminLoginForm />
      </div>
    </main>
  );
}
