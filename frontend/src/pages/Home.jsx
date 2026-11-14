import { useEffect, useState } from "react";
import Icon from "../components/StudentIcon";
import {
  activities,
  clubs,
  getFirstName,
  getInitials,
  startingConnections,
  startingConversations,
  startingInvitations,
  students,
} from "../data/studentData";
import ReportDialog from "./ReportDialog";
import StudentActivities from "./StudentActivities";
import StudentActivityDetails from "./StudentActivityDetails";
import StudentClubDetails from "./StudentClubDetails";
import StudentClubs from "./StudentClubs";
import StudentCommunityProposal from "./StudentCommunityProposal";
import StudentConnections from "./StudentConnections";
import StudentDashboard from "./StudentDashboard";
import StudentDiscover from "./StudentDiscover";
import StudentInvitations from "./StudentInvitations";
import StudentMessages from "./StudentMessages";
import StudentMyProfile from "./StudentMyProfile";
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
  messages: "Messages",
  clubs: "Clubs and Communities",
  club: "Club Details",
  proposal: "Community Proposal",
  activities: "Campus Activities",
  activity: "Activity Details and Companion Discovery",
  invitations: "Invitations",
  "my-profile": "My Profile / Edit Profile",
};

// Increasing number used to order connections and messages by recency.
let lastStamp = 100;

function nextStamp() {
  lastStamp += 1;
  return lastStamp;
}

// Builds a chat message stamped with the current time.
function createMessage(from, text) {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return {
    id: nextStamp(),
    from,
    text,
    day: "Today",
    time,
    listTime: time.replace(/ [AP]M$/, ""),
  };
}

