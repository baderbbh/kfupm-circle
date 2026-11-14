import { useState } from "react";
import Icon from "../components/StudentIcon";
import TagField from "../components/TagField";
import {
  availableCourses,
  majors,
  suggestedInterests,
} from "../data/profileOptions";

export default function StudentMyProfile({ profile, onSave }) {
  const [name, setName] = useState(profile.fullName);
  const [major, setMajor] = useState(profile.major || "");
  const [biography, setBiography] = useState(profile.biography || "");
  const [courses, setCourses] = useState(profile.courses || []);
  const [interests, setInterests] = useState(profile.interests || []);
  const [hobbies, setHobbies] = useState(profile.hobbies || "");
  const [activities, setActivities] = useState(profile.activities || "");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  // Majors list plus the student's current major if it is not listed.
  const majorOptions = majors.includes(major) || !major ? majors : [major, ...majors];

  function handleSave(event) {
    event.preventDefault();
    setSaved(false);

    if (!name.trim() || !major || courses.length === 0 || interests.length === 0) {
      setError("Enter your name, select a major, and add a course and an interest.");
      return;
    }

    setError("");
    setSaved(true);
    onSave({
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
    <section>
      <header className="student-heading">
        <div>
          <h1>My profile</h1>
          <p>Keep your academic and social preferences up to date.</p>
        </div>
      </header>

      {saved && (
        <div className="student-notice" role="status">
          <Icon name="check" />
          <div>
            <strong>Profile saved</strong>
            <small>Your changes are now visible to other students.</small>
          </div>
        </div>
      )}

      <form
        className="profile-form"
        onSubmit={handleSave}
        onChange={() => setSaved(false)}
        noValidate
      >
        <section className="profile-section">
          <div className="profile-section-description">
            <h2>Basic information</h2>
            <p>Your major helps us find academically relevant matches.</p>
          </div>

          <div className="profile-fields">
            <div className="profile-field-pair">
              <div className="profile-field">
                <label htmlFor="my-name">Full name *</label>
                <input
                  id="my-name"
                  value={name}
                  autoComplete="name"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

              <div className="profile-field">
                <label htmlFor="my-major">Major *</label>
                <select
                  id="my-major"
                  value={major}
                  onChange={(event) => setMajor(event.target.value)}
                >
                  <option value="">Select your major</option>
                  {majorOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="profile-field">
              <div className="biography-label">
                <label htmlFor="my-biography">Short biography</label>
                <span>{biography.length} / 500</span>
              </div>
              <textarea
                id="my-biography"
                value={biography}
                maxLength={500}
                rows={4}
                placeholder="Tell others a little about yourself"
                onChange={(event) => setBiography(event.target.value)}
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
            id="my-courses"
            label="Current courses *"
            values={courses}
            options={availableCourses}
            onChange={(values) => {
              setCourses(values);
              setSaved(false);
            }}
            placeholder="Search courses…"
          />
        </section>

        <section className="profile-section">
          <div className="profile-section-description">
            <h2>Interests &amp; activities</h2>
            <p>Choose what you would like to share with potential connections.</p>
          </div>

          <div className="profile-fields">
            <TagField
              id="my-interests"
              label="Interests *"
              values={interests}
              options={suggestedInterests}
              onChange={(values) => {
                setInterests(values);
                setSaved(false);
              }}
              placeholder="Add an interest…"
            />

            <div className="profile-field-pair">
              <div className="profile-field">
                <label htmlFor="my-hobbies">Hobbies</label>
                <input
                  id="my-hobbies"
                  value={hobbies}
                  placeholder="Football, board games, hiking"
                  onChange={(event) => setHobbies(event.target.value)}
                />
              </div>

              <div className="profile-field">
                <label htmlFor="my-activities">Preferred activities</label>
                <input
                  id="my-activities"
                  value={activities}
                  placeholder="Workshops, study sessions, hackathons"
                  onChange={(event) => setActivities(event.target.value)}
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

        <footer className="profile-form-footer">
          <p>Required: name, major, one course, and one interest.</p>
          <button type="submit">Save changes</button>
        </footer>
      </form>
    </section>
  );
}
