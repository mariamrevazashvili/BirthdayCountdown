const micButton = document.getElementById('mic-button');
const micCross1 = document.getElementById('mic-cross');
const micCross2 = document.getElementById('mic-cross2');
const audio = document.getElementById('celebration-audio');

let micEnabled = false;

micButton.addEventListener('click', () => {
  micEnabled = true;
  micButton.setAttribute('aria-pressed', 'true');
  micButton.style.color = 'green';  // ღილაკის ფერის შეცვლა ჩართვის დროს
  micCross1.style.display = 'none';
  micCross2.style.display = 'none';
});



const elDays = document.getElementById('days');
const elHours = document.getElementById('hours');
const elMinutes = document.getElementById('minutes');
const elSeconds = document.getElementById('seconds');
const celebrationBlock = document.getElementById('celebration');

function pad(n) {
  return String(n).padStart(2, '0');
}

let celebrated = false;

function updateCountdown() {
  const now = new Date();
  const diff = TARGET - now;

  if (diff <= 0) {
    elDays.textContent = '0';
    elHours.textContent = '00';
    elMinutes.textContent = '00';
    elSeconds.textContent = '00';

    if (!celebrated) {
      doCelebrate();
      celebrated = true;
    }
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  elDays.textContent = days;
  elHours.textContent = pad(hours);
  elMinutes.textContent = pad(minutes);
  elSeconds.textContent = pad(seconds);
}

function doCelebrate() {
  celebrationBlock.classList.remove('hidden');
  document.getElementById('greeting').classList.remove('hidden');

  if (micEnabled) {
    audio.play().catch(e => {
      console.log('Audio autoplay blocked:', e);
    });
  }

  const duration = 3600 * 1000; // 1 საათი
  const end = Date.now() + duration;

  (function frame() {
    confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 } });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    } else {
      audio.pause();
      audio.currentTime = 0;
      micButton.style.display = 'none';
    }
  })();
}


updateCountdown();
setInterval(updateCountdown, 1000);
