import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { hasSupabaseConfig } from "@/lib/supabase-env";
import { getAdminAccess } from "@/lib/admin-access";


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

// The dashboard lists only the most recent enquiries so it stays fast. The
// headline totals are counted separately, so a real inbox of 40 never reports
// itself as 5 — which is what happened when the list length was used as the
// count.
const RECENT_SUBMISSION_LIMIT = 5;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminPage() {
  if (!hasSupabaseConfig()) {
    return (
      <main className="admin-shell">
        <div className="container">
          <div className="page-card admin-card">
            <p className="eyebrow">Protected workspace</p>
            <h1 className="section-title">Admin dashboard unavailable</h1>
            <p>
              Add your Supabase URL and publishable key to the environment to enable sign-in and admin data access.
            </p>
            <a className="button button--secondary" href="/admin/login">Return to sign in</a>
          </div>
        </div>
      </main>
    );
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const [
    { data: contactSubmissions, count: contactSubmissionCount, error: contactError },
    { data: legalHelpRequests, count: legalHelpRequestCount, error: legalHelpError },
  ] = await Promise.all([
    supabase
      .from("contact_submissions")
      .select("id, name, email, subject, status, created_at", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(RECENT_SUBMISSION_LIMIT),
    supabase
      .from("legal_help_requests")
      .select("id, full_name, phone, issue, status, created_at", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(RECENT_SUBMISSION_LIMIT),
  ]);

  const contacts = (contactSubmissions ?? []) as ContactSubmission[];
  const requests = (legalHelpRequests ?? []) as LegalHelpRequest[];
  const contactSubmissionTotal = contactSubmissionCount ?? contacts.length;
  const legalHelpRequestTotal = legalHelpRequestCount ?? requests.length;
  // These queries used to fail silently: an error left `data` null, so the
  // dashboard rendered "no enquiries yet" and a partially-applied database
  // schema looked like a genuinely empty inbox. Surface it instead.
  const inboxError = contactError ?? legalHelpError;
  const inboxErrorHint = inboxError
    ? `${inboxError.message} (code ${inboxError.code ?? "unknown"})`
    : null;
  // Pass the user we already fetched — getAdminAccess must not re-fetch it,
  // because that extra auth round-trip is what triggers Supabase rate limiting.
  const access = await getAdminAccess(user);

  return (
    <main className="admin-shell">
      <div className="container">
        <div className="admin-heading">
          <div>
            <p className="eyebrow">Protected workspace</p>
            <h1 className="section-title">Admin dashboard</h1>
            <p className="admin-heading__meta">Signed in as <strong>{user.email}</strong></p>
          </div>
        </div>

        {inboxErrorHint ? (
          <div className="admin-access-warning" role="alert">
            <strong>Some inbox data could not be loaded.</strong>
            <p>
              The database rejected a query for the inboxes, so an empty list below
              does not mean there are no submissions. Supabase reported:
              <code> {inboxErrorHint}</code>
            </p>
            <p>
              This usually means the database schema has not been fully applied —
              re-run <code>supabase/schema.sql</code> in the Supabase SQL Editor.
            </p>
          </div>
        ) : null}

        {access.checked && !access.isRegisteredAdmin ? (
          <div className="admin-access-warning" role="alert">
            <strong>This account is not registered as an admin.</strong>
            <p>
              You signed in successfully, but <strong>{user.email}</strong> is not listed in the
              <code> admin_users</code> table, so the database hides every enquiry and
              request from you. That is why an inbox can look empty even though
              submissions were received. To fix it, run the admin_users seed at the
              bottom of <code>supabase/schema.sql</code> with this email address.
            </p>
          </div>
        ) : null}

        <div className="card-grid card-grid--three">
          <article className="page-card admin-list-card">
            <p className="eyebrow">Inbox · private</p>
            <h2>Contact enquiries ({contactSubmissionTotal})</h2>
            <p className="admin-destination">Messages from the public contact form at <strong>/contact</strong>. They stay private to your team.</p>
            {contactSubmissionTotal > contacts.length ? (
              <p className="admin-destination">Showing the {contacts.length} most recent.</p>
            ) : null}
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
            <p className="eyebrow">Intake · private</p>
            <h2>Legal-help requests ({legalHelpRequestTotal})</h2>
            <p className="admin-destination">Confidential requests from the public intake form at <strong>/legal-help</strong>. Internal notes stay private.</p>
            {legalHelpRequestTotal > requests.length ? (
              <p className="admin-destination">Showing the {requests.length} most recent.</p>
            ) : null}
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
            <h2>Where your edits appear</h2>
            <p>Everything you edit here is previewed against the exact public page before it goes live.</p>
            <div className="admin-destination-list">
              <a href="/admin/content/editions"><strong>Justice Bridge Index</strong> → /justice-bridge-index</a>
              <a href="/admin/content/campaigns"><strong>Advocacy &amp; campaigns</strong> → /advocacy</a>
              <a href="/admin/content/resources"><strong>Know Your Rights</strong> → /know-your-rights</a>
              <a href="/admin/media"><strong>Media library</strong> → assets</a>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
