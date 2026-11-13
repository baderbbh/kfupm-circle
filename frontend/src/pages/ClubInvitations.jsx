import { useEffect, useState } from "react";
import "./ClubInvitations.css";

// Only verified students and eligible club activities are offered here.
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

// These are the invitation types currently available to the manager.
const invitationTypes = [
  "Club membership",
  "Game Development Workshop · 24 May",
];

// Start the recent list with the latest invitation activity.
const recentInvitations = [
  {
    initials: "FA",
    name: "Fahad Al-Shehri",
    invitation: "Unity Project Showcase",
    status: "Accepted",
    sentLabel: "",
  },
];

export default function ClubInvitations() {
  // Keep the form selection and recent invitation history in sync.
  const [selectedStudent, setSelectedStudent] = useState(students[0].name);
  const [selectedInvitationType, setSelectedInvitationType] = useState(
    invitationTypes[0]
  );
  const [invitations, setInvitations] = useState(recentInvitations);
  const [sentStudent, setSentStudent] = useState("");
  const selectedFirstName = selectedStudent.split(" ")[0];
  // A matching pending invite should not be sent twice.
  const isInvitationPending = invitations.some(
    (invitation) =>
      invitation.name === selectedStudent &&
      invitation.invitation === selectedInvitationType &&
      invitation.status === "Pending"
  );

  // The sent confirmation is temporary and should not outlive this screen.
  useEffect(() => {
    if (!sentStudent) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setSentStudent(""), 1000);
    return () => window.clearTimeout(timeoutId);
  }, [sentStudent]);

  function handleSendInvitation() {
    if (isInvitationPending) {
      return;
    }

    const initials = selectedStudent
      .split(" ")
      .map((part) => part[0])
      .join("");

    // Put the newest invitation first so it appears at the top of the history.
    setInvitations((currentInvitations) => [
      {
        initials,
        name: selectedStudent,
        invitation: selectedInvitationType,
        status: "Pending",
        sentLabel: "Sent today",
      },
      ...currentInvitations,
    ]);
    setSentStudent(selectedFirstName);
  }

  return (
    <section className="club-invitations">
      <header className="club-invitations-heading">
        <h1>Invite students</h1>
        <p>
          Invite verified students to the club or an eligible upcoming activity.
        </p>
      </header>

      <div className="club-invitations-layout">
        {/* The selected student and invitation type determine eligibility. */}
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
              value={selectedInvitationType}
              onChange={(event) =>
                setSelectedInvitationType(event.target.value)
              }
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
            <button
              type="button"
              onClick={handleSendInvitation}
              disabled={isInvitationPending}
            >
              {isInvitationPending ? "Invitation pending" : "Send invitation"}
            </button>
          </footer>
        </div>

        <section
          className="club-invitations-recent"
          aria-labelledby="club-invitations-recent-title"
        >
          {/* New invitations are added to the top of this recent list. */}
          <h2 id="club-invitations-recent-title">Recent invitations</h2>
          <ul className="club-invitations-recent-list">
            {invitations.map((invitation) => (
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
                  <small>
                    {invitation.invitation}
                    {invitation.sentLabel && ` · ${invitation.sentLabel}`}
                  </small>
                </span>
                <span
                  className={`club-invitations-status ${invitation.status.toLowerCase()}`}
                >
                  {invitation.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Let the manager know who received the invitation. */}
      {sentStudent && (
        <div className="club-invitations-toast" role="status">
          <span className="club-invitations-toast-check" aria-hidden="true">
            ✓
          </span>
          <span>
            <strong>Invitation sent</strong>
            <small>
              {sentStudent} will see it in their Invitations view.
            </small>
          </span>
          <button
            type="button"
            aria-label="Dismiss invitation confirmation"
            onClick={() => setSentStudent("")}
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
