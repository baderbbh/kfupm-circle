import Icon from "../components/StudentIcon";
import { getFirstName } from "../data/studentData";

const recommendations = [
  {
    id: "khalid",
    name: "Khalid Al-Qahtani",
    initials: "KQ",
    major: "Computer Science",
    reason: "You both take SWE 363 and like game development.",
    tags: ["SWE 363", "Game development"],
  },
  {
    id: "lina",
    name: "Lina Nasser",
    initials: "LN",
    major: "Information Systems",
    reason: "You’re both interested in UX research and hiking.",
    tags: ["UX research", "Hiking"],
  },
  {
    id: "yousef",
    name: "Yousef Al-Mutairi",
    initials: "YA",
    major: "Software Engineering",
    reason: "You’re both members of the Coding Club.",
    tags: ["Coding Club", "Web apps"],
  },
];

export default function StudentDashboard({ profile }) {
  const today = new Date();
  const hour = today.getHours();
  let greeting = "Good evening";

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  }

  const date = today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <>
      <div className="home-welcome">
        <div>
          <p className="home-date">{date}</p>
          <h1>
            {greeting}, {getFirstName(profile.fullName)}
          </h1>
          <p className="home-description">
            Here are people and activities that match your campus life.
          </p>
        </div>

        <button type="button" className="home-primary-button" disabled>
          <Icon name="search" />
          Discover students
        </button>
      </div>

      <div className="home-shortcuts">
        <button type="button" className="home-shortcut" disabled>
          <span className="home-shortcut-icon">
            <Icon name="people" />
          </span>
          <span>
            <strong>Connections</strong>
            <small>Review and grow your circle</small>
          </span>
          <Icon name="arrow" />
        </button>

        <button type="button" className="home-shortcut" disabled>
          <span className="home-shortcut-icon">
            <Icon name="message" />
          </span>
          <span>
            <strong>Messages</strong>
            <small>Connect to start chatting</small>
          </span>
          <Icon name="arrow" />
        </button>

        <button type="button" className="home-shortcut" disabled>
          <span className="home-shortcut-icon">
            <Icon name="inbox" />
          </span>
          <span>
            <strong>Invitations</strong>
            <small>Activity and club requests</small>
          </span>
          <Icon name="arrow" />
        </button>
      </div>

      <section className="home-section">
        <div className="home-section-heading">
          <div>
            <h2>Recommended for you</h2>
            <p>Based on your courses, interests, and activities.</p>
          </div>
          <button type="button" className="home-text-button" disabled>
            View all <Icon name="arrow" />
          </button>
        </div>

        <div className="home-recommendations">
          {recommendations.map((student) => (
            <article className="student-card" key={student.id}>
              <div className="student-card-top">
                <span className="student-card-avatar">{student.initials}</span>
                <button
                  type="button"
                  className="home-icon-button"
                  aria-label={`More options for ${student.name}`}
                  disabled
                >
                  ⋯
                </button>
              </div>

              <h3>{student.name}</h3>
              <p className="student-major">{student.major}</p>
              <p className="student-reason">{student.reason}</p>

              <div className="student-tags">
                {student.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <button type="button" className="home-outline-button" disabled>
                View profile
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-heading">
          <div>
            <h2>Coming up on campus</h2>
            <p>An activity that fits your interests.</p>
          </div>
          <button type="button" className="home-text-button" disabled>
            All activities <Icon name="arrow" />
          </button>
        </div>

        <article className="home-activity">
          <div className="activity-date">
            <strong>24</strong>
            <span>MAY</span>
          </div>

          <div className="activity-information">
            <div className="activity-host">
              <span className="activity-badge">Recommended</span>
              <span>Hosted by Game Development Club</span>
            </div>

            <h3>Game Development Workshop</h3>
            <p>
              Build a playable prototype with Unity and meet other students
              interested in game design.
            </p>

            <p className="activity-details">
              <Icon name="calendar" />
              Saturday, 24 May · 4:00 PM · Building 22 - Innovation Lab
            </p>
          </div>

          <button type="button" className="home-primary-button" disabled>
            View activity
          </button>
        </article>
      </section>
    </>
  );
}
