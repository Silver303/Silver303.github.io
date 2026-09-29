let cover1;
let cover2;
let cover3;

let isPlaying = false;
let vinylSize = 0;
let spinAngle = 0;

async function setup() {
  const canvas = createCanvas(1000, 600);
  canvas.parent("sketch-holder");

  cover1 = await loadImage("images/KendrickLamar_GoodKidMaadCity.jpg");
  cover2 = await loadImage("images/Nas_Illmatic.jpg");
  cover3 = await loadImage("images/PinkFloyd_Animals.jpg");
}

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
  image(cover1, 60, 350, 140, 140);
  image(cover2, 100, 350, 140, 140);
  image(cover3, 140, 350, 140, 140);
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
