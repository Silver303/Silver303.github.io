// Store each record's title and cover color in a list.
let records = [
  { title: "Record One", color: "#e88a9a" },
  { title: "Record Two", color: "#80bcb0" },
  { title: "Record Three", color: "#b19ad4" },
  { title: "Record Four", color: "#f0c987" },
];

// Create the 1000-by-600 drawing canvas once when the sketch starts.
function setup() {
  // Put the canvas inside the matching container in index.html.
  const canvas = createCanvas(1000, 600);
  canvas.parent("sketch-holder");
}

// p5.js calls draw repeatedly to display and refresh the scene.
function draw() {
  // Clear the previous frame with a dark background.
  background("#0b0026");

  // THE SHELF: Draws the shelf underneath the record covers.
  fill("#383838");
  rect(50, 500, 900, 20);

  // Three record covers
  fill("#2a2a2a");
  rect(60, 350, 140, 140);
  rect(100, 350, 140, 140);
  rect(140, 350, 140, 140);
  rect(180, 350, 140, 140);
  rect(220, 350, 140, 140);
  rect(260, 350, 140, 140);
  rect(300, 350, 140, 140);
  rect(340, 350, 140, 140);
  rect(380, 350, 140, 140);
  rect(420, 350, 140, 140);
  rect(460, 350, 140, 140);
  rect(500, 350, 140, 140);
  rect(540, 350, 140, 140);
  rect(580, 350, 140, 140);
  rect(620, 350, 140, 140);
  rect(660, 350, 140, 140);
}
