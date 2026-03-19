exports.acceptanceProbability = (slot) => {
  let prob = 50;

  if (slot.isPreferred) prob += 20;
  if (slot.isEarly) prob += 10;
  if (slot.availableInterviewers.length >= 3) prob += 10;

  return Math.min(prob, 100);
};