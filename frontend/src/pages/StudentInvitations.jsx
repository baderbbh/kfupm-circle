import { useState } from "react";
import Icon from "../components/StudentIcon";
import { getFirstName, students } from "../data/studentData";
import "./StudentInvitations.css";

const statusBadges = {
  pending: { text: "Pending", tone: "student-badge-amber" },
  accepted: { text: "Accepted", tone: "student-badge-green" },
  declined: { text: "Declined", tone: "student-badge-red" },
};

// Value for the datetime-local input's minimum, in local time.
function currentDateTimeValue() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

function InvitationRow({ invitation, children }) {
  const badge = statusBadges[invitation.status];

  return (
    <div className="student-row">
      <span className="invitations-icon">
        <Icon name={invitation.type === "Club Invitation" ? "club" : "calendar"} size={16} />
      </span>
      <span className="student-row-text">
        <span className="student-badge invitations-type">{invitation.type}</span>
        <strong>{invitation.title}</strong>
        <small>{invitation.detail}</small>
      </span>
      <span className="student-row-actions">
        {children || <span className={`student-badge ${badge.tone}`}>{badge.text}</span>}
      </span>
    </div>
  );
}

export default function StudentInvitations({
  invitations,
  connections,
  onRespond,
  onSimulate,
  onSendStudySession,
}) {
  const [tab, setTab] = useState("incoming");
  const [recipient, setRecipient] = useState("");
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const incoming = invitations.filter(
    (item) => item.direction === "incoming" && item.status === "pending"
  );
  const outgoing = invitations.filter((item) => item.direction === "outgoing");
  const history = invitations.filter(
    (item) => item.direction === "incoming" && item.status !== "pending"
  );

  // Only accepted connections can receive personal invitations.
  const connected = students.filter(
    (student) => connections[student.id] && connections[student.id].status === "connected"
  );

  function handleSubmit(event) {
    event.preventDefault();
    const student = connected.find((item) => item.id === recipient);

    if (!student || !title.trim() || !dateTime || !location.trim()) {
      setError("Choose a recipient and enter the session title, date and time, and location.");
      return;
    }

    if (new Date(dateTime) <= new Date()) {
      setError("Choose a future date and time.");
      return;
    }

    const fullTitle = `${title.trim()} with ${getFirstName(student.name)}`;
    const duplicate = invitations.some(
      (item) =>
        item.direction === "outgoing" &&
        item.status === "pending" &&
        item.title.toLowerCase() === fullTitle.toLowerCase()
    );

    if (duplicate) {
      setError("A duplicate pending invitation cannot be created.");
      return;
    }

    const date = new Date(dateTime);
    onSendStudySession(student, {
      title: fullTitle,
      detail: `${date.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })} · ${date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })} · ${location.trim()}`,
    });

    setError("");
    setTitle("");
    setDateTime("");
    setLocation("");
    setTab("outgoing");
  }

  const tabs = [
    { key: "incoming", label: "Incoming", count: incoming.length },
    { key: "outgoing", label: "Outgoing", count: outgoing.length },
    { key: "history", label: "History", count: history.length },
  ];

  return (
    <section>
      <header className="student-heading">
        <div>
          <h1>Invitations</h1>
          <p>Manage activity, club, and personal invitations.</p>
        </div>
      </header>

      <div className="student-tabs" role="tablist" aria-label="Invitation lists">
        {tabs.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={tab === item.key}
            onClick={() => setTab(item.key)}
          >
            {item.label}
            <span>{item.count}</span>
          </button>
        ))}
      </div>

      <div className="invitations-layout">
        <div>
          {tab === "incoming" && (
            <section className="student-panel">
              <header className="student-panel-header">
                <h2>Incoming</h2>
              </header>
              {incoming.length === 0 ? (
                <div className="student-empty">
                  <span className="student-empty-icon">
                    <Icon name="search" />
                  </span>
                  <h3>No incoming invitations</h3>
                  <p>New activity and club invitations will appear here.</p>
                </div>
              ) : (
                incoming.map((invitation) => (
                  <InvitationRow key={invitation.id} invitation={invitation}>
                    <button
                      type="button"
                      className="student-button-quiet"
                      onClick={() => onRespond(invitation, false)}
                    >
                      Decline
                    </button>
                    <button
                      type="button"
                      className="student-button"
                      onClick={() => onRespond(invitation, true)}
                    >
                      Accept
                    </button>
                  </InvitationRow>
                ))
              )}
            </section>
          )}

          {tab === "outgoing" && (
            <section className="student-panel">
              <header className="student-panel-header">
                <h2>Outgoing</h2>
              </header>
              {outgoing.length === 0 ? (
                <div className="student-empty">
                  <span className="student-empty-icon">
                    <Icon name="inbox" />
                  </span>
                  <h3>No outgoing invitations</h3>
                  <p>Invite a companion from an activity or arrange a study session.</p>
                </div>
              ) : (
                outgoing.map((invitation) => (
                  <InvitationRow key={invitation.id} invitation={invitation}>
                    {invitation.status === "pending" ? (
                      <>
                        <span className="student-badge student-badge-amber">Pending</span>
                        <button
                          type="button"
                          className="student-button-outline"
                          onClick={() => onSimulate(invitation)}
                        >
                          Simulate response
                        </button>
                      </>
                    ) : null}
                  </InvitationRow>
                ))
              )}
            </section>
          )}

          {tab === "history" && (
            <section className="student-panel">
              <header className="student-panel-header">
                <h2>History</h2>
              </header>
              {history.length === 0 ? (
                <div className="student-empty">
                  <span className="student-empty-icon">
                    <Icon name="inbox" />
                  </span>
                  <h3>No past invitations</h3>
                  <p>Invitations you accept or decline will appear here.</p>
                </div>
              ) : (
                history.map((invitation) => (
                  <InvitationRow key={invitation.id} invitation={invitation} />
                ))
              )}
            </section>
          )}
        </div>

        <form className="student-panel invitations-form" onSubmit={handleSubmit} noValidate>
          <h2>Arrange a study session</h2>
          <p>Invite one of your accepted connections to a personal activity.</p>

          <div className="profile-field">
            <label htmlFor="study-recipient">Recipient *</label>
            <select
              id="study-recipient"
              value={recipient}
              disabled={connected.length === 0}
              onChange={(event) => setRecipient(event.target.value)}
            >
              <option value="">
                {connected.length === 0 ? "No accepted connections" : "Select a connection"}
              </option>
              {connected.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          <div className="profile-field">
            <label htmlFor="study-title">Session title *</label>
            <input
              id="study-title"
              value={title}
              placeholder="SWE 363 exam review"
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className="invitations-pair">
            <div className="profile-field">
              <label htmlFor="study-date">Future date &amp; time *</label>
              <input
                id="study-date"
                type="datetime-local"
                value={dateTime}
                min={currentDateTimeValue()}
                onChange={(event) => setDateTime(event.target.value)}
              />
            </div>
            <div className="profile-field">
              <label htmlFor="study-location">Location *</label>
              <input
                id="study-location"
                value={location}
                placeholder="Library, Room 3B"
                onChange={(event) => setLocation(event.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="student-form-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="student-button" disabled={connected.length === 0}>
            Send invitation
          </button>
          <small>Only accepted connections can be invited.</small>
        </form>
      </div>
    </section>
  );
}
