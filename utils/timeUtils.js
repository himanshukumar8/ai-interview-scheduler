function parseTimeRange(range) {
  const [day, time] = range.split(" ");
  const [start, end] = time.split("-").map(Number);

  return { day, start, end };
}

function generateTimeSlots(range, duration = 1) {
  const { day, start, end } = parseTimeRange(range);
  let slots = [];

  for (let t = start; t + duration <= end; t++) {
    slots.push({
      day,
      start: t,
      end: t + duration,
      time: `${day} ${t}-${t + duration}`
    });
  }

  return slots;
}

module.exports = {
  parseTimeRange,
  generateTimeSlots
};