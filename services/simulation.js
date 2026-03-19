exports.simulateDisruption = (slots) => {
  return slots.map(slot => {
    let modified = { ...slot };

    // 30% chance interviewer drops
    if (Math.random() < 0.3 && slot.availableInterviewers.length > 1) {
      modified.availableInterviewers = slot.availableInterviewers.slice(0, -1);
      modified.simulated = true;
    }

    return modified;
  });
};