let myBall;

function setup() {
  createCanvas(600, 600);
  myBall = new Ball();
  myBall2 = new Ball();
}

function draw() {
  background(20);
  myBall.show();
  myBall.move();
}
// the attributes of the class: Ball, go here.
class Ball {
  constructor() {
    this.x = 400;
    this.y = 500;
    this.color = color(120, 130, 150);
    this.r = 20;
  }

  move() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }
  // method - a thing a ball can do. Functions that are defined for a class. Show =  draw itself.
  show() {
    fill(120, 130, 150);
    circle(this.x, this.y, 20);
  }
}
