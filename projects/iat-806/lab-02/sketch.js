// Declare the ball's starting horizontal position.
let circleX = 150;

// Declare the ball's starting vertical position.
let circleY = 150;

// Set the ball's horizontal movement speed.
let speedX = 4;

// Set the ball's vertical movement speed.
let speedY = 4;

// Set the ball's starting diameter.
let size = 100;

// Set how quickly the ball changes size in each frame.
let sizeIncrement = 1;

// Calculate the ball's radius from its diameter.
let radius = size / 2;

// Declare the ball's starting color.
let red = 255;
let green = 120;
let blue = 60;

// Run this function once when the sketch starts.
function setup() {
  // Create an 800-pixel-wide by 600-pixel-tall canvas.
  let canvas = createCanvas(800, 600);
  canvas.parent("sketch-holder");

  // noStroke() means that shapes drawn after this command will not have an outline.
  noStroke();
}

// Draw is the animation. Draw happens repeatedly.
// Run this function repeatedly to animate the sketch.
function draw() {
  // Paint the background a dark gray color.
  // The background is drawn first, so it appears behind everything else.
  //circle leaves a translucent trail because the background is not drawn in every frame.
  background(20, 30);

  // Set the ball's fill color to orange.
  fill(red, green, blue);

  // Draw the ball at its current X, Yposition and size.
  circle(circleX, circleY, size);

  // Move the ball horizontally by its horizontal speed.
  circleX = circleX + speedX;

  // Move the ball vertically by its vertical speed.
  circleY = circleY + speedY;

  // Check whether the ball has reached the left or right edge.
  if (circleX >= width - radius || circleX < radius) {
    // Reverse horizontal direction when the ball reaches an edge.
    speedX = speedX * -1;
  }
  // Check whether the ball has reached the top or bottom edge.
  if (circleY >= height - radius || circleY < radius) {
    // Reverse vertical direction when the ball reaches an edge.
    speedY = speedY * -1;

    //change the color of the ball when it hits the top or bottom edge
    red = random(255);
    green = random(255);
    blue = random(255);
  }

  // Increase or decrease the ball's diameter.
  size = size + sizeIncrement;

  // Recalculate the radius after the size changes.
  radius = size / 2;

  // Check whether the ball has reached the left or right edge.
  if (circleX >= width - radius || circleX < radius) {
    // Reverse the size change so the ball starts shrinking.
    sizeIncrement = sizeIncrement * -1;

    //change the color of the ball when it hits the left or right edge
    red = random(255);
    green = random(255);
    blue = random(255);
  }
}

// Run this function whenever the mouse is clicked.
function mousePressed() {
  // Move the ball to the left edge of the canvas.
  red = random(255);
  green = random(255);
  blue = random(255);
}
