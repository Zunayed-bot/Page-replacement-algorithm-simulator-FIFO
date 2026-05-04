import { useState } from 'react';
import { parsePageString, parseFrameCount } from '../utils/validation';

const PRESETS = [
  {
    label: 'Classic Example',
    pages: '7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2',
    frames: 3,
  },
  {
    label: 'Belady\'s Anomaly',
    pages: '1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5',
    frames: 3,
  },
  {
    label: 'Simple Demo',
    pages: '1, 2, 3, 1, 4, 1, 5, 2, 1, 3',
    frames: 4,
  },
];

export default function InputPanel({ onStart, isRunning }) {
  const [pageInput, setPageInput] = useState('7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2');
  const [frameInput, setFrameInput] = useState('3');
  const [errors, setErrors] = useState({});

  function applyPreset(preset) {
    setPageInput(preset.pages);
    setFrameInput(String(preset.frames));
    setErrors({});
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    const pagesResult = parsePageString(pageInput);
    if (pagesResult.error) newErrors.pages = pagesResult.error;

    const framesResult = parseFrameCount(frameInput);
    if (framesResult.error) newErrors.frames = framesResult.error;

    setErrors(newErrors);

    if (!newErrors.pages && !newErrors.frames) {
      onStart(pagesResult.pages, framesResult.frameCount);
    }
  }

  return (
    <div className="input-panel">
      <h2 className="panel-title">Configuration</h2>

      <div className="presets">
        <span className="presets-label">Presets:</span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            className="preset-btn"
            onClick={() => applyPreset(p)}
            disabled={isRunning}
          >
            {p.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="config-form">
        <div className="form-group">
          <label htmlFor="pages">Page Reference String</label>
          <input
            id="pages"
            type="text"
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            placeholder="e.g. 7, 0, 1, 2, 0, 3"
            disabled={isRunning}
            className={errors.pages ? 'input-error' : ''}
          />
          {errors.pages && <span className="error-msg">{errors.pages}</span>}
          <span className="hint">Comma or space separated integers (max 50)</span>
        </div>

        <div className="form-group">
          <label htmlFor="frames">Number of Frames</label>
          <input
            id="frames"
            type="number"
            value={frameInput}
            onChange={(e) => setFrameInput(e.target.value)}
            min="1"
            max="10"
            disabled={isRunning}
            className={errors.frames ? 'input-error' : ''}
          />
          {errors.frames && <span className="error-msg">{errors.frames}</span>}
          <span className="hint">Between 1 and 10</span>
        </div>

        <button type="submit" className="btn btn-primary" disabled={isRunning}>
          Start Simulation
        </button>
      </form>
    </div>
  );
}
