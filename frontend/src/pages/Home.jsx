import { useEffect, useState } from "react";
import Icon from "../components/StudentIcon";
import { getInitials } from "../data/studentData";
import StudentDashboard from "./StudentDashboard";
import "./ProfileSetup.css";
import "./Home.css";
import "./StudentShared.css";

// Each sidebar item opens one view. Detail views keep their parent item active.
const navigation = [
  { label: "Home", icon: "home", view: "home", children: [] },
  { label: "Discover", icon: "search", view: "discover", children: ["profile"] },
  { label: "Connections", icon: "people", view: "connections", children: [] },
  { label: "Messages", icon: "message", view: "messages", children: [] },
  {
    label: "Clubs & Communities",
    icon: "club",
    view: "clubs",
    children: ["club", "proposal"],
  },
  { label: "Activities", icon: "calendar", view: "activities", children: ["activity"] },
  { label: "Invitations", icon: "inbox", view: "invitations", children: [] },
  { label: "My Profile", icon: "person", view: "my-profile", children: [] },
];

// Breadcrumb titles for each view.
const titles = {
  home: "Home",
};

// Views that are finished. Unfinished sidebar items stay disabled.
const availableViews = ["home"];

export default function Home({ profile, onAccountAccess }) {
  const [view, setView] = useState({ name: "home", id: null });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    // Hide the confirmation after a few seconds.
    const timeoutId = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  function openView(name, id = null) {
    setView({ name, id });
    window.scrollTo(0, 0);
  }

  function renderView() {
    return <StudentDashboard profile={profile} />;
  }

  return (
    <div className="home-wrapper">
      <main className="profile-page home-page student-page">
        <aside className="profile-sidebar">
          <div className="profile-brand">
            <span className="profile-logo">K</span>
            <div>
              <strong>KFUPM Circle</strong>
              <p>Campus connections</p>
            </div>
          </div>

          <nav className="profile-navigation" aria-label="Student navigation">
            {navigation.map((item) => {
              const isActive =
                view.name === item.view || item.children.includes(view.name);

              return (
                <button
                  key={item.label}
                  type="button"
                  className={isActive ? "home-nav-active" : ""}
                  aria-current={isActive ? "page" : undefined}
                  disabled={!availableViews.includes(item.view)}
                  onClick={() => openView(item.view)}
                >
                  <Icon name={item.icon} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="profile-user">
            <span className="profile-avatar">{getInitials(profile.fullName)}</span>
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
              <strong>{titles[view.name]}</strong>
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

          <div className="home-content">{renderView()}</div>
        </div>
      </main>

      {toast && (
        <div className="student-toast" role="status">
          <span className="student-toast-icon">
            <Icon name="check" />
          </span>
          <span className="student-toast-text">
            <strong>{toast.title}</strong>
            <small>{toast.message}</small>
          </span>
          <button
            type="button"
            aria-label="Dismiss confirmation"
            onClick={() => setToast(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
