// KardunTurtle — give the turtle instructions and watch it draw.
//
// Everything you need to change is in this file.

let turtle;

async function setup() {
  createCanvas(800, 600);

  // The turtle's face. Drop any image into this folder and point at it here —
  // it gets scaled and cropped into a circle, so anything roughly square works.
  const face = await loadImage("turtle.jpg");

  // Make a turtle near the bottom left, facing up.
  turtle = new KardunTurtle(30, 420, face);

  giveInstructions();
  turtle.setSpeed(13);
  turtle.forward(300);

  turtle.right(90);
  turtle.forward(300);

  turtle.right(90);
  turtle.forward(300);

  turtle.right(90);
  turtle.forward(280);

  turtle.right(90);
  turtle.penColor("#b021dc");
  turtle.forward(280);

  turtle.right(90);
  turtle.penColor("#b021dc");
  turtle.forward(260);

  turtle.right(90);
  turtle.penColor("#b021dc");
  turtle.forward(260);

  turtle.right(90);
  turtle.penColor("#b021dc");
  turtle.forward(240);

  turtle.right(90);
  turtle.penColor("#dc212a");
  turtle.forward(240);

  turtle.right(90);
  turtle.penColor("#dc212a");
  turtle.forward(220);

  turtle.right(90);
  turtle.penColor("#dc212a");
  turtle.forward(220);

  turtle.right(90);
  turtle.penColor("#dc212a");
  turtle.forward(200);

  turtle.right(90);
  turtle.penColor("#dc7f21");
  turtle.forward(200);

  turtle.right(90);
  turtle.penColor("#dc7f21");
  turtle.forward(180);

  turtle.right(90);
  turtle.penColor("#dc7f21");
  turtle.forward(180);

  turtle.right(90);
  turtle.penColor("#dc7f21");
  turtle.forward(160);

  turtle.right(90);
  turtle.penColor("#ecd909");
  turtle.forward(160);

  turtle.right(90);
  turtle.penColor("#ecd909");
  turtle.forward(140);

  turtle.right(90);
  turtle.penColor("#ecd909");
  turtle.forward(140);

  turtle.right(90);
  turtle.penColor("#ecd909");
  turtle.forward(120);

  turtle.right(90);
  turtle.penColor("#6bec09");
  turtle.forward(120);

  turtle.right(90);
  turtle.penColor("#6bec09");
  turtle.forward(100);

  turtle.right(90);
  turtle.penColor("#6bec09");
  turtle.forward(100);

  turtle.right(90);
  turtle.penColor("#6bec09");
  turtle.forward(80);

  turtle.right(90);
  turtle.penColor("#09ecbb");
  turtle.forward(80);

  turtle.right(90);
  turtle.penColor("#09ecbb");
  turtle.forward(60);

  turtle.right(90);
  turtle.penColor("#09ecbb");
  turtle.forward(60);

  turtle.right(90);
  turtle.penColor("#09ecbb");
  turtle.forward(40);

  turtle.right(90);
  turtle.penColor("#0973ec");
  turtle.forward(40);

  turtle.right(90);
  turtle.penColor("#0973ec");
  turtle.forward(20);

  //second square spiral
  turtle.right(90);
  turtle.penColor("#0973ec");
  turtle.forward(300);
  turtle.left(90);
  turtle.penColor("#0973ec");
  turtle.forward(300);

  turtle.left(90);
  turtle.penColor("#0973ec");
  turtle.forward(450);

  turtle.right(90);
  turtle.penColor("#0973ec");
  turtle.forward(20);

  turtle.right(90);
  turtle.penColor("#0973ec");
  turtle.forward(450);

  turtle.left(90);
  turtle.penColor("#09b3ec");
  turtle.forward(20);

  turtle.left(90);
  turtle.penColor("#09b3ec");
  turtle.forward(440);

  turtle.right(90);
  turtle.penColor("#09b3ec");
  turtle.forward(20);

  turtle.right(90);
  turtle.penColor("#09b3ec");
  turtle.forward(430);

  turtle.left(90);
  turtle.penColor("#09ec64");
  turtle.forward(20);

  turtle.left(90);
  turtle.penColor("#09ec64");
  turtle.forward(420);

  turtle.right(90);
  turtle.penColor("#09ec64");
  turtle.forward(20);

  turtle.right(90);
  turtle.penColor("#09ec64");
  turtle.forward(410);

  turtle.left(90);
  turtle.penColor("#b3ec09");
  turtle.forward(20);

  turtle.left(90);
  turtle.penColor("#b3ec09");
  turtle.forward(400);

  turtle.right(90);
  turtle.penColor("#b3ec09");
  turtle.forward(20);

  turtle.right(90);
  turtle.penColor("#b3ec09");
  turtle.forward(390);

  turtle.left(90);
  turtle.penColor("#e1ec09");
  turtle.forward(20);

  turtle.left(90);
  turtle.penColor("#e1ec09");
  turtle.forward(380);

  turtle.right(90);
  turtle.penColor("#e1ec09");
  turtle.forward(20);

  turtle.right(90);
  turtle.penColor("#e1ec09");
  turtle.forward(370);

  turtle.left(90);
  turtle.penColor("#ec9109");
  turtle.forward(20);

  turtle.left(90);
  turtle.penColor("#ec9109");
  turtle.forward(360);

  turtle.right(90);
  turtle.penColor("#ec9109");
  turtle.forward(20);

  turtle.right(90);
  turtle.penColor("#ec9109");
  turtle.forward(350);

  turtle.left(90);
  turtle.penColor("#ec5809");
  turtle.forward(20);

  turtle.left(90);
  turtle.penColor("#ec5809");
  turtle.forward(340);

  turtle.right(90);
  turtle.penColor("#ec5809");
  turtle.forward(20);

  turtle.right(90);
  turtle.penColor("#ec5809");
  turtle.forward(330);

  turtle.left(90);
  turtle.penColor("#ec0909");
  turtle.forward(20);

  turtle.left(90);
  turtle.penColor("#ec0909");
  turtle.forward(320);

  turtle.right(90);
  turtle.penColor("#ec0909");
  turtle.forward(20);

  turtle.right(90);
  turtle.penColor("#ec0909");
  turtle.forward(310);
}

