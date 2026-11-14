import { useState } from "react";
import Icon from "../components/StudentIcon";
import { getFirstName, getSharedAttributes, students } from "../data/studentData";
import "./StudentConnections.css";

function EmptyState({ title, message }) {
  return (
    <div className="student-empty">
      <span className="student-empty-icon">
        <Icon name="search" />
      </span>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

function PersonText({ student, detail, note, onOpenProfile }) {
  return (
    <span className="student-row-text">
      <button
        type="button"
        className="connections-name"
        onClick={() => onOpenProfile(student.id)}
      >
        {student.name}
      </button>
      <small>{detail}</small>
      {note && <small>{note}</small>}
    </span>
  );
}

export default function StudentConnections({
  profile,
  joinedClubs,
  connections,
  onAccept,
  onReject,
  onSimulateAccept,
  onOpenProfile,
  onFindPeople,
  onMessage,
}) {
  const [tab, setTab] = useState("incoming");

  // Group the sample students by their connection status.
  function withStatus(status) {
    return students
      .filter(
        (student) =>
          connections[student.id] && connections[student.id].status === status
      )
      .sort(
        (a, b) =>
          (connections[b.id].updatedAt || 0) - (connections[a.id].updatedAt || 0)
      );
  }

  const incoming = withStatus("incoming");
  const outgoing = withStatus("outgoing");
  const connected = withStatus("connected");

  function sharedText(student) {
    const shared = getSharedAttributes(profile, student, joinedClubs);
    const items = [...shared.courses, ...shared.interests, ...shared.clubs];
    return items.length > 0
      ? `${student.major} · Shared: ${items.join(", ")}`
      : student.major;
  }

  const tabs = [
    { key: "incoming", label: "Incoming", count: incoming.length },
    { key: "outgoing", label: "Outgoing", count: outgoing.length },
    { key: "connected", label: "Connected", count: connected.length },
  ];

  return (
    <section>
      <header className="student-heading">
        <div>
          <h1>Connections</h1>
          <p>Manage requests and people in your campus circle.</p>
        </div>
        <button type="button" className="student-button" onClick={onFindPeople}>
          <Icon name="plus" />
          Find people
        </button>
      </header>

      <div className="student-tabs" role="tablist" aria-label="Connection lists">
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

      {tab === "incoming" && (
        <section className="student-panel">
          <header className="student-panel-header">
            <h2>Incoming requests</h2>
            <p>Respond once to each request.</p>
          </header>

          {incoming.length === 0 ? (
            <EmptyState
              title="You’re all caught up"
              message="There are no pending incoming connection requests."
            />
          ) : (
            incoming.map((student) => (
              <div className="student-row" key={student.id}>
                <span className="student-avatar">{student.initials}</span>
                <PersonText
                  student={student}
                  detail={sharedText(student)}
                  note={connections[student.id].note}
                  onOpenProfile={onOpenProfile}
                />
                <span className="student-row-actions">
                  <button
                    type="button"
                    className="student-button-quiet"
                    onClick={() => onReject(student)}
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    className="student-button"
                    onClick={() => onAccept(student)}
                  >
                    Accept
                  </button>
                </span>
              </div>
            ))
          )}
        </section>
      )}

      {tab === "outgoing" && (
        <section className="student-panel">
          <header className="student-panel-header">
            <h2>Outgoing requests</h2>
            <p>Requests you sent that are waiting for a response.</p>
          </header>

          {outgoing.length === 0 ? (
            <EmptyState
              title="No pending requests"
              message="Requests you send from Discover or a student profile will appear here."
            />
          ) : (
            outgoing.map((student) => (
              <div className="student-row" key={student.id}>
                <span className="student-avatar">{student.initials}</span>
                <PersonText
                  student={student}
                  detail={`${student.major} · ${student.courses[0]}, ${student.interests[0]}`}
                  onOpenProfile={onOpenProfile}
                />
                <span className="student-row-actions">
                  <span className="student-badge student-badge-amber">Pending</span>
                  <button
                    type="button"
                    className="student-button-outline"
                    onClick={() => onSimulateAccept(student)}
                  >
                    Simulate {getFirstName(student.name)} accepting
                  </button>
                </span>
              </div>
            ))
          )}
        </section>
      )}

      {tab === "connected" && (
        <section className="student-panel">
          <header className="student-panel-header">
            <h2>Accepted connections</h2>
            <p>You can message and invite these students.</p>
          </header>

          {connected.length === 0 ? (
            <EmptyState
              title="No connections yet"
              message="Find students who share your courses and interests to start your circle."
            />
          ) : (
            connected.map((student) => (
              <div className="student-row" key={student.id}>
                <span className="student-avatar">{student.initials}</span>
                <PersonText
                  student={student}
                  detail={connections[student.id].note}
                  onOpenProfile={onOpenProfile}
                />
                <span className="student-row-actions">
                  {onMessage ? (
                    <button
                      type="button"
                      className="student-button-outline"
                      onClick={() => onMessage(student.id)}
                    >
                      <Icon name="message" />
                      Message
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="student-button-outline"
                      onClick={() => onOpenProfile(student.id)}
                    >
                      View profile
                    </button>
                  )}
                </span>
              </div>
            ))
          )}
        </section>
      )}
    </section>
  );
}
