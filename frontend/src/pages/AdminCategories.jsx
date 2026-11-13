import { useEffect, useState } from "react";
import "./AdminCategories.css";

// These starter values are the options currently shown to students.
const categories = [
  {
    name: "Majors",
    values: [
      "Software Engineering",
      "Computer Science",
      "Information Systems",
      "Electrical Engineering",
    ],
  },
  {
    name: "Courses",
    values: ["SWE 363", "SWE 387", "ICS 343", "ICS 381"],
  },
  {
    name: "Interests",
    values: [
      "Game development",
      "UX research",
      "Artificial intelligence",
      "Cybersecurity",
    ],
  },
];

function Icon({ name }) {
  // Use one small SVG component for the repeated category actions.
  const paths = {
    add: "M12 5v14M5 12h14",
    edit: "m16 3 5 5-12 12-6 1 1-6ZM14 5l5 5",
    delete: "M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7",
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}

export default function AdminCategories() {
  // Notifications and blocked-removal warnings have independent lifetimes.
  const [notification, setNotification] = useState(null);
  const [removalWarning, setRemovalWarning] = useState("");

  useEffect(() => {
    if (!notification) return undefined;

    const timeoutId = window.setTimeout(() => setNotification(null), 1000);
    return () => window.clearTimeout(timeoutId);
  }, [notification]);

  return (
    <main className="categories-page">
      <header className="categories-heading">
        <div>
          <h1>Category management</h1>
          <p>Maintain the values students use in profiles and discovery.</p>
        </div>
        <button
          type="button"
          className="add-category-button"
          onClick={() => {
            // This prototype adds a sample value and reports the result.
            setRemovalWarning("");
            setNotification({
              title: "Category added",
              message: "Cloud Computing was added to Interests.",
            });
          }}
        >
          <Icon name="add" />
          Add value
        </button>
      </header>

      {/* Explain when an existing reference prevents a category from being removed. */}
      {removalWarning && (
        <div className="removal-warning" role="alert">
          <strong>Cannot remove “SWE 363”</strong>
          <span>
            18 student profiles and 3 recommendations reference this course.
            Reassign those references before removing it.
          </span>
          <button
            type="button"
            aria-label="Dismiss removal warning"
            onClick={() => setRemovalWarning("")}
          >
            ×
          </button>
        </div>
      )}

      {/* Each category card keeps its values and actions together. */}
      <div className="category-cards">
        {categories.map((category) => (
          <section
            className="category-card"
            key={category.name}
            aria-labelledby={`category-${category.name}`}
          >
            <header className="category-card-heading">
              <h2 id={`category-${category.name}`}>{category.name}</h2>
              <span>{category.values.length} values</span>
            </header>
            <ul className="category-value-list">
              {category.values.map((value) => (
                <li className="category-value" key={value}>
                  <span>{value}</span>
                  <div className="category-value-actions">
                    <button
                      type="button"
                      aria-label={`Edit ${value}`}
                      title={`Edit ${value}`}
                      onClick={() => {
                        setRemovalWarning("");
                        setNotification({
                          title: "Edit value",
                          message: `Editing “${value}”. Empty and duplicate values are rejected.`,
                        });
                      }}
                    >
                      <Icon name="edit" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${value}`}
                      title={`Delete ${value}`}
                      onClick={() => {
                        // This course is still referenced, so show why removal is blocked.
                        if (value === "SWE 363") {
                          setNotification(null);
                          setRemovalWarning("SWE 363");
                          return;
                        }

                        setRemovalWarning("");
                        setNotification({
                          title: "Confirm removal",
                          message: `Removal of “${value}” requires confirmation.`,
                        });
                      }}
                    >
                      <Icon name="delete" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      {/* Use a live status message for add, edit, and removal feedback. */}
      {notification && (
        <div className="category-notification" role="status" aria-live="polite">
          <span className="category-notification-check" aria-hidden="true">
            ✓
          </span>
          <div className="category-notification-message">
            <strong>{notification.title}</strong>
            <p>{notification.message}</p>
          </div>
          <button
            type="button"
            className="category-notification-close"
            aria-label="Dismiss notification"
            onClick={() => setNotification(null)}
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}
