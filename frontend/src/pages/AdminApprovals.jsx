import "./AdminApprovals.css";

export default function AdminApprovals() {
  return (
    <main className="approvals-page">
      <header className="approvals-header">
        <h1 className="approvals-title">Club proposals &amp; corrections</h1>
        <p className="approvals-description">
          Review pending communities and correct permitted club information.
        </p>
      </header>

      <section className="proposals-card" aria-labelledby="pending-proposals">
        <div className="proposals-tab-row">
          <h2 className="proposals-tab" id="pending-proposals">
            Pending proposals <span className="proposal-count">0</span>
          </h2>
        </div>

        <div className="empty-state" role="status">
          <span className="empty-state-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.5 4.5" />
            </svg>
          </span>
          <strong>No proposals awaiting review</strong>
          <p>All submitted proposals have received a decision.</p>
        </div>
      </section>
    </main>
  );
}
