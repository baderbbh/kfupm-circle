import { useEffect, useState } from "react";
import "./AdminReports.css";

// Example reports used to populate the moderation queue.
export const startingReports = [
  {
    id: 1,
    reporter: "Khalid Al-Qahtani",
    target: "Student profile",
    reason: "Misleading or inappropriate content",
    submitted: "18 May 2025, 10:42 AM",
    timeAgo: "Submitted today",
    details:
      "This profile contains content that may violate community guidelines.",
    status: "Open",
  },
  {
    id: 2,
    reporter: "Photography Community",
    target: "Club",
    reason: "Outdated contact information",
    submitted: "17 May 2025, 3:15 PM",
    timeAgo: "Submitted yesterday",
    details:
      "The club contact information may no longer be accurate.",
    status: "Open",
  },
];

// Tabs group reports by the decision state chosen by an administrator.
const reportTabs = ["Open", "Resolved", "Dismissed"];

export default function AdminReports({ reports, setReports }) {
  // The selected report and its decision note reset when moving between items.
  const [activeTab, setActiveTab] = useState("Open");
  const [selectedReportId, setSelectedReportId] = useState(1);
  const [decisionNote, setDecisionNote] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!notification) return undefined;

    // Dismiss the decision confirmation after a short pause.
    const timeoutId = window.setTimeout(() => setNotification(null), 1000);
    return () => window.clearTimeout(timeoutId);
  }, [notification]);

  const selectedReport = reports.find(
    (report) => report.id === selectedReportId,
  );
  // Keep the selected item in view while the report list is being updated.
  const visibleReports = reports.filter(
    (report) =>
      report.status === activeTab ||
      (report.id === selectedReportId && report.status !== activeTab),
  );

  function selectTab(tab) {
    setActiveTab(tab);
    // A note belongs to one report, so don't carry it into another status view.
    setDecisionNote("");
    const firstReport = reports.find((report) => report.status === tab);
    setSelectedReportId(firstReport?.id ?? null);
  }

  function decideReport(status) {
    if (
      !selectedReport ||
      selectedReport.status !== "Open" ||
      !decisionNote.trim()
    ) {
      return;
    }

    // A decision is saved only with a note, and only while the report is open.
    setReports((currentReports) =>
      currentReports.map((report) =>
        report.id === selectedReport.id ? { ...report, status } : report,
      ),
    );
    setNotification({
      title: status === "Dismissed" ? "Report dismissed" : "Report resolved",
      message: "The decision note and status were recorded.",
    });
  }

  return (
    <main className="reports-page">
      <header className="reports-heading">
        <h1>Reports &amp; moderation</h1>
        <p>
          Privately review submitted reports. A report never removes content
          automatically.
        </p>
      </header>

      <div className="reports-tabs" role="tablist" aria-label="Report status">
        {/* Show each status and keep the open queue count visible. */}
        {reportTabs.map((tab) => {
          const count = reports.filter(
            (report) => report.status === tab,
          ).length;

          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              className={
                activeTab === tab ? "reports-tab reports-tab-active" : "reports-tab"
              }
              onClick={() => selectTab(tab)}
            >
              {tab}
              {tab === "Open" && <span className="reports-tab-count">{count}</span>}
            </button>
          );
        })}
      </div>

      <div className="reports-layout">
        {/* Selecting a row loads its details in the review panel. */}
        <section className="reports-list" aria-label={`${activeTab} reports`}>
          {visibleReports.map((report) => (
            <button
              key={report.id}
              type="button"
              className={`report-list-item ${
                report.id === selectedReportId
                  ? "report-list-item-selected"
                  : ""
              }`}
              onClick={() => {
                setSelectedReportId(report.id);
                setDecisionNote("");
              }}
            >
              <span
                className={`report-status report-status-${report.status.toLowerCase()}`}
              >
                {report.status}
              </span>
              <strong>
                {report.reporter} · {report.target}
              </strong>
              <span>{report.reason}</span>
              <small>{report.timeAgo} · Reporter identity private</small>
            </button>
          ))}
          {visibleReports.length === 0 && (
            <p className="reports-empty">No {activeTab.toLowerCase()} reports.</p>
          )}
        </section>

        {/* Only open reports offer actions that can change their status. */}
        <section className="report-review" aria-label="Report review">
          {selectedReport ? (
            <>
              <div className="report-review-heading">
                <div>
                  <span className="report-review-label">Report review</span>
                  <h2>{selectedReport.reporter}</h2>
                </div>
                <span
                  className={`report-status report-status-${selectedReport.status.toLowerCase()}`}
                >
                  {selectedReport.status}
                </span>
              </div>

              <dl className="report-details">
                <div>
                  <dt>Target</dt>
                  <dd>{selectedReport.target}</dd>
                </div>
                <div>
                  <dt>Reason</dt>
                  <dd>{selectedReport.reason}</dd>
                </div>
                <div>
                  <dt>Submitted</dt>
                  <dd>{selectedReport.submitted}</dd>
                </div>
              </dl>

              <div className="reported-content">
                <span>Reported details</span>
                <p>“{selectedReport.details}”</p>
              </div>

              {activeTab === "Open" ? (
                <>
                  <label htmlFor="report-decision-note">Decision note *</label>
                  <textarea
                    id="report-decision-note"
                    value={decisionNote}
                    onChange={(event) => setDecisionNote(event.target.value)}
                    placeholder="Required before resolving or dismissing"
                  />
                  <p className="report-privacy-note">
                    The reporter’s identity is not displayed publicly. Review
                    does not automatically delete the target.
                  </p>
                  <div className="report-actions">
                    <button
                      type="button"
                      className="report-dismiss-button"
                      disabled={
                        !decisionNote.trim() || selectedReport.status !== "Open"
                      }
                      onClick={() => decideReport("Dismissed")}
                    >
                      Dismiss report
                    </button>
                    <button
                      type="button"
                      className="report-resolve-button"
                      disabled={
                        !decisionNote.trim() || selectedReport.status !== "Open"
                      }
                      onClick={() => decideReport("Resolved")}
                    >
                      Resolve report
                    </button>
                  </div>
                </>
              ) : (
                <p className="report-privacy-note">
                  This report has been {activeTab.toLowerCase()}.
                </p>
              )}
            </>
          ) : (
            <div className="report-review-empty">
              <strong>Select a report to review</strong>
              <p>Choose a report from the list to view its details.</p>
            </div>
          )}
        </section>
      </div>
      {/* The decision result is announced separately from report details. */}
      {notification && (
        <div className="reports-toast" role="status" aria-live="polite">
          <span className="reports-toast-check" aria-hidden="true">
            ✓
          </span>
          <div className="reports-toast-message">
            <strong>{notification.title}</strong>
            <p>{notification.message}</p>
          </div>
          <button
            type="button"
            className="reports-toast-close"
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
