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
    <section className="manager-activities">
      <header className="manager-activities-heading">
        <div>
          <h1>Manage club activities</h1>
          <p>
            Create and maintain upcoming Game Development Club activities.
          </p>
        </div>
        <button type="button" className="manager-activities-create">
          <span aria-hidden="true">+</span>
          Create activity
        </button>
      </header>

      <section
        className="manager-activities-list"
        aria-labelledby="manager-activities-list-heading"
      >
        <h2 id="manager-activities-list-heading">Club activities</h2>
        <div className="manager-activity-items">
          {activities.map((activity, index) => (
            <article
              className={
                index === 0
                  ? "manager-activity-item manager-activity-item-selected"
                  : "manager-activity-item"
              }
              key={activity.dateTime}
            >
              <time
                className="manager-activity-date"
                dateTime={activity.dateTime}
              >
                <strong>{activity.day}</strong>
                <span>{activity.month}</span>
              </time>
              <div className="manager-activity-information">
                <h3>{activity.title}</h3>
                <p>{activity.details}</p>
              </div>
              <span
                className={`manager-activity-status manager-activity-status-${activity.status.toLowerCase()}`}
              >
                {activity.status}
              </span>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
