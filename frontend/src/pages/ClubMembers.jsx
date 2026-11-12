import "./ClubMembers.css";

export default function ClubMembers() {
  return (
    <section className="club-members">
      <header className="club-members-heading">
        <h1>Membership Requests and Members</h1>
        <p>
          Review requests once and maintain the Game Development Club roster.
        </p>
      </header>

      <section
        className="membership-requests"
        aria-labelledby="membership-requests-title"
      >
        <header className="membership-requests-heading">
          <div>
            <h2 id="membership-requests-title">Pending requests</h2>
            <p>Students awaiting a decision.</p>
          </div>
          <span className="membership-pending-count">0 Pending</span>
        </header>

        <div className="membership-empty-state">
          <span className="membership-search-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="10.8" cy="10.8" r="6.3" />
              <path d="m16 16 4 4" />
            </svg>
          </span>
          <h3>No pending requests</h3>
          <p>New membership requests will appear here.</p>
        </div>
      </section>
    </section>
  );
}