// ---------------------------------------------------------------
// YOUR INSTRUCTIONS GO HERE
// ---------------------------------------------------------------

function giveInstructions() {
  turtle.penColor("#7221dc");
  turtle.penWidth(4);

  // Press a face onto the canvas, so we can see where we started.
  turtle.stamp();
}

function draw() {
  background("#14161a");
  turtle.update(); // runs the next bit of the instructions and draws everything
}

// Press R to start over.
function keyPressed() {
  if (key === "r" || key === "R") {
    turtle.reset();
    giveInstructions();
  }
}

// ---------------------------------------------------------------
// Everything the turtle understands
// ---------------------------------------------------------------
//
//   turtle.forward(100)        walk forward, drawing if the pen is down
//   turtle.backward(100)       walk backward
//   turtle.right(90)           turn clockwise, in degrees
//   turtle.left(90)            turn counter-clockwise
//
//   turtle.penUp()             stop drawing
//   turtle.penDown()           start drawing again
//   turtle.penColor("red")     any p5 color
//   turtle.penWidth(8)         line thickness
//
//   turtle.goTo(100, 200)      jump to a point
//   turtle.setHeading(0)       0 = right, 90 = down, -90 = up
//   turtle.home()              back to the start, facing up
//   turtle.stamp()             print the turtle's face onto the drawing
//   turtle.erase()             wipe the drawing, keep the turtle
//   turtle.repeat(4, fn)       do a set of instructions n times
//
//   turtle.setSpeed(4)         pixels per frame — bigger is faster
//   turtle.instant()           no animation, draw it all at once
//   turtle.setSize(80)         how big the turtle is drawn
//   turtle.hide() / .show()    show or hide the turtle itself
//   turtle.reset()             clear everything
