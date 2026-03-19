function computeScore({ interviewerCount, isPreferred, hour, simulate }) {
  let score =
    interviewerCount * 25 +
    (isPreferred ? 15 : 5) +
    (hour >= 12 && hour <= 17 ? 10 : 0);

  score = Math.min(100, Math.max(0, score));

  if (simulate) {
    const noise = Math.floor(Math.random() * 10 - 5);
    score = Math.min(100, Math.max(0, score + noise));
  }

  const probability = Math.min(
    95,
    40 + interviewerCount * 15 + (isPreferred ? 10 : 0)
  );

  const recommendation = score >= 70 ? "Good Option" : "Backup";

  const explanation = `Slot ${hour}-${hour + 1} selected with score ${score}, based on ${interviewerCount} interviewer(s), ${isPreferred ? "preferred timing" : "non-preferred timing"}, and ${probability}% acceptance probability.`;
  return {
    score,
    probability,
    recommendation,
    explanation
  };
}

module.exports = { computeScore };