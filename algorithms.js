// Runs the FIFO page replacement algorithm and returns all simulation steps.
// Each step contains the current state of frames after processing a page reference.
export function runFIFO(pages, frameCount) {
  const frames = [];
  const queue = []; // tracks insertion order for FIFO eviction
  const steps = [];

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const isHit = frames.includes(page);
    let evicted = null;

    if (!isHit) {
      if (frames.length < frameCount) {
        frames.push(page);
        queue.push(page);
      } else {
        evicted = queue.shift();
        const idx = frames.indexOf(evicted);
        frames[idx] = page;
        queue.push(page);
      }
    }

    steps.push({
      page,
      frames: [...frames],
      isHit,
      evicted,
      stepIndex: i,
    });
  }

  return steps;
}

// LRU page replacement algorithm — for comparison mode
export function runLRU(pages, frameCount) {
  const frames = [];
  const steps = [];

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const isHit = frames.includes(page);
    let evicted = null;

    if (!isHit) {
      if (frames.length < frameCount) {
        frames.push(page);
      } else {
        // For each frame find its most recent use index; evict the one used farthest back
        const lastUseTimes = frames.map((f) => {
          for (let j = i - 1; j >= 0; j--) {
            if (pages[j] === f) return j;
          }
          return -1; // never used before — evict first
        });
        const minTime = Math.min(...lastUseTimes);
        evicted = frames[lastUseTimes.indexOf(minTime)];
        const idx = frames.indexOf(evicted);
        frames[idx] = page;
      }
    } else {
      // Move to most recently used — no structural change for array, just conceptual
    }

    steps.push({
      page,
      frames: [...frames],
      isHit,
      evicted,
      stepIndex: i,
    });
  }

  return steps;
}

// Optimal page replacement algorithm — for comparison mode
export function runOptimal(pages, frameCount) {
  const frames = [];
  const steps = [];

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const isHit = frames.includes(page);
    let evicted = null;

    if (!isHit) {
      if (frames.length < frameCount) {
        frames.push(page);
      } else {
        // Find the page used farthest in the future (or never used again)
        let farthestIdx = -1;
        let evictCandidate = null;

        for (const f of frames) {
          let nextUse = pages.indexOf(f, i + 1);
          if (nextUse === -1) {
            evictCandidate = f;
            break;
          }
          if (nextUse > farthestIdx) {
            farthestIdx = nextUse;
            evictCandidate = f;
          }
        }

        evicted = evictCandidate;
        const idx = frames.indexOf(evicted);
        frames[idx] = page;
      }
    }

    steps.push({
      page,
      frames: [...frames],
      isHit,
      evicted,
      stepIndex: i,
    });
  }

  return steps;
}

// Compute summary statistics from simulation steps
export function computeStats(steps) {
  const faults = steps.filter((s) => !s.isHit).length;
  const hits = steps.filter((s) => s.isHit).length;
  const total = steps.length;
  const hitRatio = total > 0 ? ((hits / total) * 100).toFixed(1) : '0.0';
  const faultRatio = total > 0 ? ((faults / total) * 100).toFixed(1) : '0.0';
  return { faults, hits, total, hitRatio, faultRatio };
}
