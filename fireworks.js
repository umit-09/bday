function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const urlParams = new URLSearchParams(window.location.search);
const container = document.getElementById("fireworks-container");
const width = container.offsetWidth;
const height = container.offsetHeight;

const canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;
container.appendChild(canvas);

const context = canvas.getContext("2d");

// Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.explode();
  }

  explode() {
    const amountMin = parseInt(urlParams.get("amountMin")) || 50;
    const amountMax = parseInt(urlParams.get("amountMax")) || 100;
    const velocityMin = parseFloat(urlParams.get("velocityMin")) || 1;
    const velocityMax = parseFloat(urlParams.get("velocityMax")) || 4;

    for (let i = 0; i < getRandomInt(amountMin, amountMax); i++) {
      const angle = randomInRange(0, Math.PI * 2);
      const speed = randomInRange(velocityMin, velocityMax);
      const particle = new Particle(this.x, this.y, angle, speed);
      this.particles.push(particle);
    }
  }

  update() {
    this.particles.forEach((particle, index) => {
      particle.update();

      if (particle.alpha <= 0) {
        this.particles.splice(index, 1);
      }
    });

    if (this.particles.length === 0) {
      this.x = randomInRange(0, width);
      this.y = randomInRange(0, height);
      this.explode();
    }
  }

  draw() {
    this.particles.forEach(particle => {
      particle.draw();
    });
  }
}

class Particle {
  constructor(x, y, angle, speed) {
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.gravity = parseFloat(urlParams.get("gravity")) || 0.05;
    this.alpha = 1;
    this.color = getRandomInt(0, 255);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;

    if (this.x < 0 || this.x > width) {
      this.vx *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.vy *= -1;
    }

    if (Math.abs(this.vx) < 0.01 && Math.abs(this.vy) < 0.01) {
      this.alpha = 0;
    } else {
      this.alpha -= 0.0035;
    }
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, 2, 0, Math.PI * 2);
    context.fillStyle = `rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${this.alpha})`;
    context.fill();
  }
}

const fireworks = [];

function createFirework() {
  const x = randomInRange(0, width);
  const y = randomInRange(0, height);
  const firework = new Firework(x, y);
  fireworks.push(firework);
}

function animateFireworks() {
  context.fillStyle = "rgba(0, 0, 0, 0.2)";
  context.fillRect(0, 0, width, height);

  fireworks.forEach(firework => {
    firework.update();
    firework.draw();
  });

  if (fireworks.length < parseInt(urlParams.get("maxFireworks"))) {
    createFirework();
  }

  requestAnimationFrame(animateFireworks);
}

animateFireworks();
