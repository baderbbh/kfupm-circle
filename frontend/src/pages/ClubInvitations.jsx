import { useState } from "react";
import "./ClubInvitations.css";

const students = [
  {
    name: "Ahmed Al-Dossary",
    option: "Ahmed Al-Dossary · Software Engineering",
  },
  {
    name: "Khalid Al-Qahtani",
    option: "Khalid Al-Qahtani · Computer Science",
  },
];

const invitationTypes = [
  "Club membership",
  "Game Development Workshop · 24 May",
];

const recentInvitations = [
  {
    initials: "FA",
    name: "Fahad Al-Shehri",
    invitation: "Unity Project Showcase",
    status: "Accepted",
  },
];

export default function ClubInvitations() {
  const [selectedStudent, setSelectedStudent] = useState(students[0].name);
  const selectedFirstName = selectedStudent.split(" ")[0];

  return (
    <section className="club-invitations">
      <header className="club-invitations-heading">
        <h1>Invite students</h1>
        <p>
          Invite verified students to the club or an eligible upcoming activity.
        </p>
      </header>

      <div className="club-invitations-layout">
        <div className="club-invitations-fields">
          <div className="club-invitations-field">
            <label htmlFor="invitation-student">Verified student *</label>
            <select
              id="invitation-student"
              name="student"
              value={selectedStudent}
              onChange={(event) => setSelectedStudent(event.target.value)}
              required
            >
              {students.map((student) => (
                <option key={student.name} value={student.name}>
                  {student.option}
                </option>
              ))}
            </select>
          </div>

          <div className="club-invitations-field">
            <label htmlFor="invitation-type">Invitation type *</label>
            <select
              id="invitation-type"
              name="invitationType"
              defaultValue={invitationTypes[0]}
              required
            >
              {invitationTypes.map((invitationType) => (
                <option key={invitationType} value={invitationType}>
                  {invitationType}
                </option>
              ))}
            </select>
          </div>

          <div
            className="club-invitations-eligibility"
            aria-live="polite"
            aria-label="Eligibility checked"
          >
            <span
              className="club-invitations-eligibility-check"
              aria-hidden="true"
            >
              ✓
            </span>
            <div>
              <strong>Eligibility checked</strong>
              <p>
                {selectedFirstName} is verified and is not currently a club
                member. Cancelled and past activities are excluded.
              </p>
            </div>
          </div>

          <footer className="club-invitations-footer">
            <p>Duplicate pending invitations are blocked.</p>
            <button type="button">Send invitation</button>
          </footer>
        </div>

        <section
          className="club-invitations-recent"
          aria-labelledby="club-invitations-recent-title"
        >
          <h2 id="club-invitations-recent-title">Recent invitations</h2>
          <ul className="club-invitations-recent-list">
            {recentInvitations.map((invitation) => (
              <li
                className="club-invitations-recent-item"
                key={`${invitation.name}-${invitation.invitation}`}
              >
                <span
                  className="club-invitations-avatar"
                  aria-hidden="true"
                >
                  {invitation.initials}
                </span>
                <span className="club-invitations-recent-details">
                  <strong>{invitation.name}</strong>
                  <small>{invitation.invitation}</small>
                </span>
                <span className="club-invitations-status">
                  {invitation.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
