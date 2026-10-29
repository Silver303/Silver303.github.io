let balls = [];

function setup() {
  createCanvas(640, 480);

  for (let i = 0; i < 30; i++) {
    balls.push(
      new Ball(
        random(width),
        random(height),
        color(100, 0, 100),
        random(10, 30)
      )
    );
  }
}

function draw() {
  background("black");
  for (const ball of balls) {
    ball.update(0.5);
  }
}
