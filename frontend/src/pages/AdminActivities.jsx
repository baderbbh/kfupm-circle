import { useEffect, useState } from "react";
import "./AdminActivities.css";

const activities = [
  {
    name: "Game Development Workshop",
    location: "Building 22 · Innovation Lab",
    organizer: "Game Development Club",
    date: "24 May · 4:00 PM",
    status: "Published",
  },
  {
    name: "Product Design Meetup",
    location: "Student Mall · Room 14",
    organizer: "UX & Product Community",
    date: "29 May · 5:30 PM",
    status: "Published",
  },
  {
    name: "Outdoor Photography Walk",
    location: "Main Gate",
    organizer: "Photography Community",
    date: "2 June · 4:30 PM",
    status: "Cancelled",
  },
];

function Icon({ name }) {
  const paths = {
    edit: "m16 3 5 5-12 12-6 1 1-6ZM14 5l5 5",
    delete: "M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7",
    calendar: "M5 3v4M19 3v4M3 10h18M3 5h18v16H3Z",
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}

export default function AdminActivities() {
  const [showCorrectionMessage, setShowCorrectionMessage] = useState(false);

  useEffect(() => {
    if (!showCorrectionMessage) return undefined;

    const timeoutId = window.setTimeout(
      () => setShowCorrectionMessage(false),
      1000,
    );
    return () => window.clearTimeout(timeoutId);
  }, [showCorrectionMessage]);

  return (
    <main className="activities-page">
      <header className="activities-header">
        <h1>Platform activities</h1>
        <p>Correct published activities or remove them from student access.</p>
      </header>

      <div className="activities-table-scroll">
        <table className="activities-table">
          <thead>
            <tr>
              <th scope="col">Activity</th>
              <th scope="col">Organizer</th>
              <th scope="col">Date &amp; time</th>
              <th scope="col">Status</th>
              <th scope="col">
                <span className="activities-visually-hidden">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.name}>
                <td>
                  <strong className="activity-name">{activity.name}</strong>
                  <span className="activity-location">{activity.location}</span>
                </td>
                <td>{activity.organizer}</td>
                <td>{activity.date}</td>
                <td>
                  <span
                    className={`activity-status ${
                      activity.status === "Published"
                        ? "activity-status-published"
                        : "activity-status-cancelled"
                    }`}
                  >
                    {activity.status}
                  </span>
                </td>
                <td>
                  <div className="activity-actions">
                    <button
                      type="button"
                      aria-label={`Edit ${activity.name}`}
                      className="activity-action-button"
                      onClick={() => setShowCorrectionMessage(true)}
                    >
                      <Icon name="edit" />
                    </button>
                    {activity.status === "Published" && (
                      <button
                        type="button"
                        aria-label={`Delete ${activity.name}`}
                        className="activity-action-button"
                      >
                        <Icon name="delete" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <aside className="activities-note">
        <Icon name="calendar" />
        <div>
          <strong>Unavailable activities</strong>
          <p>
            Removed or cancelled activities disappear from active student views
            and stop accepting new invitations.
          </p>
        </div>
      </aside>

      {showCorrectionMessage && (
        <div className="activity-correction-toast" role="status" aria-live="polite">
          <span className="activity-correction-check" aria-hidden="true">
            ✓
          </span>
          <div className="activity-correction-message">
            <strong>Activity corrected</strong>
            <p>The update and correction reason were recorded.</p>
          </div>
          <button
            type="button"
            className="activity-correction-close"
            aria-label="Dismiss notification"
            onClick={() => setShowCorrectionMessage(false)}
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}
