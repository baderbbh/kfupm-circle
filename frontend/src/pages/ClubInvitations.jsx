import "./ClubInvitations.css";

const students = [
  "Ahmed Al-Dossary · Software Engineering",
  "Khalid Al-Qahtani · Computer Science",
];

const invitationTypes = [
  "Club membership",
  "Game Development Workshop · 24 May",
];

export default function ClubInvitations() {
  return (
    <section className="club-invitations">
      <header className="club-invitations-heading">
        <h1>Invite students</h1>
        <p>
          Invite verified students to the club or an eligible upcoming activity.
        </p>
      </header>

      <div className="club-invitations-fields">
        <div className="club-invitations-field">
          <label htmlFor="invitation-student">Verified student *</label>
          <select
            id="invitation-student"
            name="student"
            defaultValue={students[0]}
            required
          >
            {students.map((student) => (
              <option key={student} value={student}>
                {student}
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
      </div>
    </section>
  );
}
