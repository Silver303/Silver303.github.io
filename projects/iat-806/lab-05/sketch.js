// An array (list) that will hold all the Ball objects.
let balls = [];
// The number of balls to create in setup().
let numberOfBalls = 500;

// p5.js calls setup() once when the sketch starts.
function setup() {
  // Create a 600-by-600 pixel drawing area.
  createCanvas(600, 600);

  // Repeat the loop once for each ball.
  for (let i = 0; i < numberOfBalls; i++) {
    // Start every ball at the center of the canvas.
    let ballX = 300;
    let ballY = 300;
    // Turn off outlines for shapes drawn after this call.
    noStroke();
    // Create a color with random red, green, blue, and transparency values.
    // random(0) is always 0, so the green component is currently fixed at 0.
    let ballColor = color(random(100), random(0), random(255), random(100));
    // Set the ball's diameter in pixels.
    let ballR = 25;
    // Create one Ball object, passing its position, color, and diameter.
    const ball = new Ball(ballX, ballY, ballColor, ballR);
    // Add this Ball object to the balls array.
    balls.push(ball);
  }
}

// p5.js calls draw() repeatedly to animate the sketch.
function draw() {
  // Clear the previous frame with a black background.
  background(0);
  // Visit each Ball object in the array.
  for (let ball of balls) {
    // Move the ball by a random amount of up to 5 pixels on each axis.
    ball.move(random(0, 5));
    // Draw the ball at its current position.
    ball.show();
  }
}

// A class is a template for creating objects with their own data and behavior.
class Ball {
  // The constructor runs when new Ball(...) creates a ball.
  // x and y are its position; c is its color; r is its diameter.
  constructor(x, y, c, r) {
    // `this` refers to the particular Ball object being created.
    this.x = x;
    this.y = y;
    this.color = c;
    this.r = r;
  }

  // Change the ball's position by a random amount in either direction.
  // byHowMuch controls the maximum movement on each axis.
  move(byHowMuch) {
    this.x += random(-byHowMuch, byHowMuch);
    this.y += random(-byHowMuch, byHowMuch);
  }

  // A method is a function belonging to a class; this one draws the ball.
  show() {
    // Use this ball's stored color.
    fill(this.color);
    // Draw a circle at this ball's position with its stored diameter.
    circle(this.x, this.y, this.r);
  }
}
