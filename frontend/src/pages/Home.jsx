import { useEffect, useState } from "react";
import Icon from "../components/StudentIcon";
import {
  activities,
  getFirstName,
  getInitials,
  startingConnections,
  students,
} from "../data/studentData";
import ReportDialog from "./ReportDialog";
import StudentConnections from "./StudentConnections";
import StudentDashboard from "./StudentDashboard";
import StudentDiscover from "./StudentDiscover";
import StudentProfileView from "./StudentProfileView";
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
  discover: "Discover Students",
  profile: "Student Profile",
  connections: "Connections and Requests",
};

// Views that are finished. Unfinished sidebar items stay disabled.
const availableViews = ["home", "discover", "connections"];

// Increasing number used to order connections and messages by recency.
let lastStamp = 100;

function nextStamp() {
  lastStamp += 1;
  return lastStamp;
}

export default function Home({ profile, onAccountAccess }) {
  const [view, setView] = useState({ name: "home", id: null });
  const [toast, setToast] = useState(null);
  const [connections, setConnections] = useState(startingConnections);
  const [reportSubject, setReportSubject] = useState(null);

  const joinedClubs = profile.clubs || [];

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

  function showToast(title, message) {
    setToast({ title, message });
  }

  function updateConnection(studentId, status, note) {
    // The time stamp keeps the newest connections at the top of each list.
    setConnections({
      ...connections,
      [studentId]: { status, note, updatedAt: nextStamp() },
    });
  }

  function sendConnectionRequest(student) {
    updateConnection(student.id, "outgoing", "Request sent today");
    showToast(
      "Connection request sent",
      `${getFirstName(student.name)} can accept or reject your request.`
    );
  }

  function acceptConnection(student) {
    updateConnection(student.id, "connected", "Connected today");
    showToast(
      "Connection accepted",
      `${getFirstName(student.name)} is now in your connections.`
    );
  }

  function rejectConnection(student) {
    const remaining = { ...connections };
    delete remaining[student.id];
    setConnections(remaining);
    showToast(
      "Request rejected",
      `${getFirstName(student.name)} will not be added to your connections.`
    );
  }

  // Demo shortcut for a student accepting a request the user sent.
  function simulateAcceptance(student) {
    updateConnection(student.id, "connected", "Connected today");
    showToast(
      `Request accepted by ${getFirstName(student.name)}`,
      "You can now message each other."
    );
  }

  function submitReport() {
    setReportSubject(null);
    showToast(
      "Report submitted",
      "An administrator will review it. No content was automatically removed."
    );
  }

  function renderView() {
    if (view.name === "discover") {
      return (
        <StudentDiscover
          profile={profile}
          joinedClubs={joinedClubs}
          onOpenProfile={(id) => openView("profile", id)}
        />
      );
    }

    if (view.name === "connections") {
      return (
        <StudentConnections
          profile={profile}
          joinedClubs={joinedClubs}
          connections={connections}
          onAccept={acceptConnection}
          onReject={rejectConnection}
          onSimulateAccept={simulateAcceptance}
          onOpenProfile={(id) => openView("profile", id)}
          onFindPeople={() => openView("discover")}
        />
      );
    }

    if (view.name === "profile") {
      const student = students.find((item) => item.id === view.id);
      const activity = activities.find(
        (item) => item.id === student.interestedActivities[0]
      );

      return (
        <StudentProfileView
          student={student}
          profile={profile}
          joinedClubs={joinedClubs}
          connection={connections[student.id]}
          interestedIn={activity ? activity.title : null}
          onBack={() => openView("discover")}
          onConnect={() => sendConnectionRequest(student)}
          onAccept={() => acceptConnection(student)}
          onReport={() => setReportSubject(student.name)}
        />
      );
    }

    return <StudentDashboard profile={profile} />;
  }

  // Sidebar counts for items that need the student's attention.
  const counts = {
    connections: Object.values(connections).filter(
      (item) => item.status === "incoming"
    ).length,
  };

  // The profile breadcrumb includes the student's name.
  let title = titles[view.name];
  if (view.name === "profile") {
    const student = students.find((item) => item.id === view.id);
    title = `${title} — ${student.name}`;
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
                  {counts[item.view] > 0 && (
                    <span className="student-nav-count">{counts[item.view]}</span>
                  )}
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
              <strong>{title}</strong>
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

      {reportSubject && (
        <ReportDialog
          subject={reportSubject}
          onCancel={() => setReportSubject(null)}
          onSubmit={submitReport}
        />
      )}

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
