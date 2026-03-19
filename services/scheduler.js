const { parseTimeRange, generateTimeSlots } = require("../utils/timeUtils");
const { calculateScore } = require("./scoring");
const { acceptanceProbability } = require("./probability");
const { generateExplanation } = require("./explanation");
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

  // 2️⃣ Check interviewer overlap
  candidateSlots.forEach(slot => {
    let availableInterviewers = [];

    interviewers.forEach(interviewer => {
      interviewer.availability.forEach(range => {
        const { day, start, end } = parseTimeRange(range);

        // Proper interval overlap check
        if (
          slot.day === day &&
          slot.start >= start &&
          slot.end <= end
        ) {
          availableInterviewers.push(interviewer.name);
        }
      });
    });

    // Keep valid slots
    if (availableInterviewers.length > 0) {
      allSlots.push({
        ...slot,
        availableInterviewers,
        isEarly: slot.start < 12,
        isPreferred: slot.start >= 10 && slot.start <= 16
      });
    }
  });

  // 3️⃣ Apply simulation (X-factor)
  let processedSlots = allSlots;

  if (simulate) {
    processedSlots = simulateDisruption(allSlots);
  }

  // 4️⃣ Apply scoring + probability + explanation
  const results = processedSlots.map(slot => {
    const score = calculateScore(slot);
    const probability = acceptanceProbability(slot);
    const explanation = generateExplanation(slot, score, probability);

    return {
      ...slot,
      score,
      probability,
      explanation,
      recommendation:
        score >= 80 ? "Best Fit" :
        score >= 60 ? "Good Option" :
        "Backup"
    };
  });

  // 5️⃣ Sort by score
  results.sort((a, b) => b.score - a.score);

  // 6️⃣ Return top 3
  return results.slice(0, 3);
};