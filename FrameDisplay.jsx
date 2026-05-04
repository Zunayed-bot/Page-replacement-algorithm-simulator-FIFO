// Renders the animated memory frame boxes for the current simulation step
export default function FrameDisplay({ step, frameCount, prevStep }) {
  if (!step) {
    // Empty state — show blank frames
    return (
      <div className="frame-display">
        <div className="frames-row">
          {Array.from({ length: frameCount }).map((_, i) => (
            <div key={i} className="frame-box empty">
              <span className="frame-label">F{i + 1}</span>
              <span className="frame-value">—</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const { frames, isHit, evicted, page } = step;

  return (
    <div className="frame-display">
      <div className="current-page-banner">
        <span className="page-label">Accessing Page</span>
        <span className={`page-badge ${isHit ? 'hit' : 'fault'}`}>{page}</span>
        <span className={`status-tag ${isHit ? 'hit' : 'fault'}`}>
          {isHit ? 'HIT' : 'PAGE FAULT'}
        </span>
      </div>

      <div className="frames-row">
        {Array.from({ length: frameCount }).map((_, i) => {
          const val = frames[i] !== undefined ? frames[i] : null;
          const prevVal = prevStep?.frames[i] !== undefined ? prevStep.frames[i] : null;
          const isNew = val !== null && val !== prevVal;
          const isEvictedSlot = !isHit && isNew;

          let boxClass = 'frame-box';
          if (val === null) boxClass += ' empty';
          else if (isHit && val === page) boxClass += ' hit';
          else if (isEvictedSlot) boxClass += ' replaced';
          else boxClass += ' occupied';

          return (
            <div key={i} className={boxClass}>
              <span className="frame-label">F{i + 1}</span>
              <span className={`frame-value ${isEvictedSlot ? 'animate-pop' : ''}`}>
                {val !== null ? val : '—'}
              </span>
              {isEvictedSlot && evicted !== null && (
                <span className="evict-hint">← was {evicted}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
