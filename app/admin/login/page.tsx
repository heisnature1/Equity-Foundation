import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { hasSupabaseConfig } from "@/lib/supabase-env";

export default async function AdminLoginPage() {
  if (!hasSupabaseConfig()) {
    return (
      <main className="admin-shell">
        <div className="page-card admin-card">
          <p className="eyebrow">Equity Bridge Foundation</p>
          <h1 className="section-title">Admin sign in not configured</h1>
          <p>
            This project is missing its Supabase client configuration. Add the values in your environment file to enable admin access.
          </p>
          <p className="form-error">NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are required.</p>
        </div>
      </main>
    );
  }

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
