let bubbles = [];

// Webcam and hand tracking
let video;
let handPose;
let hands = [];

// Game variables
let score = 0;
let misses = 0;
let gameState = "start";
let resultMessage = "";

// BUBBLE CLASS ---------------------------------------

class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.radius = random(25, 40);
    this.speed = random(1.5, 2.5);

    this.glowing = false;
    this.glowColor = null;
  }

  // Make the bubble fall.
  move() {
    this.y = this.y + this.speed;
  }

  // Activate the bubble's glow.
  glow() {
    if (this.glowing === false) {
      this.glowing = true;

      // Array of possible glow colours
      let colors = [
        color(255, 70, 180), // Pink
        color(160, 80, 255), // Purple
        color(60, 200, 255), // Blue
        color(80, 255, 180), // Green
        color(255, 180, 60), // Orange
      ];

      // Choose one random colour
      this.glowColor = random(colors);
    }
  }

  // Draw the bubble.
  display() {
    if (this.glowing === true) {
      noStroke();

      // Large transparent glow
      fill(
        red(this.glowColor),
        green(this.glowColor),
        blue(this.glowColor),
        35,
      );
      circle(this.x, this.y, this.radius * 4);

      // Bright glowing bubble
      fill(this.glowColor);
      circle(this.x, this.y, this.radius * 2);
    } else {
      // Normal transparent bubble
      stroke(180, 150, 255);
      strokeWeight(2);
      fill(180, 150, 255, 40);

      circle(this.x, this.y, this.radius * 2);
    }
  }
}

// SETUP ----------------------------------------------

async function setup() {
  createCanvas(640, 480);

  // Start mirrored webcam.
  video = createCapture(VIDEO, { flipped: true });
  video.size(width, height);
  video.hide();

  // Start mirrored hand tracking.
  handPose = await ml5.handPose({ flipped: true });
  handPose.detectStart(video, gotHands);
}

// DRAW -----------------------------------------------

function draw() {
  // Webcam background
  image(video, 0, 0, width, height);

  // Dark overlay
  noStroke();
  fill(0, 0, 0, 100);
  rect(0, 0, width, height);

  // START SCREEN
  if (gameState === "start") {
    fill(255);
    textAlign(CENTER, CENTER);
    textFont("monospace");

    textSize(36);
    text("GLOW UP OR GO DOWN!", width / 2, 170);

    textSize(18);
    text(
      "Use your index finger to touch the bubbles. \n Don't let them reach the bottom without it!",
      width / 2,
      230,
    );
    text("Press SPACE to start", width / 2, 280);
  }

  // PLAYING
  else if (gameState === "playing") {
    // Spawn a new bubble every 75 frames.
    if (frameCount % 75 === 0) {
      bubbles.push(new Bubble(random(40, width - 40), -40));
    }

    // Track the index fingertip.
    let fingerX = null;
    let fingerY = null;

    if (hands.length > 0) {
      fingerX = hands[0].index_finger_tip.x;
      fingerY = hands[0].index_finger_tip.y;
    }

    // Loop through all the bubbles backwards.
    for (let i = bubbles.length - 1; i >= 0; i--) {
      let bubble = bubbles[i];

      bubble.move();

      // Check whether finger touches the bubble.
      if (fingerX !== null && bubble.glowing === false) {
        let distance = dist(fingerX, fingerY, bubble.x, bubble.y);

        if (distance < bubble.radius + 10) {
          bubble.glow();
          score++;
        }
      }

      bubble.display();

      // Check if bubble reaches the bottom.
      if (bubble.y + bubble.radius >= height) {
        // Count a miss only if it isn't glowing.
        if (bubble.glowing === false) {
          misses++;
        }

        // Remove bubble from array.
        bubbles.splice(i, 1);
      }
    }

    // Display fingertip cursor.
    if (fingerX !== null) {
      noStroke();
      fill(255, 100, 200);
      circle(fingerX, fingerY, 20);
    }

    // Display score and misses.
    fill(255);
    textSize(22);
    textFont("monospace");

    textAlign(LEFT);
    text("Score: " + score + "/20", 20, 35);

    textAlign(RIGHT);
    text("Misses: " + misses + "/4", width - 20, 35);

    // Check for a win.
    if (score >= 20) {
      gameState = "gameOver";
      resultMessage = "GREAT SUCCESS!";
    }

    // Check for a loss.
    else if (misses >= 5) {
      gameState = "gameOver";
      resultMessage = "YOU FAILED THE GLOW UP";
    }
  }

  // END SCREEN
  else if (gameState === "gameOver") {
    fill(255);
    textAlign(CENTER, CENTER);

    textSize(40);
    text(resultMessage, width / 2, 190);

    textSize(22);
    text("Final Score: " + score, width / 2, 250);

    textSize(18);
    text("Press SPACE to play again", width / 2, 300);
  }
}

// START OR RESTART THE GAME ---------------------------

function keyPressed() {
  if (key === " " && gameState !== "playing") {
    startGame();
  }
}

function startGame() {
  score = 0;
  misses = 0;
  bubbles = [];
  resultMessage = "";

  // Create 3 bubbles at different heights.
  for (let i = 0; i < 3; i++) {
    bubbles.push(new Bubble(random(40, width - 40), -40 - i * 160));
  }

  gameState = "playing";
}

// HAND TRACKING --------------------------------------

function gotHands(results) {
  hands = results;
}
