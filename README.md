FIFO Page Replacement Algorithm Simulator
Overview

This project is a web-based simulator for the FIFO (First-In-First-Out) page replacement algorithm. It helps to understand how memory management works in an operating system when page faults occur.

In FIFO, the page that comes first into memory is removed first when a new page needs to be loaded.

Features
User can enter a custom page reference string.
User can select number of frames (1–10).
Step-by-step simulation of FIFO algorithm.
Shows page hits and page faults.
Displays total faults, hits, and hit ratio.
Basic comparison with LRU and Optimal algorithms.
Simple and responsive UI
    
Tech Stack
    1.React
    2.Vite
    3.JavaScript
    4.CSS
    
Project Structure
    src/
     ├── components/
     ├── utils/
     ├── App.jsx
     ├── main.jsx
     
components/ → UI parts
    -utils/ → algorithm logic
    -App.jsx → main logic

How to Run
    1.Install dependencies
    2.npm install
    3.Run the project
    4.npm run dev
    5.Open in browser:
    6.http://localhost:5173
    
How to Use
    Enter page reference string (example: 7, 0, 1, 2).
    Enter number of frames.
    Start simulation.
    Use controls to see step-by-step result.

 Algorithm (FIFO)
    If page is already in memory → Hit
    If not → Page Fault
    If memory is full → remove the oldest page
    Insert new page

    
Author
Faizur Rahman Zunayed
Student ID: 2312137642
Department of CSE
North South University

Course Info
CSE323 – Operating Systems
