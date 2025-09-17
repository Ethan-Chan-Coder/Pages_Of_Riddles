const container = document.getElementById("game-container");
const cursor = document.getElementById("cursor");
const statusText = document.getElementById("status");
const speed = 10

const containerWidth = container.offsetWidth;
let position = 0;
let direction = 1;
let animationId;

// Declare green zone variables globally
let greenStart = 0.3; // default
let greenEnd = 0.4;

function updateGradient() {
  const gradient = `linear-gradient(to right, red ${greenStart * 100}%, green ${greenStart * 100}%, green ${greenEnd * 100}%, red ${greenEnd * 100}%)`;
  container.style.background = gradient;
}

function animate() {
  position += direction * speed; // speed
  if (position >= containerWidth || position <= 0) {
    direction *= -1;
  }

  cursor.style.left = position + "px";
  animationId = requestAnimationFrame(animate);
}

function isCursorOnGreen() {
  const percent = position / containerWidth;
  return percent >= greenStart && percent <= greenEnd;
}

container.addEventListener("click", () => {
  if (isCursorOnGreen()) {
    statusText.textContent = "✅ Success! You clicked on green!";
    document.getElementById("secret-text").style.display = "block";
  } else {
    statusText.textContent = "❌ Miss! Not on green.";
    document.getElementById("secret-text").style.display = "none";
  }

  cancelAnimationFrame(animationId);
});

function restartGame() {
  position = 0;
  direction = 1;
  statusText.textContent = "Waiting...";
  document.getElementById("secret-text").style.display = "none";

  // Random green zone size and position
  const greenWidth = 0.008 + Math.random() * 0.05; // 5% to 10%
  const speed = 8 + Math.random() * 0.01
  greenStart = Math.random() * (1 - greenWidth);
  greenEnd = greenStart + greenWidth;

  updateGradient(); // apply new gradient
  animate();
}

restartGame();
