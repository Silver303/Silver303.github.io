// An array (list) that will hold all the Ball objects.
let balls = [];
// The number of balls to create in setup().
let numberOfBalls = 200;

// p5.js calls setup() once when the sketch starts.
function setup() {
  // Create a 600-by-600 pixel drawing area.
  createCanvas(600, 600);

  // Repeat the loop once for each ball.
  for (let i = 0; i < numberOfBalls; i++) {
    // Start every ball at the center of the canvas.
    let ballX = random(width);
    let ballY = random(height);
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
  // Mouse near the top = faster. Near the bottom = slower.
  let spinSpeed = map(mouseY, 0, height, 0.02, 0.002, true);

  for (let ball of balls) {
    ball.change(spinSpeed);
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
    this.angle = random(TWO_PI);
    this.spiralRadius = random(0, 250);

    // Give each ball a different starting point in its breathing cycle.
    this.offset = random(TWO_PI);

    // Give each ball its own breathing speed.
    this.breathSpeed = random(0.015, 0.04);
  }

  // Update this ball, then draw it.
  change(byHowMuch) {
    this.swirl(byHowMuch);
    this.pulse(10);
    this.changeColor(0.02);
    this.show();
  }

  // Change the ball's position by a random amount in either direction.
  // byHowMuch controls the maximum movement on each axis.
  move(byHowMuch) {
    this.x += random(-byHowMuch, byHowMuch);
    this.y += random(-byHowMuch, byHowMuch);
  }

  // Make this ball grow and shrink like it is breathing.
  pulse(amount) {
    this.r = 25 + amount * sin(frameCount * this.breathSpeed + this.offset);
  }

  // Slowly change this ball between purple and pink.
  changeColor(speed) {
    let purple = color(130, 60, 230, 100);
    let blue = color(0, 100, 255, 100);

    let blend = (sin(frameCount * speed) + 1) / 2;

    this.color = lerpColor(purple, blue, blend);
  }

  // Make this ball spiral outward and restart near the centre.
  swirl(speed) {
    // Turn a little farther around the centre.
    this.angle += speed;

    // Move a little farther away from the centre.
    this.spiralRadius += 0.3;

    // Restart at the centre when the ball reaches the outer edge.
    if (this.spiralRadius > 250) {
      this.spiralRadius = 0;
    }

    // Calculate the ball's position around the canvas centre.
    this.x = width / 2 + cos(this.angle) * this.spiralRadius;
    this.y = height / 2 + sin(this.angle) * this.spiralRadius;
  }

  // A method is a function belonging to a class; this one draws the ball.
  show() {
    // Use this ball's stored color.
    fill(this.color);
    // Draw a circle at this ball's position with its stored diameter.
    circle(this.x, this.y, this.r);
  }
}
