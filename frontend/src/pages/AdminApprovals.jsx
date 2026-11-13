import { useEffect, useState } from "react";
import "./AdminApprovals.css";

export default function AdminApprovals() {
  // Keep the correction confirmation visible only briefly.
  const [showCorrectionMessage, setShowCorrectionMessage] = useState(false);

  useEffect(() => {
    if (!showCorrectionMessage) return undefined;

    // Clear the confirmation after a short pause, and cancel it on unmount.
    const timeoutId = window.setTimeout(
      () => setShowCorrectionMessage(false),
      1000,
    );
    return () => window.clearTimeout(timeoutId);
  }, [showCorrectionMessage]);

  return (
    <main className="approvals-page">
      <header className="approvals-header">
        <h1 className="approvals-title">Club proposals &amp; corrections</h1>
        <p className="approvals-description">
          Review pending communities and correct permitted club information.
        </p>
      </header>

      <section className="proposals-card" aria-labelledby="pending-proposals">
        {/* Tabs provide a direct jump to the published-club list below. */}
        <div className="proposals-tab-row">
          <h2 className="proposals-tab" id="pending-proposals">
            Pending proposals <span className="proposal-count">0</span>
          </h2>
          <button
            type="button"
            className="proposals-tab-inactive"
            onClick={() =>
              document
                .getElementById("published-clubs")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
          >
            Published clubs
          </button>
        </div>
      </section>

      {/* An empty state explains that there is nothing waiting for review. */}
      <section className="empty-state" role="status">
        <span className="empty-state-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 4.5 4.5" />
          </svg>
        </span>
        <strong>No proposals awaiting review</strong>
        <p>All submitted proposals have received a decision.</p>
      </section>

      <section
        className="published-clubs"
        id="published-clubs"
        aria-labelledby="published-clubs-title"
      >
        {/* Published clubs can be corrected without entering the proposal queue. */}
        <header className="published-clubs-header">
          <h2 id="published-clubs-title">Published clubs</h2>
          <p>Corrections require a recorded reason.</p>
        </header>
        <div className="published-club-row">
          <span className="published-club-avatar" aria-hidden="true">
            GD
          </span>
          <div className="published-club-details">
            <strong>Game Development Club</strong>
            <p>
              Manager: Sara Mansour · gamedev@clubs.kfupm.edu.sa
            </p>
          </div>
          <button
            type="button"
            className="correct-club-button"
            onClick={() => setShowCorrectionMessage(true)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 5 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z" />
            </svg>
            Correct information
          </button>
        </div>
      </section>
      {/* Keep the save confirmation dismissible and screen-reader friendly. */}
      {showCorrectionMessage && (
        <div className="correction-toast" role="status" aria-live="polite">
          <span className="correction-toast-check" aria-hidden="true">
            ✓
          </span>
          <div className="correction-toast-message">
            <strong>Correction saved</strong>
            <p>The update and reason were recorded.</p>
          </div>
          <button
            type="button"
            className="correction-toast-close"
            aria-label="Dismiss notification"
            onClick={() => setShowCorrectionMessage(false)}
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}
