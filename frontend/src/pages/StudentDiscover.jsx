import { useState } from "react";
import Icon from "../components/StudentIcon";
import {
  countShared,
  getSharedAttributes,
  students,
} from "../data/studentData";
import "./StudentDiscover.css";

const emptyFilters = { major: "", course: "", club: "", interest: "" };
const startingFilters = { ...emptyFilters, course: "SWE 363", interest: "Game development" };

// Builds a sorted list of every value used by the sample students.
function collect(key) {
  const values = students.flatMap((student) =>
    Array.isArray(student[key]) ? student[key] : [student[key]]
  );
  return [...new Set(values)].sort();
}

const filterFields = [
  { key: "major", label: "Major", any: "Any major", options: collect("major") },
  { key: "course", label: "Course", any: "Any course", options: collect("courses") },
  { key: "club", label: "Club", any: "Any club", options: collect("clubs") },
  { key: "interest", label: "Interest", any: "Any interest", options: collect("interests") },
];

function matches(student, search, filters) {
  const text = search.trim().toLowerCase();
  const searchable = [
    student.name,
    ...student.courses,
    ...student.clubs,
    ...student.interests,
  ].map((value) => value.toLowerCase());

  // Every selected filter must match (AND matching).
  return (
    (!text || searchable.some((value) => value.includes(text))) &&
    (!filters.major || student.major === filters.major) &&
    (!filters.course || student.courses.includes(filters.course)) &&
    (!filters.club || student.clubs.includes(filters.club)) &&
    (!filters.interest || student.interests.includes(filters.interest))
  );
}

export default function StudentDiscover({ profile, joinedClubs, onOpenProfile }) {
  // Draft values change while typing; results update only after Apply.
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(startingFilters);
  const [applied, setApplied] = useState({ search: "", filters: startingFilters });

  const results = students.filter((student) =>
    matches(student, applied.search, applied.filters)
  );

  const selected = Object.values(applied.filters).filter(Boolean);
  if (applied.search.trim()) {
    selected.unshift(`“${applied.search.trim()}”`);
  }

  function handleApply(event) {
    event.preventDefault();
    setApplied({ search, filters });
  }

  function clearFilters() {
    setSearch("");
    setFilters(emptyFilters);
    setApplied({ search: "", filters: emptyFilters });
  }

  return (
    <section>
      <header className="student-heading">
        <div>
          <h1>Discover students</h1>
          <p>Find people through the courses, communities, and interests you share.</p>
        </div>
      </header>

      <form className="discover-filters" onSubmit={handleApply}>
        <label className="student-search">
          <Icon name="search" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, course, club, or interest"
            aria-label="Search by name, course, club, or interest"
          />
        </label>

        <div className="discover-filter-grid">
          {filterFields.map((field) => (
            <label key={field.key} className="discover-filter">
              <span>{field.label}</span>
              <select
                value={filters[field.key]}
                onChange={(event) =>
                  setFilters({ ...filters, [field.key]: event.target.value })
                }
              >
                <option value="">{field.any}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <div className="discover-filter-footer">
          <p>
            <strong>AND matching</strong> · Results must match every selected filter
          </p>
          <div>
            <button type="button" className="student-button-quiet" onClick={clearFilters}>
              Clear filters
            </button>
            <button type="submit" className="student-button">
              Apply filters
            </button>
          </div>
        </div>
      </form>

      {results.length === 0 ? (
        <div className="student-empty student-empty-dashed discover-empty">
          <span className="student-empty-icon">
            <Icon name="search" />
          </span>
          <h3>No students match these filters</h3>
          <p>
            Your selected filters are still applied. Try removing one filter or
            searching for a broader interest.
          </p>
          <button type="button" className="student-button-outline" onClick={clearFilters}>
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <p className="discover-count">
            <strong>
              {results.length} {results.length === 1 ? "student" : "students"}
            </strong>
            <span>
              {selected.length > 0
                ? `matching ${selected.join(" + ")}`
                : "showing everyone in your campus circle"}
            </span>
          </p>

          <ul className="discover-results">
            {results.map((student) => {
              const shared = getSharedAttributes(profile, student, joinedClubs);
              const sharedCount = countShared(shared);
              // Show shared items first, then the student's other interests.
              const highlights = [
                ...new Set([
                  ...shared.courses,
                  ...shared.interests,
                  ...shared.clubs,
                  ...student.interests,
                ]),
              ].slice(0, 3);

              return (
                <li key={student.id} className="discover-result">
                  <span className="student-avatar student-avatar-large">
                    {student.initials}
                  </span>
                  <div className="discover-result-text">
                    <h2>{student.name}</h2>
                    <p>{student.major}</p>
                    <p className="discover-shared">
                      <Icon name="check" size={13} />
                      <strong>
                        {sharedCount} shared {sharedCount === 1 ? "attribute" : "attributes"}
                      </strong>
                      <span>{highlights.join(" · ")}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="student-button-outline"
                    onClick={() => onOpenProfile(student.id)}
                  >
                    View profile
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}
