// Texts for typewriter effect
const typewriterTexts = [
  "I made a tiny website just for you…",
  "Because saying it in plain words wasn’t enough.",
  "So here’s my heart, written in code. 💻💕"
];

let typeIndex = 0;
let charIndex = 0;
let typingInterval = null;

const typewriterEl = document.getElementById("typewriter");
const heartContainer = document.getElementById("heart-container");

// Slides
let currentSlide = 0;

// Start the magic: typewriter + reveal sections + small hearts
function startMagic() {
  const startBtn = document.getElementById("start-btn");
  startBtn.disabled = true;
  startBtn.textContent = "You already did 💘";

  startTypewriter();
  revealSections();
  burstHearts(window.innerWidth / 2, window.innerHeight / 2 - 40);
}

// Typewriter logic
function startTypewriter() {
  if (typingInterval) clearInterval(typingInterval);
  charIndex = 0;
  typeIndex = 0;
  typewriterEl.textContent = "";

  typingInterval = setInterval(() => {
    if (typeIndex >= typewriterTexts.length) {
      clearInterval(typingInterval);
      return;
    }

    const currentText = typewriterTexts[typeIndex];

    if (charIndex < currentText.length) {
      typewriterEl.textContent += currentText.charAt(charIndex);
      charIndex++;
    } else {
      // Pause, then go to next sentence
      setTimeout(() => {
        typeIndex++;
        charIndex = 0;
        typewriterEl.textContent = "";
      }, 1200);
    }
  }, 60);
}

// Smoothly reveal the other sections
function revealSections() {
  const ids = ["music-section", "reasons-section", "photos-section", "letter-section"];
  let delay = 400;

  ids.forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;

    setTimeout(() => {
      section.classList.remove("hidden");
      section.classList.add("show");
    }, delay);

    delay += 400;
  });
}

// Floating hearts function
function createHeart(x, y) {
  const heart = document.createElement("div");
  heart.className = "heart";

  const offsetX = (Math.random() - 0.5) * 80;
  const offsetY = (Math.random() - 0.5) * 20;

  heart.style.left = x + offsetX + "px";
  heart.style.top = y + offsetY + "px";

  const scale = 0.8 + Math.random() * 0.8;
  heart.style.transform = `translateY(0) scale(${scale}) rotate(-45deg)`;

  heartContainer.appendChild(heart);

  heart.addEventListener("animationend", () => {
    heart.remove();
  });
}

// Burst a bunch of hearts in one place
function burstHearts(x, y) {
  for (let i = 0; i < 18; i++) {
    createHeart(x, y);
  }
}

// Hearts wherever she taps/clicks
document.addEventListener("click", (e) => {
  createHeart(e.clientX, e.clientY);
});

// Photo slider logic
function updateSlides() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide);
  });

  const indicator = document.getElementById("slide-indicator");
  if (indicator) {
    indicator.textContent = `${currentSlide + 1} / ${document.querySelectorAll(".slide").length}`;
  }
}

function nextSlide() {
  const slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return;
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlides();
}

function prevSlide() {
  const slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return;
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlides();
}

// Expose for HTML buttons
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;

// Auto-play slider every few seconds
setInterval(() => {
  const slides = document.querySelectorAll(".slide");
  if (slides.length > 1) {
    nextSlide();
  }
}, 3500);

// Love letter open / close
function toggleLetter() {
  const letter = document.getElementById("love-letter");
  if (!letter) return;

  const isExpanded = letter.classList.contains("expanded");
  letter.classList.toggle("expanded", !isExpanded);

  const music = document.getElementById("bg-music");
  if (music && !music.paused && !isExpanded) {
    // Extra hearts when she opens it while music is on
    burstHearts(window.innerWidth / 2, window.innerHeight / 2);
  }
}

window.toggleLetter = toggleLetter;

// Optional: auto-focus on first slide + update indicator once page loads
document.addEventListener("DOMContentLoaded", () => {
  updateSlides();
});
