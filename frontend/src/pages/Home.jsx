import "./ProfileSetup.css";
import "./Home.css";

const navigation = [
  { label: "Home", icon: "home" },
  { label: "Discover", icon: "search" },
  { label: "Connections", icon: "people" },
  { label: "Messages", icon: "message" },
  { label: "Clubs & Communities", icon: "club" },
  { label: "Activities", icon: "calendar" },
  { label: "Invitations", icon: "inbox" },
  { label: "My Profile", icon: "person" },
];

const recommendations = [
  {
    name: "Khalid Al-Qahtani",
    initials: "KQ",
    major: "Computer Science",
    reason: "You both take SWE 363 and like game development.",
    tags: ["SWE 363", "Game development"],
  },
  {
    name: "Lina Nasser",
    initials: "LN",
    major: "Information Systems",
    reason: "You’re both interested in UX research and hiking.",
    tags: ["UX research", "Hiking"],
  },
  {
    name: "Yousef Al-Mutairi",
    initials: "YA",
    major: "Software Engineering",
    reason: "You’re both members of the Coding Club.",
    tags: ["Coding Club", "Web apps"],
  },
];

function Icon({ name }) {
  const paths = {
    home: "M3 10 12 3l9 7M5 9v12h14V9M9 21v-8h6v8",
    search: "m16 16 5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
    people:
      "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M18 8a3 3 0 0 0-2-5M22 21v-2a4 4 0 0 0-3-4",
    message: "M4 4h16v12H9l-5 5V4Z",
    club: "M4 21V8l8-5 8 5v13M9 21v-8h6v8",
    calendar:
      "M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2ZM7 2v6M17 2v6M3 11h18",
    inbox: "M3 4h18v16H3V4ZM3 13h5l2 3h4l2-3h5",
    person: "M4 21a8 8 0 0 1 16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
    bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
    arrow: "m9 5 7 7-7 7",
    logout: "M9 3H4v18h5M13 7l5 5-5 5M8 12h13",
  };

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}

export default function Home({ profile, onAccountAccess }) {
  const firstName = profile.fullName.trim().split(/\s+/)[0];

  const initials = profile.fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

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
    <div className="home-wrapper">
      <main className="profile-page home-page">
        <aside className="profile-sidebar">
          <div className="profile-brand">
            <span className="profile-logo">K</span>
            <div>
              <strong>KFUPM Circle</strong>
              <p>Campus connections</p>
            </div>
          </div>

          <nav className="profile-navigation" aria-label="Student navigation">
            {navigation.map((item) => (
              <button
                key={item.label}
                type="button"
                className={item.label === "Home" ? "home-nav-active" : ""}
                aria-current={item.label === "Home" ? "page" : undefined}
                disabled={item.label !== "Home"}
              >
                <Icon name={item.icon} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="profile-user">
            <span className="profile-avatar">{initials}</span>
            <div>
              <strong>{profile.fullName}</strong>
              <p>{profile.major}</p>
            </div>
            <button
              type="button"
              className="home-logout"
              aria-label="Sign out"
              onClick={onAccountAccess}
            >
              <Icon name="logout" />
            </button>
          </div>
        </aside>

        <div className="profile-main">
          <header className="profile-header">
            <div>
              <span>Student portal</span>
              <span> / </span>
              <strong>Home</strong>
            </div>

            <div className="home-account-status">
              <button
                type="button"
                className="home-icon-button"
                aria-label="Notifications"
                disabled
              >
                <Icon name="bell" />
              </button>
              <span className="verified-badge">● Verified account</span>
            </div>
          </header>

          <div className="home-content">
            <div className="home-welcome">
              <div>
                <p className="home-date">{date}</p>
                <h1>{greeting}, {firstName}</h1>
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
                  <article className="student-card" key={student.name}>
                    <div className="student-card-top">
                      <span className="student-card-avatar">
                        {student.initials}
                      </span>
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
          </div>
        </div>
      </main>
    </div>
  );
}