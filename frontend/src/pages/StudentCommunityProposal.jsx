import { useState } from "react";
import Icon from "../components/StudentIcon";
import TagField from "../components/TagField";
import { suggestedInterests } from "../data/profileOptions";
import { clubs } from "../data/studentData";
import "./StudentClubs.css";

const interestOptions = [
  ...new Set([...suggestedInterests, ...clubs.flatMap((club) => club.interests)]),
];

export default function StudentCommunityProposal({ proposal, onSubmit, onBack }) {
  const [name, setName] = useState(proposal ? proposal.name : "");
  const [email, setEmail] = useState(proposal ? proposal.email : "");
  const [description, setDescription] = useState(proposal ? proposal.description : "");
  const [interests, setInterests] = useState(proposal ? proposal.interests : []);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail || !description.trim() || interests.length === 0) {
      setError("Enter the community name, contact email, description, and at least one interest.");
      return;
    }

    if (!/^[^\s@]+@([a-z0-9-]+\.)*kfupm\.edu\.sa$/.test(trimmedEmail)) {
      setError("Use a KFUPM contact email, for example name@clubs.kfupm.edu.sa.");
      return;
    }

    // Community names must be unique across the approved directory.
    const nameTaken = clubs.some(
      (club) => club.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (nameTaken) {
      setError("A community with this name already exists.");
      return;
    }

    setError("");
    onSubmit({
      name: trimmedName,
      email: trimmedEmail,
      description: description.trim(),
      interests,
      submitted: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    });
  }

  return (
    <section>
      <button type="button" className="student-back" onClick={onBack}>
        ← Back to communities
      </button>

      <header className="student-heading">
        <div>
          <h1>Submit a community proposal</h1>
          <p>Propose a new student community for administrator review.</p>
        </div>
      </header>

      {proposal && (
        <div className="proposal-pending" role="status">
          <span className="student-badge student-badge-amber">Pending Approval</span>
          <strong>{proposal.name}</strong>
          <small>
            Submitted {proposal.submitted} · Administrators will review the name,
            purpose, and contact details.
          </small>
        </div>
      )}

      <form className="profile-form proposal-form" onSubmit={handleSubmit} noValidate>
        <fieldset disabled={Boolean(proposal)}>
          <div className="profile-field-pair">
            <div className="profile-field">
              <label htmlFor="proposal-name">Community name *</label>
              <input
                id="proposal-name"
                value={name}
                placeholder="AI & Robotics Community"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="profile-field">
              <label htmlFor="proposal-email">Contact email *</label>
              <input
                id="proposal-email"
                type="email"
                value={email}
                placeholder="name@clubs.kfupm.edu.sa"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="profile-field">
            <label htmlFor="proposal-description">Description *</label>
            <textarea
              id="proposal-description"
              value={description}
              maxLength={500}
              rows={3}
              placeholder="What will members do together?"
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <TagField
            id="proposal-interests"
            label="Interests *"
            values={interests}
            options={interestOptions}
            onChange={setInterests}
            placeholder="Add interest…"
          />

          <div className="student-info">
            <Icon name="check" />
            <div>
              <strong>What happens next?</strong>
              <small>
                Pending proposals stay out of the approved directory. If approved,
                the community is published and you become its manager.
              </small>
            </div>
          </div>
        </fieldset>

        {error && (
          <p className="profile-error" role="alert">
            {error}
          </p>
        )}

        <footer className="profile-form-footer">
          <p>All fields are required. Names must be unique.</p>
          <button type="submit" disabled={Boolean(proposal)}>
            {proposal ? "Awaiting review" : "Submit for approval"}
          </button>
        </footer>
      </form>
    </section>
  );
}
