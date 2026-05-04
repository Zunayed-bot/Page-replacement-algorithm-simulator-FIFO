export default function StatsDisplay({ stats, currentStep, totalSteps }) {
  if (!stats) return null;

  return (
    <div className="stats-display">
      <div className="stat-card fault">
        <span className="stat-value">{stats.faults}</span>
        <span className="stat-label">Page Faults</span>
        <span className="stat-sub">{stats.faultRatio}%</span>
      </div>
      <div className="stat-card hit">
        <span className="stat-value">{stats.hits}</span>
        <span className="stat-label">Page Hits</span>
        <span className="stat-sub">{stats.hitRatio}%</span>
      </div>
      <div className="stat-card total">
        <span className="stat-value">{stats.total}</span>
        <span className="stat-label">Total References</span>
        <span className="stat-sub">Step {currentStep} / {totalSteps}</span>
      </div>
    </div>
  );
}
