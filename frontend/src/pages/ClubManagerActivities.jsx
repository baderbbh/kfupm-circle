import { useEffect, useState } from "react";
import "./ClubManagerActivities.css";

// The list and editor start with the same published workshop.
const initialActivities = [
  {
    day: "24",
    month: "MAY",
    dateTime: "2025-05-24",
    dateTimeLocal: "2025-05-24T16:00",
    title: "Game Development Workshop",
    description:
      "Build a playable prototype with Unity in this beginner-friendly workshop.",
    location: "Innovation Lab",
    details: "4:00 PM · Innovation Lab",
    status: "Published",
  },
  {
    day: "04",
    month: "JUN",
    dateTime: "2025-06-04",
    dateTimeLocal: "2025-06-04T19:00",
    title: "Unity Project Showcase",
    description: "",
    location: "Building 22",
    details: "7:00 PM · Building 22",
    status: "Draft",
  },
];

export default function ClubManagerActivities() {
  // The selected activity is edited here; the second sample remains a draft.
  const [activities, setActivities] = useState(initialActivities);
  const [saved, setSaved] = useState(false);

  // Auto-dismiss the save confirmation and avoid leaving a timer behind.
  useEffect(() => {
    if (!saved) {
      return undefined;
    }

    const timer = setTimeout(() => setSaved(false), 5000);
    return () => clearTimeout(timer);
  }, [saved]);

  function handleSave(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title").trim();
    const description = formData.get("description").trim();
    const dateTimeLocal = formData.get("dateTime");
    const location = formData.get("location").trim();
    // Build the display labels from the same local date value saved by the form.
    const [year, month] = dateTimeLocal.slice(0, 10).split("-");
    const date = new Date(dateTimeLocal);
    const formattedMonth = new Intl.DateTimeFormat("en-US", {
      month: "short",
    })
      .format(new Date(Number(year), Number(month) - 1, 1))
      .toUpperCase();
    const formattedDay = dateTimeLocal.slice(8, 10);
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);

    // Update the selected row while preserving any other listed activities.
    setActivities((currentActivities) =>
      currentActivities.map((activity, index) =>
        index === 0
          ? {
              ...activity,
              day: formattedDay,
              month: formattedMonth,
              dateTime: dateTimeLocal.slice(0, 10),
              dateTimeLocal,
              title,
              description,
              location,
              details: `${formattedTime} · ${location}`,
            }
          : activity
      )
    );
    setSaved(true);
  }

  return (
    <section className="activities">
      <header className="activities__header">
        <div>
          <h1 className="activities__title">Manage club activities</h1>
          <p>
            Create and maintain upcoming Game Development Club activities.
          </p>
        </div>
        <button type="button" className="activities__create-button">
          <span aria-hidden="true">+</span>
          Create activity
        </button>
      </header>

      <div className="activities__layout">
        {/* The list reflects edits made in the panel beside it. */}
        <section
          className="activities__panel"
          aria-labelledby="activities-list-title"
        >
          <h2 className="activities__panel-title" id="activities-list-title">
            Club activities
          </h2>
          <div className="activities__list">
            {activities.map((activity, index) => (
              <article
                className={
                  index === 0
                    ? "activity-card activity-card--selected"
                    : "activity-card"
                }
                key={activity.dateTime}
              >
                <time
                  className="activity-card__date"
                  dateTime={activity.dateTime}
                >
                  <strong>{activity.day}</strong>
                  <span>{activity.month}</span>
                </time>
                <div className="activity-card__details">
                  <h3 className="activity-card__title">{activity.title}</h3>
                  <p className="activity-card__meta">{activity.details}</p>
                </div>
                <span
                  className={`activity-card__status activity-card__status--${activity.status.toLowerCase()}`}
                >
                  {activity.status}
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* Keep the editor tied to the selected activity in the list. */}
        <section
          className="activities__panel activities__editor"
          aria-labelledby="activity-editor-title"
        >
          <header className="activities__editor-header">
            <h2 className="activities__editor-title" id="activity-editor-title">
              Edit activity
            </h2>
            <button type="button" className="activities__cancel-button">
              Cancel activity
            </button>
          </header>

          <form
            className="activities__form"
            onSubmit={handleSave}
            onChange={() => setSaved(false)}
          >
            <div className="activities__field">
              <label htmlFor="activity-title">Title *</label>
              <input
                id="activity-title"
                name="title"
                defaultValue={activities[0].title}
                required
              />
            </div>

            <div className="activities__field">
              <label htmlFor="activity-description">Description *</label>
              <textarea
                id="activity-description"
                name="description"
                defaultValue={activities[0].description}
                required
              />
            </div>

            <div className="activities__field-row">
              <div className="activities__field">
                <label htmlFor="activity-date-time">Future date &amp; time *</label>
                <input
                  id="activity-date-time"
                  name="dateTime"
                  type="datetime-local"
                  defaultValue={activities[0].dateTimeLocal}
                  required
                />
              </div>

              <div className="activities__field">
                <label htmlFor="activity-location">Location *</label>
                <input
                  id="activity-location"
                  name="location"
                  defaultValue={activities[0].location}
                  required
                />
              </div>
            </div>

            <footer className="activities__form-footer">
              <p>Changes appear in student views.</p>
              <button type="submit" className="activities__save-button">
                Save changes
              </button>
            </footer>
          </form>
        </section>
      </div>

      {/* Confirm saved changes in a live region that can also be dismissed. */}
      {saved && (
        <div className="activities__toast" role="status" aria-live="polite">
          <span className="activities__toast-icon" aria-hidden="true">
            ✓
          </span>
          <div className="activities__toast-message">
            <strong>Activity updated</strong>
            <span>The change is now visible in student activity views.</span>
          </div>
          <button
            type="button"
            className="activities__toast-close"
            aria-label="Dismiss confirmation"
            onClick={() => setSaved(false)}
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
