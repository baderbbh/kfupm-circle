import { useState } from "react";
import Icon from "../components/StudentIcon";
import { clubs } from "../data/studentData";
import "./StudentClubs.css";

const membershipLabels = {
  pending: { text: "Request pending", tone: "student-badge-amber" },
  member: { text: "Member", tone: "student-badge-green" },
};

export default function StudentClubs({ memberships, proposal, onOpenClub, onPropose }) {
  const [search, setSearch] = useState("");
  const text = search.trim().toLowerCase();

  const visibleClubs = clubs.filter((club) =>
    [club.name, club.summary, ...club.tags].some((value) =>
      value.toLowerCase().includes(text)
    )
  );

  return (
    <section>
      <header className="student-heading">
        <div>
          <h1>Clubs &amp; communities</h1>
          <p>Explore approved student communities around your interests.</p>
        </div>
        <button type="button" className="student-button" onClick={onPropose}>
          <Icon name="plus" />
          Submit community proposal
        </button>
      </header>

      {proposal && (
        <div className="student-notice" role="status">
          <Icon name="check" />
          <div>
            <strong>{proposal.name} is awaiting review</strong>
            <small>Pending proposals stay out of this directory until an administrator approves them.</small>
          </div>
        </div>
      )}

      <label className="student-search clubs-search">
        <Icon name="search" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search approved clubs and communities"
          aria-label="Search approved clubs and communities"
        />
      </label>

      {visibleClubs.length === 0 ? (
        <div className="student-empty student-empty-dashed">
          <span className="student-empty-icon">
            <Icon name="search" />
          </span>
          <h3>No communities match your search</h3>
          <p>Try a different name or interest, or propose a new community.</p>
        </div>
      ) : (
        <ul className="clubs-grid">
          {visibleClubs.map((club) => {
            const membership = membershipLabels[memberships[club.id]];

            return (
              <li key={club.id} className="clubs-card">
                <span className="clubs-logo">{club.initials}</span>
                <div className="clubs-badges">
                  <span className="student-badge student-badge-green">
                    Approved Community
                  </span>
                  {membership && (
                    <span className={`student-badge ${membership.tone}`}>
                      {membership.text}
                    </span>
                  )}
                </div>
                <h2>{club.name}</h2>
                <p>{club.summary}</p>
                <small>{club.tags.join(" · ")}</small>
                <button
                  type="button"
                  className="student-button-outline"
                  onClick={() => onOpenClub(club.id)}
                >
                  View club
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
