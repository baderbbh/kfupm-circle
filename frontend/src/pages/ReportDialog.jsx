import { useState } from "react";
import { reportReasons } from "../data/studentData";

// Private report form used for student profiles and clubs.
export default function ReportDialog({ subject, onCancel, onSubmit }) {
  const [reason, setReason] = useState(reportReasons[0]);
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!details.trim()) {
      setError("Add details so an administrator can review the report.");
      return;
    }

    onSubmit({ subject, reason, details: details.trim() });
  }

  return (
    <div className="student-dialog-backdrop" onClick={onCancel}>
      <div
        className="student-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="student-dialog-top">
          <div>
            <span>Private report</span>
            <h2 id="report-title">Report content</h2>
            <p>{subject} will not see your identity.</p>
          </div>
          <button
            type="button"
            className="student-dialog-close"
            aria-label="Close report"
            onClick={onCancel}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="profile-field">
            <label htmlFor="report-reason">Reason</label>
            <select
              id="report-reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            >
              {reportReasons.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="profile-field">
            <label htmlFor="report-details">Details</label>
            <textarea
              id="report-details"
              value={details}
              maxLength={500}
              rows={4}
              placeholder="Describe what should be reviewed"
              onChange={(event) => {
                setDetails(event.target.value);
                setError("");
              }}
            />
          </div>

          {error && (
            <p className="student-form-error" role="alert">
              {error}
            </p>
          )}

          <div className="student-dialog-actions">
            <button type="button" className="student-button-outline" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="student-button">
              Submit report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
