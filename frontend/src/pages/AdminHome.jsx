import { useCallback, useEffect, useRef, useState } from "react";
import "./ProfileSetup.css";
import "./Home.css";
import "./AdminHome.css";
import AdminApprovals from "./AdminApprovals";
import AdminCategories from "./AdminCategories";
import AdminActivities from "./AdminActivities";
import AdminReports from "./AdminReports";

const students = [
  {
    id: 1,
    initials: "AA",
    name: "Ahmed Al-Dossary",
    email: "ahmed@kfupm.edu.sa",
    major: "Software Engineering",
    verified: true,
    status: "Active",
    lastActive: "Today",
  },
  {
    id: 2,
    initials: "NA",
    name: "Noor Al-Salem",
    email: "admin@kfupm.edu.sa",
    major: "Information Systems",
    verified: true,
    status: "Administrator",
    lastActive: "Now",
    isCurrentUser: true,
  },
  {
    id: 3,
    initials: "OH",
    name: "Omar Al-Harbi",
    email: "omar@kfupm.edu.sa",
    major: "Computer Science",
    verified: false,
    status: "Active",
    lastActive: "14 May",
  },
  {
    id: 4,
    initials: "LN",
    name: "Lina Nasser",
    email: "lina@kfupm.edu.sa",
    major: "Information Systems",
    verified: true,
    status: "Active",
    lastActive: "Yesterday",
  },
];

const navigation = [
  { label: "Student Accounts", icon: "people" },
  { label: "Club Approvals", icon: "club" },
  { label: "Categories", icon: "dots" },
  { label: "Activities", icon: "calendar" },
  { label: "Reports", icon: "flag", count: 1 },
];

function Icon({ name }) {
  const paths = {
    people:
      "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    club: "M3 10 12 3l9 7v11h-6v-7H9v7H3Z",
    dots: "M5 12h.01M12 12h.01M19 12h.01",
    calendar: "M5 3v4M19 3v4M3 10h18M3 5h18v16H3Z",
    flag: "M5 21V3h14l-3 5 3 5H5",
    bell:
      "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
    search:
      "M21 21l-5-5M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14",
    edit: "m16 3 5 5-12 12-6 1 1-6ZM14 5l5 5",
    delete: "M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7",
    logout: "M9 4H4v16h5M14 8l4 4-4 4M8 12h10",
  };

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}

