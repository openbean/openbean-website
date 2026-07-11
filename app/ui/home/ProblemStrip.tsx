// The problem, in twelve words. No diagram — the sentences carry it.

export function ProblemStrip() {
  return (
    <section className="ob-problem" aria-labelledby="problem-heading">
      <div className="ob-wrap">
        <p className="ob-problem-lines" id="problem-heading">
          <span>Employees leave.</span>
          <span>Meetings end.</span>
          <span>Decisions disappear.</span>
        </p>
        <p className="ob-problem-answer">
          OpenBean keeps the knowledge your business depends on.
        </p>
      </div>
    </section>
  );
}