export default function Home({ profile, onAccountAccess, onProfileChange }) {
  const [view, setView] = useState({ name: "home", id: null });
  const [toast, setToast] = useState(null);
  const [connections, setConnections] = useState(startingConnections);
  const [reportSubject, setReportSubject] = useState(null);
  const [conversations, setConversations] = useState(startingConversations);
  const [memberships, setMemberships] = useState({});
  const [proposal, setProposal] = useState(null);
  const [interested, setInterested] = useState([]);
  const [invitations, setInvitations] = useState(startingInvitations);

  // Clubs from the profile plus clubs joined in this session.
  const joinedClubs = [
    ...(profile.clubs || []),
    ...clubs.filter((club) => memberships[club.id] === "member").map((club) => club.name),
  ];

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

  function addMessage(studentId, message) {
    setConversations({
      ...conversations,
      [studentId]: [...(conversations[studentId] || []), message],
    });
  }

  function sendMessage(student, text) {
    addMessage(student.id, createMessage("me", text));
    showToast(
      "Message sent",
      `Your message was delivered to ${getFirstName(student.name)}.`
    );
  }

  // Demo shortcut for a student accepting a request the user sent.
  function simulateAcceptance(student) {
    updateConnection(student.id, "connected", "Connected today");
    addMessage(
      student.id,
      createMessage("them", `Hi ${getFirstName(profile.fullName)}, thanks for connecting.`)
    );
    showToast(
      `Request accepted by ${getFirstName(student.name)}`,
      "You can now message each other."
    );
  }

  function requestMembership(club) {
    setMemberships({ ...memberships, [club.id]: "pending" });
    showToast("Membership requested", "The club manager will review your request.");
  }

  function leaveClub(club) {
    const remaining = { ...memberships };
    delete remaining[club.id];
    setMemberships(remaining);
    showToast(`You left ${club.name}`, "You can request membership again at any time.");
  }

  function submitProposal(details) {
    setProposal(details);
    showToast("Proposal submitted", "Administrators will review your community proposal.");
  }

  function markInterest(activity) {
    setInterested([...interested, activity.id]);
    showToast("Interest recorded", "You can now discover other interested students.");
  }

  // Inviting a companion also sends a connection request if needed.
  function inviteCompanion(student, activity) {
    const firstName = getFirstName(student.name);
    const connection = connections[student.id];

    setInvitations([
      {
        id: nextStamp(),
        direction: "outgoing",
        type: "Event Companion",
        title: `${activity.title} with ${firstName}`,
        detail: `${activity.fullDate.replace(/ \d{4}$/, "")} · ${activity.time}`,
        personId: student.id,
        activityId: activity.id,
        status: "pending",
      },
      ...invitations,
    ]);

    if (!connection) {
      updateConnection(student.id, "outgoing", "Request sent today");
      showToast(
        "Invitation and connection request sent",
        `${firstName} can respond to each request separately.`
      );
    } else {
      showToast("Invitation sent", `${firstName} can respond in Invitations.`);
    }
  }

  function setInvitationStatus(invitation, status) {
    setInvitations(
      invitations.map((item) =>
        item.id === invitation.id ? { ...item, status } : item
      )
    );
  }

  // Accepting a club or activity invitation also joins it.
  function respondToInvitation(invitation, accept) {
    setInvitationStatus(invitation, accept ? "accepted" : "declined");

    if (!accept) {
      showToast("Invitation declined", "It has been moved to your invitation history.");
      return;
    }

    if (invitation.clubId) {
      setMemberships({ ...memberships, [invitation.clubId]: "member" });
    }

    if (invitation.activityId && !interested.includes(invitation.activityId)) {
      setInterested([...interested, invitation.activityId]);
    }

    showToast("Invitation accepted", "You can find it in your invitation history.");
  }

  // Demo shortcut for the other student accepting an outgoing invitation.
  function simulateInvitationResponse(invitation) {
    const student = students.find((item) => item.id === invitation.personId);
    const firstName = getFirstName(student.name);
    const connection = connections[student.id];
    setInvitationStatus(invitation, "accepted");
    showToast(
      `${firstName} accepted`,
      connection && connection.status === "connected"
        ? `The invitation is accepted and you may message ${firstName}.`
        : "The invitation is accepted. Messaging still needs an accepted connection."
    );
  }

  function sendStudySession(student, details) {
    setInvitations([
      {
        id: nextStamp(),
        direction: "outgoing",
        type: "Study Session",
        title: details.title,
        detail: details.detail,
        personId: student.id,
        status: "pending",
      },
      ...invitations,
    ]);
    showToast(
      "Study invitation sent",
      `${getFirstName(student.name)} can accept or decline it in Invitations.`
    );
  }

  function saveProfile(details) {
    onProfileChange(details);
    showToast("Profile saved", "Your profile information is up to date.");
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
          onMessage={(id) => openView("messages", id)}
        />
      );
    }

    if (view.name === "messages") {
      return (
        <StudentMessages
          connections={connections}
          conversations={conversations}
          activeId={view.id}
          onSelect={(id) => setView({ name: "messages", id })}
          onSend={sendMessage}
          onOpenProfile={(id) => openView("profile", id)}
          onViewRequests={() => openView("connections")}
        />
      );
    }

    if (view.name === "clubs") {
      return (
        <StudentClubs
          memberships={memberships}
          proposal={proposal}
          onOpenClub={(id) => openView("club", id)}
          onPropose={() => openView("proposal")}
        />
      );
    }

    if (view.name === "club") {
      const club = clubs.find((item) => item.id === view.id);

      return (
        <StudentClubDetails
          club={club}
          membership={memberships[club.id]}
          onBack={() => openView("clubs")}
          onRequest={() => requestMembership(club)}
          onLeave={() => leaveClub(club)}
          onReport={() => setReportSubject(club.name)}
          onOpenActivity={(id) => openView("activity", id)}
        />
      );
    }

    if (view.name === "activities") {
      return (
        <StudentActivities
          interested={interested}
          onOpenActivity={(id) => openView("activity", id)}
          onArrange={() => openView("invitations")}
        />
      );
    }

    if (view.name === "activity") {
      const activity = activities.find((item) => item.id === view.id);
      const invitedIds = invitations
        .filter(
          (item) => item.direction === "outgoing" && item.activityId === activity.id
        )
        .map((item) => item.personId)
        .reverse();

      return (
        <StudentActivityDetails
          activity={activity}
          profile={profile}
          joinedClubs={joinedClubs}
          isInterested={interested.includes(activity.id)}
          invitedIds={invitedIds}
          onBack={() => openView("activities")}
          onMarkInterest={() => markInterest(activity)}
          onInvite={(student) => inviteCompanion(student, activity)}
          onOpenProfile={(id) => openView("profile", id)}
        />
      );
    }

    if (view.name === "invitations") {
      return (
        <StudentInvitations
          invitations={invitations}
          connections={connections}
          onRespond={respondToInvitation}
          onSimulate={simulateInvitationResponse}
          onSendStudySession={sendStudySession}
        />
      );
    }

    if (view.name === "my-profile") {
      return <StudentMyProfile profile={profile} onSave={saveProfile} />;
    }

    if (view.name === "proposal") {
      return (
        <StudentCommunityProposal
          proposal={proposal}
          onSubmit={submitProposal}
          onBack={() => openView("clubs")}
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
          onMessage={() => openView("messages", student.id)}
          onReport={() => setReportSubject(student.name)}
        />
      );
    }

    return <StudentDashboard profile={profile} onOpen={openView} />;
  }

  // Sidebar counts for items that need the student's attention.
  const counts = {
    connections: Object.values(connections).filter(
      (item) => item.status === "incoming"
    ).length,
    invitations: invitations.filter(
      (item) => item.direction === "incoming" && item.status === "pending"
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
