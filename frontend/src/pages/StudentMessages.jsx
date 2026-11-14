import { useState } from "react";
import Icon from "../components/StudentIcon";
import { getFirstName, students } from "../data/studentData";
import "./StudentMessages.css";

const maxLength = 2000;

export default function StudentMessages({
  connections,
  conversations,
  activeId,
  onSelect,
  onSend,
  onOpenProfile,
  onViewRequests,
}) {
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");

  // Messaging is limited to accepted connections.
  const connected = students.filter(
    (student) => connections[student.id] && connections[student.id].status === "connected"
  );

  if (connected.length === 0) {
    return (
      <section>
        <header className="student-heading">
          <div>
            <h1>Messages</h1>
            <p>Private conversations with your accepted connections.</p>
          </div>
        </header>

        <div className="student-empty student-empty-dashed messages-empty">
          <span className="student-empty-icon">
            <Icon name="search" />
          </span>
          <h3>Connect before you message</h3>
          <p>Messaging is available only after a connection request has been accepted.</p>
          <button type="button" className="student-button" onClick={onViewRequests}>
            View connection requests
          </button>
        </div>
      </section>
    );
  }

  // Show conversations with messages, plus the one the student just opened.
  const lastMessage = (id) => {
    const thread = conversations[id] || [];
    return thread[thread.length - 1];
  };

  const threads = connected
    .filter((student) => lastMessage(student.id) || student.id === activeId)
    .sort((a, b) => {
      const first = lastMessage(a.id);
      const second = lastMessage(b.id);
      return (second ? second.id : Infinity) - (first ? first.id : Infinity);
    });

  const active =
    connected.find((student) => student.id === activeId) || threads[0] || null;
  const visibleThreads = threads.filter((student) =>
    student.name.toLowerCase().includes(search.trim().toLowerCase())
  );
  const messages = active ? conversations[active.id] || [] : [];

  function handleSend(event) {
    event.preventDefault();

    if (!draft.trim()) {
      setError("Write a message before sending.");
      return;
    }

    onSend(active, draft.trim());
    setDraft("");
    setError("");
  }

  return (
    <section className="messages-layout">
      <aside className="messages-list">
        <div className="messages-list-top">
          <h1>Messages</h1>
          <Icon name="search" size={17} />
        </div>

        <label className="student-search">
          <Icon name="search" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search conversations"
            aria-label="Search conversations"
          />
        </label>

        <ul>
          {visibleThreads.map((student) => {
            const last = lastMessage(student.id);
            const isActive = active && active.id === student.id;

            return (
              <li key={student.id}>
                <button
                  type="button"
                  className={isActive ? "messages-thread is-active" : "messages-thread"}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => onSelect(student.id)}
                >
                  <span className="student-avatar">{student.initials}</span>
                  <span className="messages-thread-text">
                    <strong>{student.name}</strong>
                    <small>{last ? last.text : "No messages yet"}</small>
                  </span>
                  <time>{last ? last.listTime : ""}</time>
                </button>
              </li>
            );
          })}

          {visibleThreads.length === 0 && (
            <li className="messages-no-results">No conversations match your search.</li>
          )}
        </ul>
      </aside>

      {active && (
        <div className="messages-chat">
          <header className="messages-chat-header">
            <span className="student-avatar">{active.initials}</span>
            <div>
              <strong>{active.name}</strong>
              <small>● Accepted connection</small>
            </div>
            <button
              type="button"
              className="home-icon-button"
              aria-label={`View ${active.name}'s profile`}
              onClick={() => onOpenProfile(active.id)}
            >
              <Icon name="person" />
            </button>
          </header>

          <ol className="messages-thread-body" aria-label={`Conversation with ${active.name}`}>
            {messages.length === 0 && (
              <li className="messages-start">
                No messages yet. Say hello to {getFirstName(active.name)}.
              </li>
            )}

            {messages.map((message, index) => {
              const showDay = index === 0 || messages[index - 1].day !== message.day;
              const mine = message.from === "me";

              return (
                <li key={message.id} className={mine ? "message-out" : "message-in"}>
                  {showDay && <span className="messages-day">{message.day}</span>}
                  <div className="message-line">
                    {!mine && <span className="student-avatar">{active.initials}</span>}
                    <div>
                      <p className="message-bubble">{message.text}</p>
                      <small>
                        {mine
                          ? `You · ${message.time} · Sent`
                          : `${getFirstName(active.name)} · ${message.time}`}
                      </small>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <form className="messages-composer" onSubmit={handleSend} noValidate>
            <textarea
              value={draft}
              maxLength={maxLength}
              rows={3}
              placeholder="Write a message…"
              aria-label={`Message ${active.name}`}
              onChange={(event) => {
                setDraft(event.target.value);
                setError("");
              }}
              onKeyDown={(event) => {
                // Enter sends; Shift+Enter adds a new line.
                if (event.key === "Enter" && !event.shiftKey) {
                  handleSend(event);
                }
              }}
            />
            <div className="messages-composer-footer">
              {error ? (
                <p className="student-form-error" role="alert">
                  {error}
                </p>
              ) : (
                <small>
                  {draft.length} / {maxLength.toLocaleString("en-US")}
                </small>
              )}
              <button type="submit" className="student-button">
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
