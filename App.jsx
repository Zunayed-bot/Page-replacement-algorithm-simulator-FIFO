import { useState, useEffect, useRef, useCallback } from 'react';
import InputPanel from './components/InputPanel';
import FrameDisplay from './components/FrameDisplay';
import StatsDisplay from './components/StatsDisplay';
import Controls from './components/Controls';
import ProgressBar from './components/ProgressBar';
import StepTable from './components/StepTable';
import ComparePanel from './components/ComparePanel';
import { runFIFO, runLRU, runOptimal, computeStats } from './utils/algorithms';
import './App.css';

export default function App() {
  const [pages, setPages] = useState(null);
  const [frameCount, setFrameCount] = useState(0);

  const [fifoSteps, setFifoSteps] = useState(null);
  const [lruSteps, setLruSteps] = useState(null);
  const [optimalSteps, setOptimalSteps] = useState(null);

  const [currentStep, setCurrentStep] = useState(0); // 0 = before any step
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(800); // ms between steps

  const [showComparison, setShowComparison] = useState(false);

  const timerRef = useRef(null);

  const activeStep = fifoSteps ? fifoSteps[currentStep - 1] ?? null : null;
  const prevStep = fifoSteps ? fifoSteps[currentStep - 2] ?? null : null;
  const totalSteps = fifoSteps ? fifoSteps.length : 0;
  const stats = fifoSteps ? computeStats(fifoSteps.slice(0, currentStep)) : null;

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(
    (total) => {
      stopTimer();
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= total) {
            stopTimer();
            setIsRunning(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    },
    [speed, stopTimer]
  );

  useEffect(() => {
    if (isRunning && !isPaused) {
      startTimer(totalSteps);
    }
  }, [speed]); // eslint-disable-line

  useEffect(() => {
    if (currentStep >= totalSteps && isRunning) {
      stopTimer();
      setIsRunning(false);
    }
  }, [currentStep, totalSteps, isRunning, stopTimer]);

  function handleStart(newPages, newFrameCount) {
    stopTimer();
    setPages(newPages);
    setFrameCount(newFrameCount);
    setFifoSteps(runFIFO(newPages, newFrameCount));
    setLruSteps(runLRU(newPages, newFrameCount));
    setOptimalSteps(runOptimal(newPages, newFrameCount));
    setCurrentStep(0);
    setIsRunning(false);
    setIsPaused(false);
  }

  function handlePlay() {
    if (!fifoSteps) return;
    setIsRunning(true);
    setIsPaused(false);
    startTimer(totalSteps);
  }

  function handlePause() {
    stopTimer();
    setIsPaused(true);
    setIsRunning(false);
  }

  function handleNext() {
    if (currentStep < totalSteps) {
      setCurrentStep((p) => p + 1);
    }
  }

  function handleReset() {
    stopTimer();
    setCurrentStep(0);
    setIsRunning(false);
    setIsPaused(false);
  }

  function handleFullReset() {
    stopTimer();
    setPages(null);
    setFrameCount(0);
    setFifoSteps(null);
    setLruSteps(null);
    setOptimalSteps(null);
    setCurrentStep(0);
    setIsRunning(false);
    setIsPaused(false);
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-title-group">
            <span className="header-icon">&#128187;</span>
            <div>
              <h1 className="header-title">FIFO Page Replacement</h1>
              <p className="header-subtitle">Algorithm Simulator</p>
            </div>
          </div>
          {fifoSteps && (
            <div className="header-actions">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={showComparison}
                  onChange={(e) => setShowComparison(e.target.checked)}
                />
                <span className="toggle-text">Compare Algorithms</span>
              </label>
              <button className="btn btn-outline" onClick={handleFullReset}>
                New Simulation
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="app-main">
        {!fifoSteps ? (
          <div className="layout-config">
            <section className="section section-input">
              <InputPanel onStart={handleStart} isRunning={isRunning} />
            </section>

            <div className="welcome-hint">
              <div className="hint-card">
                <h3>How it works</h3>
                <ol>
                  <li>Enter a page reference string and number of frames above.</li>
                  <li>
                    Click <strong>Start Simulation</strong> to load your input.
                  </li>
                  <li>
                    Use <strong>Play</strong> to auto-advance, or{' '}
                    <strong>Next Step</strong> for manual control.
                  </li>
                  <li>
                    Watch frames update in real-time — red = page fault, green = hit.
                  </li>
                </ol>
                <p className="hint-note">
                  FIFO evicts the <em>oldest</em> page in memory whenever a new page
                  must be loaded and all frames are occupied.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="layout-active">
            <div className="col-left">
              <section className="section section-viz">
                <div className="viz-header">
                  <div className="step-counter">
                    Step <strong>{currentStep}</strong> of{' '}
                    <strong>{totalSteps}</strong>
                  </div>
                  <ProgressBar current={currentStep} total={totalSteps} />
                </div>

                <FrameDisplay
                  step={activeStep}
                  frameCount={frameCount}
                  prevStep={prevStep}
                />

                <Controls
                  isRunning={isRunning}
                  isPaused={isPaused}
                  hasSteps={!!fifoSteps}
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                  speed={speed}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onNext={handleNext}
                  onReset={handleReset}
                  onSpeedChange={setSpeed}
                />
              </section>

              <StatsDisplay
                stats={stats}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />

              {showComparison && (
                <ComparePanel
                  fifoSteps={fifoSteps.slice(0, currentStep)}
                  lruSteps={lruSteps.slice(0, currentStep)}
                  optimalSteps={optimalSteps.slice(0, currentStep)}
                />
              )}
            </div>

            <div className="col-right">
              <StepTable
                steps={fifoSteps}
                frameCount={frameCount}
                currentStep={currentStep}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
