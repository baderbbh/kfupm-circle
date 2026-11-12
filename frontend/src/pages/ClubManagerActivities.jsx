import "./ClubManagerActivities.css";

const activities = [
  {
    day: "24",
    month: "MAY",
    dateTime: "2025-05-24",
    title: "Game Development Workshop",
    details: "4:00 PM · Innovation Lab",
    status: "Published",
  },
  {
    day: "04",
    month: "JUN",
    dateTime: "2025-06-04",
    title: "Unity Project Showcase",
    details: "7:00 PM · Building 22",
    status: "Draft",
  },
];

export default function ClubManagerActivities() {
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

          <form className="activities__form">
            <div className="activities__field">
              <label htmlFor="activity-title">Title *</label>
              <input
                id="activity-title"
                name="title"
                defaultValue="Game Development Workshop"
                required
              />
            </div>

            <div className="activities__field">
              <label htmlFor="activity-description">Description *</label>
              <textarea
                id="activity-description"
                name="description"
                defaultValue="Build a playable prototype with Unity in this beginner-friendly workshop."
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
                  required
                />
              </div>

              <div className="activities__field">
                <label htmlFor="activity-location">Location *</label>
                <input
                  id="activity-location"
                  name="location"
                  defaultValue="Building 22, Innovation Lab"
                  required
                />
              </div>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
}
