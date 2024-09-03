// TRUNCATE UTILITY
const trunc = (text) => {
  const maxLength = options.MAX_NAME_LENGTH;

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.substring(0, maxLength)}…`;
};


document.addEventListener('DOMContentLoaded', () => {
  // CLOCK COMPONENT
  function updateTime() {
    const now = new Date();
    const formattedTime = now.toTimeString().split(' ')[0];
    document.getElementById('clock').textContent = formattedTime;
  }

  setInterval(updateTime, 1000);
  updateTime(); // Initialize clock and date immediately

  function updateDate() {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    document.getElementById('date').textContent = formattedDate;
  }

  updateDate();
});