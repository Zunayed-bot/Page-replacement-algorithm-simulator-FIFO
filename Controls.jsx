export default function Controls({
  isRunning,
  isPaused,
  hasSteps,
  currentStep,
  totalSteps,
  speed,
  onPlay,
  onPause,
  onNext,
  onReset,
  onSpeedChange,
}) {
  const atEnd = currentStep >= totalSteps;

  return (
    <div className="controls">
      <div className="control-buttons">
        {!isRunning && !isPaused && (
          <button className="btn btn-play" onClick={onPlay} disabled={!hasSteps || atEnd}>
            ▶ Play
          </button>
        )}
        {isRunning && !isPaused && (
          <button className="btn btn-pause" onClick={onPause}>
            ⏸ Pause
          </button>
        )}
        {isPaused && (
          <button className="btn btn-play" onClick={onPlay} disabled={atEnd}>
            ▶ Resume
          </button>
        )}
        <button
          className="btn btn-next"
          onClick={onNext}
          disabled={!hasSteps || atEnd || isRunning}
        >
          ⏭ Next Step
        </button>
        <button className="btn btn-reset" onClick={onReset} disabled={!hasSteps && !isRunning}>
          ↺ Reset
        </button>
      </div>

      <div className="speed-control">
        <label htmlFor="speed">Speed</label>
        <input
          id="speed"
          type="range"
          min="200"
          max="2000"
          step="100"
          value={2200 - speed} // invert so right = faster
          onChange={(e) => onSpeedChange(2200 - Number(e.target.value))}
        />
        <span className="speed-label">
          {speed <= 400 ? 'Fast' : speed <= 900 ? 'Normal' : 'Slow'}
        </span>
      </div>
    </div>
  );
}
