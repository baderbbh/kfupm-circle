import { useState } from "react";
import Icon from "../components/StudentIcon";
import {
  countShared,
  getFirstName,
  getSharedAttributes,
  students,
} from "../data/studentData";
import "./StudentActivities.css";

export default function StudentActivityDetails({
  activity,
  profile,
  joinedClubs,
  isInterested,
  invitedIds,
  onBack,
  onMarkInterest,
  onInvite,
  onOpenProfile,
}) {
  const [showCompanions, setShowCompanions] = useState(false);

  // Students who also marked interest in this activity.
  const companions = students.filter((student) =>
    student.interestedActivities.includes(activity.id)
  );
  const lastInvited = students.find((student) => student.id === invitedIds[invitedIds.length - 1]);

  return (
    <section>
      <button type="button" className="student-back" onClick={onBack}>
        ← Back to activities
      </button>

      <header className="activity-details-header">
        <span className="activity-details-date">
          <strong>{activity.day}</strong>
          <small>
            {activity.month.charAt(0) + activity.month.slice(1).toLowerCase()} {activity.year}
          </small>
        </span>

        <div className="activity-details-title">
          <span className="student-badge">{activity.category}</span>
          <h1>{activity.title}</h1>
          <p>
            Hosted by <strong>{activity.host}</strong>
          </p>
        </div>

        <div className="activity-details-actions">
          <button
            type="button"
            className="student-button-outline"
            disabled={isInterested}
            onClick={onMarkInterest}
          >
            {isInterested ? "Interested" : "Mark interest"}
          </button>
          <button
            type="button"
            className="student-button"
            disabled={!isInterested}
            onClick={() => setShowCompanions(true)}
          >
            <Icon name="people" />
            Find a companion
          </button>
        </div>
      </header>

      {lastInvited && (
        <div className="student-notice" role="status">
          <Icon name="inbox" />
          <div>
            <strong>Companion invitation pending</strong>
            <small>
              {getFirstName(lastInvited.name)} can respond in Invitations. Your
              connection request is handled separately.
            </small>
          </div>
        </div>
      )}

      <div className="activity-details-grid">
        <article className="student-panel student-panel-body">
          <h2 className="activity-details-card-title">About this activity</h2>
          <p className="activity-details-text">{activity.about}</p>
          <h2 className="activity-details-card-title">What to bring</h2>
          <p className="activity-details-text">{activity.bring}</p>
        </article>

        <article className="student-panel student-panel-body">
          <h2 className="activity-details-card-title">When &amp; where</h2>
          <dl className="activity-details-facts">
            <div>
              <dt>Date</dt>
              <dd>{activity.fullDate}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{activity.timeRange}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{activity.location}</dd>
            </div>
            <div>
              <dt>Organizer</dt>
              <dd>{activity.host}</dd>
            </div>
          </dl>
        </article>
      </div>

      <div className="student-info">
        <Icon name="people" />
        <div>
          <strong>Looking for company?</strong>
          <small>
            Mark interest first, then find students who are also interested.
            Invitations and connection requests remain separate.
          </small>
        </div>
      </div>

      {showCompanions && (
        <div className="student-dialog-backdrop" onClick={() => setShowCompanions(false)}>
          <div
            className="student-dialog student-dialog-wide"
            role="dialog"
            aria-modal="true"
            aria-labelledby="companion-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="student-dialog-top">
              <div>
                <span>{activity.title}</span>
                <h2 id="companion-title">Find a companion</h2>
                <p>Students shown here have also marked interest in this activity.</p>
              </div>
              <button
                type="button"
                className="student-dialog-close"
                aria-label="Close companion list"
                onClick={() => setShowCompanions(false)}
              >
                ×
              </button>
            </div>

            {companions.length === 0 ? (
              <p className="activity-details-text">
                No other students have marked interest yet.
              </p>
            ) : (
              <ul className="companion-list">
                {companions.map((student) => {
                  const shared = getSharedAttributes(profile, student, joinedClubs);
                  const invited = invitedIds.includes(student.id);
                  const detail = shared.courses[0]
                    ? `Shared course: ${shared.courses[0]}`
                    : `Interested in ${student.interests[0]}`;

                  return (
                    <li key={student.id} className="companion-row">
                      <span className="student-avatar student-avatar-large">
                        {student.initials}
                      </span>
                      <div className="companion-text">
                        <p className="companion-name">
                          {student.name}
                          {countShared(shared) >= 2 && (
                            <span className="student-badge student-badge-green">
                              Strong Match
                            </span>
                          )}
                        </p>
                        <small>
                          {student.major} · {detail}
                        </small>
                        <div className="student-chips">
                          {[...new Set([...student.interests.slice(0, 2), ...shared.courses])].map(
                            (tag) => (
                              <span key={tag}>{tag}</span>
                            )
                          )}
                        </div>
                      </div>
                      <div className="companion-actions">
                        <button
                          type="button"
                          className="student-button-outline"
                          onClick={() => onOpenProfile(student.id)}
                        >
                          View profile
                        </button>
                        <button
                          type="button"
                          className="student-button"
                          disabled={invited}
                          onClick={() => {
                            onInvite(student);
                            setShowCompanions(false);
                          }}
                        >
                          {invited ? "Invited" : "Invite companion"}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="student-info">
              <Icon name="people" />
              <div>
                <strong>Separate decisions</strong>
                <small>
                  Students may accept the activity invitation without accepting a
                  connection request. Messaging requires an accepted connection.
                </small>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
