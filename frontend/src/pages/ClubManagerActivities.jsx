import "./ClubManagerActivities.css";

export default function ClubManagerActivities() {
  return (
    <section className="manager-activities">
      <header className="manager-activities-heading">
        <div>
          <h1>Manage club activities</h1>
          <p>
            Create and maintain upcoming Game Development Club activities.
          </p>
        </div>
        <button type="button" className="manager-activities-create">
          <span aria-hidden="true">+</span>
          Create activity
        </button>
      </header>

      <section
        className="manager-activities-list"
        aria-labelledby="manager-activities-list-heading"
      >
        <h2 id="manager-activities-list-heading">Club activities</h2>
      </section>
    </section>
  );
}
