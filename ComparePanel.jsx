import { computeStats } from '../utils/algorithms';

// Shows a side-by-side comparison of FIFO vs LRU vs Optimal fault counts
export default function ComparePanel({ fifoSteps, lruSteps, optimalSteps }) {
  if (!fifoSteps) return null;

  const fifo = computeStats(fifoSteps);
  const lru = computeStats(lruSteps);
  const optimal = computeStats(optimalSteps);

  const algos = [
    { name: 'FIFO', stats: fifo, color: 'var(--accent-blue)' },
    { name: 'LRU', stats: lru, color: 'var(--accent-purple)' },
    { name: 'Optimal', stats: optimal, color: 'var(--accent-green)' },
  ];

  const maxFaults = Math.max(fifo.faults, lru.faults, optimal.faults, 1);

  return (
    <div className="compare-panel">
      <h3 className="table-title">Algorithm Comparison</h3>
      <div className="compare-bars">
        {algos.map(({ name, stats, color }) => (
          <div key={name} className="compare-algo">
            <div className="compare-algo-name">{name}</div>
            <div className="compare-bar-track">
              <div
                className="compare-bar-fill"
                style={{
                  width: `${(stats.faults / maxFaults) * 100}%`,
                  background: color,
                }}
              />
            </div>
            <div className="compare-algo-stats">
              <span>{stats.faults} faults</span>
              <span>{stats.hitRatio}% hit</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
