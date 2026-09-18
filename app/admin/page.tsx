import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: string;
  created_at: string;
};

type LegalHelpRequest = {
  id: string;
  full_name: string;
  phone: string;
  issue: string;
  status: string;
  created_at: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const [{ data: contactSubmissions }, { data: legalHelpRequests }] = await Promise.all([
    supabase
      .from("contact_submissions")
      .select("id, name, email, subject, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("legal_help_requests")
      .select("id, full_name, phone, issue, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const contacts = (contactSubmissions ?? []) as ContactSubmission[];
  const requests = (legalHelpRequests ?? []) as LegalHelpRequest[];

  return (
    <main className="admin-shell">
      <div className="container">
        <div className="admin-heading">
          <div>
            <p className="eyebrow">Protected workspace</p>
            <h1 className="section-title">Admin dashboard</h1>
            <p>Signed in as {user.email}</p>
          </div>
          <form action="/auth/signout" method="post">
            <button type="submit" className="button button--secondary">Sign out</button>
          </form>
        </div>

        <div className="card-grid card-grid--three">
          <article className="page-card admin-list-card">
            <p className="eyebrow">Inbox</p>
            <h2>Contact enquiries ({contacts.length})</h2>
            <a className="text-link" href="/admin/submissions/contact">Open inbox</a>
            {contacts.length ? (
              <ul className="admin-list">
                {contacts.map((submission) => (
                  <li key={submission.id}>
                    <strong>{submission.subject}</strong>
                    <span>{submission.name} · {submission.email}</span>
                    <small>{submission.status} · {formatDate(submission.created_at)}</small>
                  </li>
                ))}
              </ul>
            ) : <p>No contact enquiries yet.</p>}
          </article>
          <article className="page-card admin-list-card">
            <p className="eyebrow">Intake</p>
            <h2>Legal-help requests ({requests.length})</h2>
            <a className="text-link" href="/admin/submissions/legal">Open intake</a>
            {requests.length ? (
              <ul className="admin-list">
                {requests.map((request) => (
                  <li key={request.id}>
                    <strong>{request.issue}</strong>
                    <span>{request.full_name} · {request.phone}</span>
                    <small>{request.status} · {formatDate(request.created_at)}</small>
                  </li>
                ))}
              </ul>
            ) : <p>No legal-help requests yet.</p>}
          </article>
          <article className="page-card">
            <p className="eyebrow">Publishing</p>
            <h2>Resources</h2>
            <p>Manage publications, rights education materials, and homepage media.</p>
          </article>
        </div>
      </div>
    </main>
  );
}