export default function AdminHome({ onSignOut }) {
  const [accounts, setAccounts] = useState(students);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [activeSection, setActiveSection] = useState("accounts");
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [notification, setNotification] = useState(null);
  const deleteTriggerRef = useRef(null);

  const searchText = search.trim().toLowerCase();

  const filteredStudents = accounts.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText);

    const matchesStatus =
      status === "all" || student.status === status;

    return matchesSearch && matchesStatus;
  });

  const closeDeleteDialog = useCallback(() => {
    setStudentToDelete(null);
    deleteTriggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!notification) return undefined;

    const timeoutId = window.setTimeout(() => setNotification(null), 1000);
    return () => window.clearTimeout(timeoutId);
  }, [notification]);

  function confirmDeletion() {
    if (!studentToDelete) return;

    setAccounts((currentAccounts) =>
      currentAccounts.filter((student) => student.id !== studentToDelete.id),
    );
    setNotification({
      title: "Account removed",
      message: `${studentToDelete.name} no longer appears in active accounts.`,
    });
    setStudentToDelete(null);
  }

  function showCorrectionSaved() {
    setNotification({
      title: "Correction saved",
      message: "A reason was recorded in the administrative audit log.",
    });
  }

  function openApprovals() {
    setActiveSection("approvals");
    setStudentToDelete(null);
    setNotification(null);
  }

  function openCategories() {
    setActiveSection("categories");
    setStudentToDelete(null);
    setNotification(null);
  }

  function openActivities() {
    setActiveSection("activities");
    setStudentToDelete(null);
    setNotification(null);
  }

  useEffect(() => {
    if (!studentToDelete) return undefined;

    function handleEscape(event) {
      if (event.key === "Escape") closeDeleteDialog();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [studentToDelete, closeDeleteDialog]);

  return (
    <div className="home-wrapper">
      <main className="profile-page home-page admin-page">
        <aside className="profile-sidebar">
          <div className="profile-brand">
            <span className="profile-logo">K</span>
            <div>
              <strong>KFUPM Circle</strong>
              <p>Campus connections</p>
            </div>
          </div>

          <div className="admin-workspace">
            <span>ADMINISTRATION</span>
            <strong>Platform workspace</strong>
          </div>

          <nav
            className="profile-navigation admin-navigation"
            aria-label="Administrator navigation"
          >
            {navigation.map((item, index) => (
              <button
                key={item.label}
                type="button"
                className={
                  (index === 0 && activeSection === "accounts") ||
                  (index === 1 && activeSection === "approvals") ||
                  (index === 2 && activeSection === "categories") ||
                  (index === 3 && activeSection === "activities") ||
                  (index === 4 && activeSection === "reports")
                    ? "home-nav-active"
                    : ""
                }
                aria-current={
                  (index === 0 && activeSection === "accounts") ||
                  (index === 1 && activeSection === "approvals") ||
                  (index === 2 && activeSection === "categories") ||
                  (index === 3 && activeSection === "activities") ||
                  (index === 4 && activeSection === "reports")
                    ? "page"
                    : undefined
                }
                disabled={index > 4}
                onClick={
                  index === 0
                    ? () => setActiveSection("accounts")
                    : index === 1
                      ? openApprovals
                      : index === 2
                        ? openCategories
                        : index === 3
                          ? openActivities
                          : index === 4
                            ? () => setActiveSection("reports")
                            : undefined
                }
              >
                <Icon name={item.icon} />
                {item.label}
                {item.count && (
                  <span className="admin-report-count">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="profile-user">
            <span className="profile-avatar">NA</span>
            <div>
              <strong>Noor Al-Salem</strong>
              <p>Administrator</p>
            </div>
            <button
              type="button"
              className="home-logout"
              aria-label="Sign out"
              onClick={onSignOut}
            >
              <Icon name="logout" />
            </button>
          </div>
        </aside>

        <div className="profile-main">
          <header className="profile-header">
            <div>
              <span>Administration</span>
              {" / "}
              <strong>
                {activeSection === "accounts"
                  ? "Student Accounts"
                  : activeSection === "approvals"
                    ? "Club Proposals and Corrections"
                    : activeSection === "categories"
                      ? "Category Management"
                      : activeSection === "activities"
                        ? "Platform Activities"
                        : "Reports and Moderation"}
              </strong>
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
              <span className="verified-badge">
                ● Verified account
              </span>
            </div>
          </header>

          {activeSection === "accounts" ? (
            <div className="home-content">
              <div className="home-welcome">
                <div>
                  <h1>Student accounts</h1>
                  <p className="home-description">
                    View and correct permitted account information.
                    Private credentials and conversations are never shown.
                  </p>
                </div>
              </div>

            <div className="admin-filters">
              <div className="admin-search">
                <Icon name="search" />
                <input
                  type="search"
                  aria-label="Search by student name or university email"
                  placeholder="Search by student name or university email"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              <select
                aria-label="Filter by account status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="all">All statuses</option>
                <option value="Active">Active</option>
                <option value="Administrator">Administrator</option>
              </select>
            </div>

            <div
              className="admin-table-wrapper"
              role="region"
              aria-label="Student accounts table"
              tabIndex={0}
            >
              <table className="admin-table">
                <thead>
                  <tr>
                    <th scope="col">Student</th>
                    <th scope="col">Major</th>
                    <th scope="col">Verification</th>
                    <th scope="col">Account status</th>
                    <th scope="col">Last active</th>
                    <th scope="col">
                      <span className="admin-sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <div className="admin-student">
                          <span className="profile-avatar">
                            {student.initials}
                          </span>
                          <div>
                            <strong>{student.name}</strong>
                            <span className="admin-student-email">
                              {student.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>{student.major}</td>

                      <td>
                        <span
                          className={
                            student.verified
                              ? "admin-badge"
                              : "admin-badge admin-unverified"
                          }
                        >
                          {student.verified ? "Verified" : "Unverified"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={
                            student.isCurrentUser
                              ? "admin-badge admin-current-user"
                              : "admin-badge"
                          }
                        >
                          {student.isCurrentUser
                            ? "Administrator · You"
                            : student.status}
                        </span>
                      </td>

                      <td>{student.lastActive}</td>

                      <td>
                        {student.isCurrentUser ? (
                          <span className="admin-self-note">
                            Self-deletion blocked
                          </span>
                        ) : (
                          <div className="admin-row-actions">
                            <button
                              type="button"
                              className="home-icon-button"
                              aria-label={`Edit ${student.name}`}
                              onClick={showCorrectionSaved}
                            >
                              <Icon name="edit" />
                            </button>
                            <button
                              type="button"
                              className="home-icon-button"
                              aria-label={`Delete ${student.name}`}
                              onClick={(event) => {
                                deleteTriggerRef.current = event.currentTarget;
                                setNotification(null);
                                setStudentToDelete(student);
                              }}
                            >
                              <Icon name="delete" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}

                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={6} className="admin-empty">
                        No accounts match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            </div>
          ) : activeSection === "approvals" ? (
            <AdminApprovals />
          ) : activeSection === "categories" ? (
            <AdminCategories />
          ) : activeSection === "activities" ? (
            <AdminActivities />
          ) : (
            <AdminReports />
          )}
        </div>
      </main>
      {studentToDelete && (
        <div
          className="admin-dialog-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDeleteDialog();
          }}
        >
          <section
            className="admin-delete-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-delete-title"
            aria-describedby="admin-delete-description"
          >
            <span className="admin-delete-icon">
              <Icon name="delete" />
            </span>
            <h2 id="admin-delete-title">
              Delete {studentToDelete.name}&rsquo;s account?
            </h2>
            <p id="admin-delete-description">
              This removes the account from active listings. This action does
              not expose or retain private conversations in this view.
            </p>
            <label htmlFor="admin-delete-reason">Reason for deletion</label>
            <input
              autoFocus
              id="admin-delete-reason"
              type="text"
              defaultValue="Duplicate account confirmed by student services"
            />
            <div className="admin-delete-actions">
              <button
                type="button"
                className="admin-delete-cancel"
                onClick={closeDeleteDialog}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-delete-confirm"
                onClick={confirmDeletion}
              >
                Confirm deletion
              </button>
            </div>
          </section>
        </div>
      )}
      {notification && (
        <div className="admin-delete-toast" role="status" aria-live="polite">
          <span className="admin-delete-toast-check" aria-hidden="true">
            ✓
          </span>
          <div className="admin-delete-toast-message">
            <strong>{notification.title}</strong>
            <p>{notification.message}</p>
          </div>
          <button
            type="button"
            className="admin-delete-toast-close"
            aria-label="Dismiss notification"
            onClick={() => setNotification(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}