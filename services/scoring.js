exports.calculateScore = (slot) => {
  let score = 0;

  score += slot.availableInterviewers.length * 20;

  if (slot.isEarly) score += 15;
  if (slot.isPreferred) score += 15;

  return Math.min(score, 100);
};