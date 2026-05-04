# FIFO Page Replacement Algorithm Simulator

An interactive, step-by-step web simulator for the **First-In-First-Out (FIFO)** page replacement algorithm, built with **React 19** and **Vite**. Designed for OS course demonstrations and university project presentations.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How to Use](#how-to-use)
- [Algorithm Reference](#algorithm-reference)
- [Author](#author)

---

## Overview

This simulator visualizes how the **FIFO page replacement algorithm** works in operating system memory management. When a program accesses a page that is not in memory (a **page fault**), the OS must decide which existing page to evict to make room. FIFO always evicts the page that has been in memory the **longest** — the one that arrived first.

The tool allows students to:

- Enter any custom page reference string and frame count
- Watch the algorithm run step by step with real-time animations
- See page hits (green) and page faults (red) highlighted visually
- Compare FIFO against **LRU** and **Optimal** algorithms side by side

---

## Features

### Core Simulation
- Correct FIFO algorithm using a queue-based eviction strategy
- Accepts any comma or space-separated page reference string (up to 50 references)
- Supports 1–10 memory frames
- Calculates total page faults, page hits, and hit ratio

### Visualization
- Animated memory frame boxes that bounce when a new page is loaded
- Color-coded feedback — **red** for page fault, **green** for page hit
- Eviction label showing which page was removed and from which frame
- Progress bar tracking simulation completion

### Playback Controls

| Control | Description |
|---|---|
| ▶ Play | Auto-advances through all steps |
| ⏸ Pause | Pauses at the current step |
| ▶ Resume | Continues from where it paused |
| ⏭ Next Step | Manually advances one step at a time |
| ↺ Reset | Returns to step zero without clearing input |
| New Simulation | Clears everything and returns to input screen |

### Speed Control
Adjustable animation speed slider — Slow, Normal, or Fast — changeable at any time, even during playback.

### Step Table
Full scrollable trace table showing every step with:
- Page reference number
- State of all frames after that step
- Which page was evicted (if any)
- HIT or FAULT badge

### Algorithm Comparison
Toggle **Compare Algorithms** in the header to display a live bar chart comparing page fault counts across:
- FIFO — First-In-First-Out
- LRU — Least Recently Used
- Optimal — Bélády's Algorithm

### Preloaded Test Cases
Three built-in examples to get started instantly:

| Preset | Reference String | Frames | Faults |
|---|---|---|---|
| Classic Example | 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2 | 3 | 10 |
| Belady's Anomaly | 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 | 3 | 9 |
| Simple Demo | 1, 2, 3, 1, 4, 1, 5, 2, 1, 3 | 4 | 7 |

### Input Validation
- Detects empty input, non-integer values, and out-of-range frame counts
- Shows inline error messages without page reloads

### Responsive Design
Works on both desktop and mobile. Layout stacks vertically on smaller screens.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19.x | UI components and state management |
| Vite | 8.x | Development server and production build |
| JavaScript (ES Modules) | ES2022 | Algorithm logic and component logic |
| CSS (Custom Properties) | — | Styling, animations, and responsive layout |

No external UI libraries. All styling is hand-written CSS.

---

## Project Structure

```
fifo-simulator/
├── index.html                  # HTML entry point
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # Main app — simulation state machine
    ├── App.css                 # All styles (variables, layout, animations)
    ├── index.css               # Global reset
    ├── utils/
    │   ├── algorithms.js       # FIFO, LRU, Optimal — pure logic, no React
    │   └── validation.js       # Input parsing and error messages
    └── components/
        ├── InputPanel.jsx      # Page string + frame count form + presets
        ├── FrameDisplay.jsx    # Animated memory frame boxes
        ├── Controls.jsx        # Play / Pause / Next / Reset + speed slider
        ├── ProgressBar.jsx     # Simulation progress bar
        ├── StatsDisplay.jsx    # Faults / Hits / Hit ratio stat cards
        ├── StepTable.jsx       # Full step-by-step trace table
        └── ComparePanel.jsx    # FIFO vs LRU vs Optimal bar chart
```

### Key Design Decisions

- **`utils/algorithms.js` is pure logic** — no React imports, can be tested independently in Node.js
- **All state lives in `App.jsx`** — every child component is stateless and receives props
- **`useRef` for the interval timer** — prevents stale closure issues with `setInterval` inside React hooks

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone or navigate to the project directory
cd fifo-simulator

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
# Create an optimized production build
npm run build

# Preview the production build locally
npm run preview
```

Output is placed in the `dist/` folder and can be served by any static file host.

---

## How to Use

1. **Enter a page reference string** — type page numbers separated by commas or spaces (e.g. `7, 0, 1, 2, 0, 3`), or click one of the three preset buttons.
2. **Set the number of frames** — enter a number between 1 and 10.
3. **Click Start Simulation** — the input form is replaced by the live visualization.
4. **Use the controls** to play automatically or step through manually at your own pace.
5. **Adjust the speed** slider at any time, even while the animation is running.
6. **Toggle Compare Algorithms** in the header to see a live comparison against LRU and Optimal.
7. **Click New Simulation** to return to the input screen and try a different example.

---

## Algorithm Reference

### FIFO (First-In-First-Out)

FIFO maintains a queue of pages currently in memory. When a page fault occurs and all frames are full, the page at the **front of the queue** — the one loaded earliest — is evicted. The new page is added to the back of the queue.

```
queue  = []
frames = []

for each page in reference_string:

    if page in frames:
        → PAGE HIT  (no change to frames or queue)

    else:
        → PAGE FAULT
        if len(frames) < frame_count:
            frames.append(page)
            queue.append(page)
        else:
            evicted = queue.pop(0)          # remove oldest page
            frames[frames.index(evicted)] = page
            queue.append(page)
```

### Belady's Anomaly

An interesting property of FIFO is **Belady's Anomaly** — increasing the number of frames can sometimes *increase* the number of page faults. This counter-intuitive behaviour is demonstrated by the built-in Belady's Anomaly preset.

| Frames | Page Faults (string: `1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5`) |
|---|---|
| 3 | 9 |
| 4 | 10 |

LRU and Optimal algorithms do **not** suffer from Belady's Anomaly.

---

## Author

**Faizur Rahman Zunayed**
Student ID: `2312137642` | Section 13
Department of Computer Science and Engineering
North South University

**Course:** CSE323 — Operating Systems
**Instructor:** Safat Siddiqui

---

*Built as a university project for CSE323 — Operating Systems, North South University.*
