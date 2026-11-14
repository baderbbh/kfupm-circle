import { useState } from "react";
import Icon from "../components/StudentIcon";
import { activities } from "../data/studentData";
import "./StudentActivities.css";

export default function StudentActivities({ interested, onOpenActivity, onArrange }) {
  const [tab, setTab] = useState("upcoming");

  const lists = {
    upcoming: activities,
    interested: activities.filter(
      (activity) => interested.includes(activity.id) && !activity.cancelled
    ),
    cancelled: activities.filter((activity) => activity.cancelled),
  };

  const tabs = [
    { key: "upcoming", label: "Upcoming" },
    { key: "interested", label: "Interested" },
    { key: "cancelled", label: "Cancelled" },
  ];

  const visible = lists[tab];

  return (
    <section>
      <header className="student-heading">
        <div>
          <h1>Campus activities</h1>
          <p>Find workshops, meetups, and sessions across KFUPM.</p>
        </div>
        {onArrange && (
          <button type="button" className="student-button-outline" onClick={onArrange}>
            <Icon name="plus" />
            Arrange a study session
          </button>
        )}
      </header>

      <div className="student-tabs" role="tablist" aria-label="Activity lists">
        {tabs.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={tab === item.key}
            onClick={() => setTab(item.key)}
          >
            {item.label}
            {item.key === "interested" && <span>{lists.interested.length}</span>}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="student-empty student-empty-dashed">
          <span className="student-empty-icon">
            <Icon name="calendar" />
          </span>
          <h3>
            {tab === "interested" ? "No interested activities yet" : "No cancelled activities"}
          </h3>
          <p>
            {tab === "interested"
              ? "Open an activity and select Mark interest to keep it here."
              : "Cancelled activities will appear here."}
          </p>
        </div>
      ) : (
        <ul className="student-panel activities-list">
          {visible.map((activity) => (
            <li
              key={activity.id}
              className={activity.cancelled ? "activities-row is-cancelled" : "activities-row"}
            >
              <span className="activities-date">
                <strong>{activity.day}</strong>
                <small>{activity.month}</small>
              </span>

              <div className="activities-text">
                <h2>
                  {activity.title}
                  {activity.cancelled && (
                    <span className="student-badge student-badge-red">Cancelled</span>
                  )}
                  {interested.includes(activity.id) && !activity.cancelled && (
                    <span className="student-badge student-badge-green">Interested</span>
                  )}
                </h2>
                <p>{activity.host}</p>
                <p className="activities-meta">
                  <Icon name="calendar" size={14} />
                  <span>
                    {activity.weekday} · {activity.time}
                  </span>
                  <span>{activity.place}</span>
                </p>
              </div>

              {activity.cancelled ? (
                <button type="button" className="student-button-outline" disabled>
                  Unavailable
                </button>
              ) : (
                <button
                  type="button"
                  className="student-button-outline"
                  onClick={() => onOpenActivity(activity.id)}
                >
                  View activity
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
