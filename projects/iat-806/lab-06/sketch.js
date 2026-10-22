let balls = [];

let numBalls = 500;

function setup() {
  const canvas = createCanvas(600, 600);

  for (let i = 0; i < numBalls; i++) {
    let ball = createRandomBall();
    balls.push(ball);
  }
}

function draw() {
  background(10);

  for (let ball of balls) {
    let byHowMuch = 1;
    ball.update(byHowMuch);
    ball.update(2);
    let active = ball.contains(mouseX, mouseY);
    ball.respond(active);
  }
}

function mousePressed() {
  balls.forEach((ball) => {
    if (ball.contains(mouseX, mouseY)) {
      ball.highlight();
      console.log("Click is inside the ball");
    }
  });
}
