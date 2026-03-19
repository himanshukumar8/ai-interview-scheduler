const { parseTimeRange, generateTimeSlots } = require("../utils/timeUtils");
const { computeScore } = require("./scoring");
const { simulateDisruption } = require("./simulation");

exports.createSchedule = (data) => {
  const { candidate, interviewers, duration = 1, simulate = false } = data;

  let allSlots = [];

  // 1️⃣ Generate candidate slots
  let candidateSlots = [];
  candidate.availability.forEach(range => {
    const slots = generateTimeSlots(range, duration);
    candidateSlots.push(...slots);
  });

  // Extract candidate preferred range (for scoring)
  const candidateRange = parseTimeRange(candidate.availability[0]);
  const candidateStart = candidateRange.start;
  const candidateEnd = candidateRange.end;

  // 2️⃣ Check interviewer overlap
  candidateSlots.forEach(slot => {
    let availableInterviewers = [];

    interviewers.forEach(interviewer => {
      interviewer.availability.forEach(range => {
        const { day, start, end } = parseTimeRange(range);

        if (
          slot.day === day &&
          slot.start >= start &&
          slot.end <= end
        ) {
          availableInterviewers.push(interviewer.name);
        }
      });
    });

    if (availableInterviewers.length > 0) {
      allSlots.push({
        ...slot,
        availableInterviewers,
        isPreferred: slot.start >= candidateStart && slot.start < candidateEnd
      });
    }
  });

  // 3️⃣ Simulation (optional)
  let processedSlots = simulate ? simulateDisruption(allSlots) : allSlots;

  // 4️⃣ Scoring (FINAL unified logic)
  const results = processedSlots.map(slot => {
    const interviewerCount = slot.availableInterviewers.length;

    const { score, probability, recommendation, explanation } = computeScore({
      interviewerCount,
      isPreferred: slot.isPreferred,
      hour: slot.start,
      simulate
    });

    return {
      time: `${slot.day} ${slot.start}-${slot.end}`,
      availableInterviewers: slot.availableInterviewers,
      score,
      probability,
      recommendation,
      explanation
    };
  });

  // 5️⃣ Sort
  results.sort((a, b) => b.score - a.score);

  // 6️⃣ Return top 3
  return results.slice(0, 3);
};