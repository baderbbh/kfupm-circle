import { useState } from "react";
import TagField from "../components/TagField";
import {
  availableCourses,
  majors,
  suggestedInterests,
} from "../data/profileOptions";
import "./ProfileSetup.css";

export default function ProfileSetup({ fullName = "", onComplete }) {
  const [name, setName] = useState(fullName);
  const [major, setMajor] = useState("");
  const [biography, setBiography] = useState("");
  const [courses, setCourses] = useState([]);
  const [interests, setInterests] = useState([]);
  const [hobbies, setHobbies] = useState("");
  const [activities, setActivities] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  function handleSave(event) {
    event.preventDefault();
    setError("");
    setSaved(false);

    if (!name.trim() || !major || courses.length === 0 || interests.length === 0) {
      setError("Enter your name, select a major, and add a course and an interest.");
      return;
    }

    setSaved(true);
    
    onComplete({
        fullName: name.trim(),
        major,
        biography: biography.trim(),
        courses,
        interests,
        hobbies: hobbies.trim(),
        activities: activities.trim(),
        });
  }

  return (
    <main className="profile-page">
      <aside className="profile-sidebar">
        <div className="profile-brand">
          <span className="profile-logo">K</span>
          <div>
            <strong>KFUPM Circle</strong>
            <p>Campus connections</p>
          </div>
        </div>

        <nav className="profile-navigation" aria-label="Student navigation">
          <button type="button" disabled>Home</button>
          <button type="button" disabled>Discover</button>
          <button type="button" disabled>Connections</button>
          <button type="button" disabled>Messages</button>
          <button type="button" disabled>Clubs &amp; Communities</button>
          <button type="button" disabled>Activities</button>
          <button type="button" disabled>Invitations</button>
          <button type="button" disabled>My Profile</button>
        </nav>

        <div className="profile-user">
          <span className="profile-avatar">{initials || "K"}</span>
          <div>
            <strong>{name.trim() || "New student"}</strong>
            <p>{major || "Choose your major"}</p>
          </div>
        </div>
      </aside>

      <div className="profile-main">
        <header className="profile-header">
          <div>
            <span>Student portal</span>
            <span> / </span>
            <strong>Profile Setup</strong>
          </div>
          <span className="verified-badge">● Verified account</span>
        </header>

        <div className="profile-content">
          <p className="profile-step">STEP 2 OF 2</p>
          <h1>Complete your profile</h1>
          <p className="profile-description">
            Tell other students what you study and enjoy. Required fields are
            marked *.
          </p>

          <form
            className="profile-form"
            onSubmit={handleSave}
            onChange={() => setSaved(false)}
          >
            <section className="profile-section">
              <div className="profile-section-description">
                <h2>Basic information</h2>
                <p>Your major helps us find academically relevant matches.</p>
              </div>

              <div className="profile-fields">
                <div className="profile-field-pair">
                  <div className="profile-field">
                    <label htmlFor="profileName">Full name *</label>
                    <input
                      id="profileName"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="profile-field">
                    <label htmlFor="major">Major *</label>
                    <select
                      id="major"
                      value={major}
                      onChange={(event) => setMajor(event.target.value)}
                      required
                    >
                      <option value="">Select your major</option>
                      {majors.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="profile-field">
                  <div className="biography-label">
                    <label htmlFor="biography">Short biography</label>
                    <span>{biography.length} / 500</span>
                  </div>
                  <textarea
                    id="biography"
                    value={biography}
                    onChange={(event) => setBiography(event.target.value)}
                    maxLength={500}
                    rows={4}
                    placeholder="Tell others a little about yourself"
                  />
                </div>
              </div>
            </section>

            <section className="profile-section">
              <div className="profile-section-description">
                <h2>Academic profile</h2>
                <p>Select at least one current course.</p>
              </div>

              <TagField
                id="courses"
                label="Current courses *"
                values={courses}
                options={availableCourses}
                onChange={(values) => {
                  setCourses(values);
                  setSaved(false);
                }}
                placeholder="Search courses..."
              />
            </section>

            <section className="profile-section">
              <div className="profile-section-description">
                <h2>Interests &amp; activities</h2>
                <p>
                  Choose what you would like to share with potential connections.
                </p>
              </div>

              <div className="profile-fields">
                <TagField
                  id="interests"
                  label="Interests *"
                  values={interests}
                  options={suggestedInterests}
                  onChange={(values) => {
                    setInterests(values);
                    setSaved(false);
                  }}
                  placeholder="Add an interest..."
                />

                <div className="profile-field-pair">
                  <div className="profile-field">
                    <label htmlFor="hobbies">Hobbies</label>
                    <input
                      id="hobbies"
                      value={hobbies}
                      onChange={(event) => setHobbies(event.target.value)}
                      placeholder="Football, board games, hiking"
                    />
                  </div>

                  <div className="profile-field">
                    <label htmlFor="activities">Preferred activities</label>
                    <input
                      id="activities"
                      value={activities}
                      onChange={(event) => setActivities(event.target.value)}
                      placeholder="Workshops, study sessions, hackathons"
                    />
                  </div>
                </div>
              </div>
            </section>

            {error && (
              <p className="profile-error" role="alert">
                {error}
              </p>
            )}

            {saved && (
              <p className="profile-success" role="status">
                Your profile details are valid.
              </p>
            )}

            <footer className="profile-form-footer">
              <p>Required: name, major, one course, and one interest.</p>
              <button type="submit">Save and continue</button>
            </footer>
          </form>
        </div>
      </div>
    </main>
  );
}