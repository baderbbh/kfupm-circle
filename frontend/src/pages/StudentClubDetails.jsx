import Icon from "../components/StudentIcon";
import { activities } from "../data/studentData";
import "./StudentClubs.css";

const membershipText = {
  none: "Open to verified students",
  pending: "Manager review pending",
  member: "You are a member",
};

export default function StudentClubDetails({
  club,
  membership = "none",
  onBack,
  onRequest,
  onLeave,
  onReport,
  onOpenActivity,
}) {
  const activity = activities.find((item) => item.id === club.activityId);

  let action = (
    <button type="button" className="student-button" onClick={onRequest}>
      Request membership
    </button>
  );

  if (membership === "pending") {
    action = (
      <button type="button" className="student-button" disabled>
        Request pending
      </button>
    );
  } else if (membership === "member") {
    action = (
      <button type="button" className="student-button-outline" onClick={onLeave}>
        Leave club
      </button>
    );
  }

  return (
    <section>
      <button type="button" className="student-back" onClick={onBack}>
        ← Back to communities
      </button>

      <header className="club-details-header">
        <span className="clubs-logo clubs-logo-large">{club.initials}</span>
        <div className="club-details-title">
          <span className="student-badge student-badge-green">Approved Community</span>
          <h1>{club.name}</h1>
          <p>{club.description}</p>
          <div className="student-chips">
            {club.interests.map((interest) => (
              <span key={interest}>{interest}</span>
            ))}
          </div>
        </div>
        <div className="club-details-actions">
          <button type="button" className="student-button-outline" onClick={onReport}>
            <Icon name="flag" />
            Report
          </button>
          {action}
        </div>
      </header>

      <div className="club-details-grid">
        <article className="student-panel student-panel-body">
          <h2 className="club-details-card-title">About this club</h2>
          <p className="club-details-text">{club.about}</p>
          <dl className="club-details-facts">
            <div>
              <dt>Contact</dt>
              <dd>{club.contact}</dd>
            </div>
            <div>
              <dt>Membership</dt>
              <dd>{membershipText[membership]}</dd>
            </div>
          </dl>
        </article>

        <article className="student-panel student-panel-body">
          <h2 className="club-details-card-title">Upcoming activity</h2>
          {activity ? (
            <div className="club-details-activity">
              <span className="club-details-date">
                <strong>{activity.day}</strong>
                <small>{activity.month}</small>
              </span>
              <div>
                <strong>{activity.title}</strong>
                <small>
                  {activity.time} · {activity.location.split(", ")[1] || activity.location}
                </small>
                {onOpenActivity && (
                  <button
                    type="button"
                    className="club-details-link"
                    onClick={() => onOpenActivity(activity.id)}
                  >
                    View activity →
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p className="club-details-text">No upcoming activities yet.</p>
          )}
        </article>
      </div>

      <article className="student-panel">
        <header className="student-panel-header">
          <h2>Announcements</h2>
        </header>
        {club.announcements.length === 0 ? (
          <p className="club-details-text student-panel-body">No announcements yet.</p>
        ) : (
          club.announcements.map((announcement) => (
            <div className="club-details-announcement" key={announcement.title}>
              <strong>{announcement.title}</strong>
              <p>{announcement.body}</p>
              <small>{announcement.published}</small>
            </div>
          ))
        )}
      </article>
    </section>
  );
}
