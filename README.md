# 🧠 AI Interview Scheduling System

An intelligent scheduling system that recommends optimal interview time slots based on candidate and interviewer availability, scoring logic, and real-world simulation.

---

## 🚀 Features

* 📅 Smart time-slot matching
* 🧮 Scoring-based ranking system
* 🎯 Recommendation engine (Best / Backup)
* ⚡ Real-world disruption simulation
* 📊 Acceptance probability estimation
* 💻 Clean React-based UI

---

## 🧩 Problem Statement

Scheduling interviews manually is inefficient and often leads to conflicts.

This system automates:

* Availability matching
* Optimal slot selection
* Decision support via scoring & probability

---

## ⚙️ Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js + Express
* **Architecture:** REST API
* **Data Handling:** Custom scheduling algorithm

---

## 🧠 Core Logic

Each time slot is evaluated using:

* Number of available interviewers
* Candidate preference alignment
* Time-based scoring (early / preferred slots)
* Simulation adjustments (real-world disruptions)

### Output includes:

* Score
* Acceptance probability
* Recommendation (Good / Backup)
* Explanation (transparent decision logic)

---

## 🔥 Unique Factor (X-Factor)

Unlike basic schedulers, this system:

* Simulates real-world uncertainty (interviewer drop-offs)
* Provides **decision intelligence**, not just availability
* Ranks multiple optimal options instead of returning a single slot

---

## 📦 Project Structure

```
client/        → React frontend  
controllers/   → Request handlers  
routes/        → API endpoints  
services/      → Scheduling logic  
utils/         → Helper functions  
server.js      → Entry point  
```

---

## ▶️ How to Run

### Backend

```
npm install
node server.js
```

### Frontend

```
cd client
npm install
npm start
```

---

## 📌 Example

**Input:**

* Candidate: Tue 14–17
* Interviewer A: Tue 15–18
* Interviewer B: Tue 13–16

**Output:**

* Suggested Slot: Tue 15–16
* Score: 75
* Acceptance: 80%

---

## 📈 Future Improvements

* Multi-day scheduling optimization
* Calendar API integration (Google / Outlook)
* ML-based scoring model
* UI/UX enhancements

---

## 👨‍💻 Author

Himanshu Kumar
IIIT Lucknow
