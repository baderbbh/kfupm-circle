import { useState } from "react";
import ClubAnnouncements from "./ClubAnnouncements";
import "./ProfileSetup.css";
import "./Home.css";
import "./ClubManagerHome.css";

const navigation = [
  { label: "Club Overview", icon: "club" },
  { label: "Announcements", icon: "message" },
  { label: "Activities", icon: "calendar" },
  { label: "Members", icon: "people" },
  { label: "Invitations", icon: "inbox" },
];

const shortcuts = [
  {
    label: "Announcements",
    description: "Publish club updates",
    icon: "message",
  },
  {
    label: "Activities",
    description: "Create, edit, or cancel",
    icon: "calendar",
  },
  {
    label: "Members",
    description: "Review membership requests",
    icon: "people",
  },
  {
    label: "Invitations",
    description: "Invite verified students",
    icon: "inbox",
  },
];

function Icon({ name }) {
  const paths = {
    club: "M3 10 12 3l9 7v11h-6v-7H9v7H3Z",
    message: "M4 4h16v12H9l-5 4Z",
    calendar:
      "M5 3v4M19 3v4M3 10h18M3 5h18v16H3Z",
    people:
      "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    inbox:
      "M4 4h16v16H4ZM4 13h5l1 3h4l1-3h5",
    bell:
      "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
    arrow: "m9 5 7 7-7 7",
    back: "m15 5-7 7 7 7",
    logout:
      "M9 4H4v16h5M14 8l4 4-4 4M8 12h10",
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

export default function ClubManagerHome({ onSignOut }) {
  const [activeView, setActiveView] = useState("announcements");
  const [clubName, setClubName] = useState("Game Development Club");
  const [interests, setInterests] = useState([
    "Game development",
    "Unity",
    "Interactive design",
  ]);
  const [newInterest, setNewInterest] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function addInterest() {
    const value = newInterest.trim();

    if (!value) {
      return;
    }

    const alreadyAdded = interests.some(
      (interest) => interest.toLowerCase() === value.toLowerCase()
    );

    if (!alreadyAdded) {
      setInterests([...interests, value]);
    }

    setNewInterest("");
    setError("");
    setSaved(false);
  }

  function removeInterest(value) {
    setInterests(interests.filter((interest) => interest !== value));
    setSaved(false);
  }

  function handleSave(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = form.get("clubName").trim();
    const description = form.get("description").trim();

    setError("");
    setSaved(false);

    if (!name || !description) {
      setError("Enter the club name and description.");
      return;
    }

    if (interests.length === 0) {
      setError("Add at least one interest.");
      return;
    }

    setClubName(name);
    setSaved(true);
  }

  return (
    <div className="home-wrapper">
      <main className="profile-page home-page manager-page">
        <aside className="profile-sidebar">
          <div className="profile-brand">
            <span className="profile-logo">K</span>
            <div>
              <strong>KFUPM Circle</strong>
              <p>Campus connections</p>
            </div>
          </div>

          <div className="manager-workspace">
            <span>CLUB WORKSPACE</span>
            <strong>Game Dev Club</strong>
          </div>

          <nav
            className="profile-navigation manager-navigation"
            aria-label="Club navigation"
          >
            {navigation.map((item) => {
              const isActive = activeView === "overview" ? item.label === "Club Overview" : item.label === activeView[0].toUpperCase() + activeView.slice(1);
              const viewKey = item.label === "Club Overview" ? "overview" : item.label.toLowerCase();

              return (
                <button
                  key={item.label}
                  type="button"
                  className={isActive ? "home-nav-active" : ""}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => {
                    if (viewKey === "overview" || viewKey === "announcements") {
                      setActiveView(viewKey);
                    }
                  }}
                  disabled={viewKey !== "overview" && viewKey !== "announcements"}
                >
                  <Icon name={item.icon} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="manager-student-access">
            <p>STUDENT CAPABILITIES</p>
            <button type="button" disabled>
              <Icon name="back" />
              Return to student view
            </button>
          </div>

          <div className="profile-user">
            <span className="profile-avatar">SM</span>
            <div>
              <strong>Sara Mansour</strong>
              <p>Club manager</p>
            </div>
            <button
              type="button"
              className="home-logout"
              aria-label="Sign out"
              onClick={onSignOut}
            >
              <Icon name="logout" />
            </button>
          </div>
        </aside>

        <div className="profile-main">
          <header className="profile-header">
            <div>
              <span>Game Dev Club</span>
              {" / "}
              <strong>
                {activeView === "announcements"
                  ? "Announcements"
                  : "Manage Club Information"}
              </strong>
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
            {activeView === "announcements" ? (
              <ClubAnnouncements />
            ) : (
              <>
            <div className="home-welcome">
              <div>
                <p className="home-date">ASSIGNED CLUB ONLY</p>
                <h1>{clubName}</h1>
                <p className="home-description">
                  Manage approved information for your assigned club.
                </p>
              </div>
            </div>

            <div className="manager-shortcuts">
              {shortcuts.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="home-shortcut"
                  onClick={() => {
                    if (item.label === "Announcements") {
                      setActiveView("announcements");
                    }
                  }}
                  disabled={item.label !== "Announcements"}
                >
                  <span className="manager-shortcut-icon">
                    <Icon name={item.icon} />
                  </span>
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.description}</small>
                  </span>
                  <Icon name="arrow" />
                </button>
              ))}
            </div>

            <form
              className="profile-form"
              onSubmit={handleSave}
              onChange={() => setSaved(false)}
            >
              <div className="profile-section">
                <div className="profile-section-description">
                  <h2>Club information</h2>
                  <p>This content appears on the student club page.</p>
                </div>

                <div className="profile-fields">
                  <div className="profile-field-pair">
                    <div className="profile-field">
                      <label htmlFor="club-name">Club name *</label>
                      <input
                        id="club-name"
                        name="clubName"
                        defaultValue="Game Development Club"
                        required
                      />
                    </div>

                    <div className="profile-field">
                      <label htmlFor="club-email">Contact email *</label>
                      <input
                        id="club-email"
                        name="contactEmail"
                        type="email"
                        defaultValue="gamedev@clubs.kfupm.edu.sa"
                        required
                      />
                    </div>
                  </div>

                  <div className="profile-field">
                    <label htmlFor="club-description">Description *</label>
                    <textarea
                      id="club-description"
                      name="description"
                      defaultValue="Learn game design, explore development tools, and collaborate with other students on playable projects."
                      required
                    />
                  </div>

                  <div className="profile-field">
                    <label htmlFor="club-interest">Interests *</label>
                    <div className="profile-tags">
                      {interests.map((interest) => (
                        <span className="profile-tag" key={interest}>
                          {interest}
                          <button
                            type="button"
                            aria-label={`Remove ${interest}`}
                            onClick={() => removeInterest(interest)}
                          >
                            ×
                          </button>
                        </span>
                      ))}

                      <input
                        id="club-interest"
                        value={newInterest}
                        placeholder="Add an interest..."
                        onChange={(event) =>
                          setNewInterest(event.target.value)
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            addInterest();
                          }
                        }}
                      />

                      {newInterest.trim() && (
                        <button
                          type="button"
                          className="profile-add"
                          onClick={addInterest}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <p className="profile-error" role="alert">
                  {error}
                </p>
              )}

              {saved && (
                <p className="profile-success" role="status">
                  Club information updated for this session.
                </p>
              )}

              <div className="profile-form-footer">
                <p>You can modify only your assigned club.</p>
                <button type="submit">Save changes</button>
              </div>
            </form>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}