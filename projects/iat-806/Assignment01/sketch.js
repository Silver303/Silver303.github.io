// Variables that will hold the three album images.
let cover1;
let cover2;
let cover3;

// setup() runs once when the sketch starts.
// async allows us to use await while loading images.
async function setup() {
  const canvas = createCanvas(1000, 600);
  canvas.parent("sketch-holder");

  // Wait for each image to load before continuing.
  cover1 = await loadImage("images/KendrickLamar_GoodKidMaadCity.jpg");
  cover2 = await loadImage("images/Nas_Illmatic.jpg");
  cover3 = await loadImage("images/PinkFloyd_Animals.jpg");
}

// draw() runs repeatedly to display the scene.
function draw() {
  background("#0b0026");
  noStroke();

  // Draw the shelf.
  fill("#383838");
  rect(50, 500, 900, 20);

  // Draw the album covers above the shelf.
  image(cover1, 60, 350, 140, 140);
  image(cover2, 230, 350, 140, 140);
  image(cover3, 400, 350, 140, 140);
}
