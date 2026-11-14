import Icon from "../components/StudentIcon";
import {
  countShared,
  courseTitles,
  getFirstName,
  getSharedAttributes,
} from "../data/studentData";
import "./StudentProfileView.css";

function ChipList({ values, shared }) {
  return (
    <div className="student-chips">
      {values.map((value) =>
        shared.includes(value) ? (
          <span key={value} className="student-chip-shared">
            {value} · Shared
          </span>
        ) : (
          <span key={value}>{value}</span>
        )
      )}
    </div>
  );
}

export default function StudentProfileView({
  student,
  profile,
  joinedClubs,
  connection,
  interestedIn,
  onBack,
  onConnect,
  onAccept,
  onMessage,
  onReport,
}) {
  const shared = getSharedAttributes(profile, student, joinedClubs);
  const sharedCount = countShared(shared);
  const status = connection ? connection.status : "none";
  const firstName = getFirstName(student.name);

  // Each shared item gets a short explanation in the "Shared with you" card.
  const sharedItems = [
    ...shared.courses.map((course) => ({
      title: courseTitles[course] ? `${course} — ${courseTitles[course]}` : course,
      note: "You are both enrolled this semester",
    })),
    ...shared.interests.map((interest) => ({ title: interest, note: "Shared interest" })),
    ...shared.clubs.map((club) => ({ title: club, note: "You are both members" })),
  ];

  let action = (
    <button type="button" className="student-button" onClick={onConnect}>
      Connect
    </button>
  );

  if (status === "outgoing") {
    action = (
      <button type="button" className="student-button" disabled>
        Request pending
      </button>
    );
  } else if (status === "incoming") {
    action = (
      <button type="button" className="student-button" onClick={onAccept}>
        Accept request
      </button>
    );
  } else if (status === "connected") {
    action = onMessage ? (
      <button type="button" className="student-button" onClick={onMessage}>
        <Icon name="message" />
        Message
      </button>
    ) : (
      <button type="button" className="student-button" disabled>
        Connected
      </button>
    );
  }

  return (
    <section>
      <button type="button" className="student-back" onClick={onBack}>
        ← Back to discovery
      </button>

      <header className="profile-view-header">
        <span className="student-avatar student-avatar-large">
          {student.initials}
        </span>

        <div className="profile-view-title">
          <div className="profile-view-name">
            <h1>{student.name}</h1>
            <span className="student-badge student-badge-green">Verified Student</span>
          </div>
          <p>{student.major} · King Fahd University of Petroleum &amp; Minerals</p>
          <div className="student-chips">
            <span>
              {sharedCount} shared {sharedCount === 1 ? "attribute" : "attributes"}
            </span>
            {interestedIn && <span>Interested in {interestedIn}</span>}
          </div>
        </div>

        <div className="profile-view-actions">
          <button type="button" className="student-button-outline" onClick={onReport}>
            <Icon name="flag" />
            Report
          </button>
          {action}
        </div>
      </header>

      {status === "outgoing" && (
        <div className="student-notice" role="status">
          <Icon name="check" />
          <div>
            <strong>Connection request sent</strong>
            <small>
              {firstName} must accept before either of you can exchange messages.
            </small>
          </div>
        </div>
      )}

      <div className="profile-view-grid">
        <article className="student-panel student-panel-body">
          <h2 className="profile-view-card-title">About</h2>
          <p className="profile-view-bio">{student.bio}</p>
          <dl className="profile-view-facts">
            <div>
              <dt>Major</dt>
              <dd>{student.major}</dd>
            </div>
            <div>
              <dt>Preferred activities</dt>
              <dd>{student.preferredActivities}</dd>
            </div>
          </dl>
        </article>

        <article className="student-panel student-panel-body">
          <h2 className="profile-view-card-title">Shared with you</h2>
          {sharedItems.length === 0 ? (
            <p className="profile-view-bio">
              You don’t share a course, interest, or club yet.
            </p>
          ) : (
            <ul className="profile-view-shared">
              {sharedItems.map((item) => (
                <li key={item.title}>
                  <Icon name="check" size={14} />
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.note}</small>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>

      <article className="student-panel student-panel-body profile-view-tags">
        <h2 className="profile-view-card-title">Courses, interests &amp; hobbies</h2>
        <div className="profile-view-columns">
          <div>
            <h3>Courses</h3>
            <ChipList values={student.courses} shared={shared.courses} />
          </div>
          <div>
            <h3>Interests</h3>
            <ChipList values={student.interests} shared={shared.interests} />
          </div>
          <div>
            <h3>Hobbies</h3>
            <ChipList values={student.hobbies} shared={[]} />
          </div>
        </div>
      </article>
    </section>
  );
}
