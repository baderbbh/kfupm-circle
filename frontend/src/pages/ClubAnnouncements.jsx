import { useEffect, useState } from "react";
import "./ClubAnnouncements.css";

export default function ClubAnnouncements() {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Welcome to the new semester",
      body: "Our weekly project meetups resume this Wednesday in Building 22.",
      date: "12 May",
    },
  ]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!isPublishing) {
      return undefined;
    }

    const timer = setTimeout(() => setIsPublishing(false), 1000);
    return () => clearTimeout(timer);
  }, [isPublishing]);

  useEffect(() => {
    if (!showToast) {
      return undefined;
    }

    const timer = setTimeout(() => setShowToast(false), 2000);
    return () => clearTimeout(timer);
  }, [showToast]);

  function handlePublish(event) {
    event.preventDefault();

    const announcementTitle = title.trim();
    const announcementBody = body.trim();

    if (!announcementTitle || !announcementBody) {
      return;
    }

    setAnnouncements((currentAnnouncements) => [
      {
        id: Date.now(),
        title: announcementTitle,
        body: announcementBody,
        date: "today",
        isNew: true,
      },
      ...currentAnnouncements,
    ]);
    setTitle("");
    setBody("");
    setIsPublishing(true);
    setShowToast(true);
  }

  return (
    <section>
      <header className="announcements-heading">
        <div>
          <h1>Announcements</h1>
          <p>Publish updates that appear on the Game Development Club page.</p>
        </div>
        <span>{announcements.length} Published</span>
      </header>

      <div className="announcements-content">
        <section aria-labelledby="published-announcements-heading">
          <h2 id="published-announcements-heading">
            Published announcements
          </h2>
          {announcements.map((announcement) => (
            <article
              className={announcement.isNew ? "announcement-item-new" : ""}
              key={announcement.id}
            >
              {announcement.isNew && (
                <span className="announcement-new-badge">New</span>
              )}
              <h3>{announcement.title}</h3>
              <p>{announcement.body}</p>
              <time>Published {announcement.date}</time>
            </article>
          ))}
        </section>

        <section aria-labelledby="create-announcement-heading">
          <h2 id="create-announcement-heading">Create announcement</h2>
          <p>Both fields are required.</p>
          <form onSubmit={handlePublish}>
            <div className="announcement-field">
              <label htmlFor="announcement-title">Title *</label>
              <input
                id="announcement-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={120}
                required
              />
              <span>{title.length} / 120</span>
            </div>

            <div className="announcement-field">
              <label htmlFor="announcement-body">Body *</label>
              <textarea
                id="announcement-body"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                maxLength={2000}
                required
              />
              <span>{body.length} / 2,000</span>
            </div>

            <button type="submit" disabled={isPublishing}>
              {isPublishing ? "Published" : "Publish announcement"}
            </button>
          </form>
        </section>
      </div>

      {showToast && (
        <div className="announcement-toast" role="status" aria-live="polite">
          <span className="announcement-toast-icon" aria-hidden="true">
            ✓
          </span>
          <span>
            <strong>Announcement published</strong>
            <small>Students can now see it on the club page.</small>
          </span>
        </div>
      )}
    </section>
  );
}