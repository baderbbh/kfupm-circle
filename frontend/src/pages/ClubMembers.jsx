import "./ClubMembers.css";

// Sample current members shown below the pending-request queue.
const members = [
  { initials: "KQ", name: "Khalid Al-Qahtani", major: "Computer Science" },
  { initials: "RN", name: "Rana Nadeem", major: "Information Systems" },
  { initials: "YA", name: "Yousef Al-Mutairi", major: "Software Engineering" },
];

export default function ClubMembers() {
  return (
    <section className="club-members">
      <header className="club-members-heading">
        <h1>Membership Requests and Members</h1>
        <p>
          Review requests once and maintain the Game Development Club roster.
        </p>
      </header>

      {/* Keep the empty request state visible even when the roster has members. */}
      <section
        className="membership-requests"
        aria-labelledby="membership-requests-title"
      >
        {/* Keep the queue visible so incoming requests have a clear destination. */}
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

      <section
        className="current-members"
        aria-labelledby="current-members-title"
      >
        {/* The roster is rendered from a list to keep each member row consistent. */}
        <header className="current-members-heading">
          <h2 id="current-members-title">Current members</h2>
          <span>24 members</span>
        </header>

        <ul className="current-members-list">
          {members.map((member) => (
            <li className="current-member" key={member.name}>
              <span className="current-member-avatar" aria-hidden="true">
                {member.initials}
              </span>
              <span className="current-member-information">
                <strong>{member.name}</strong>
                <small>{member.major}</small>
              </span>
              <span className="current-member-menu" aria-hidden="true">
                •••
              </span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
