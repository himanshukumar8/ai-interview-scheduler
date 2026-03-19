exports.generateExplanation = (slot, score, probability) => {
  let base = `Slot ${slot.time} scored ${score} with ${slot.availableInterviewers.length} interviewer(s).`;

  if (slot.simulated) {
    base += " Note: Adjusted due to interviewer unavailability.";
  }

  if (probability > 80) {
    base += " High likelihood of acceptance.";
  } else if (probability > 60) {
    base += " Moderate acceptance probability.";
  } else {
    base += " Lower acceptance likelihood.";
  }

  return base;
};