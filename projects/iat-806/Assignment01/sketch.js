// creates a variable to hold an album image.
let cover1;
let cover2;
let cover3;
let cover4;
let cover5;

let selectedRecord = 1;

// setup() runs once when the sketch starts.
// async allows us to use await while loading images.
async function setup() {
  const canvas = createCanvas(1000, 600);
  canvas.parent("sketch-holder");

  // Wait for each image to load before continuing.
  cover1 = await loadImage("images/KendrickLamar_GoodKidMaadCity.jpg");
  cover2 = await loadImage("images/Nas_Illmatic.jpg");
  cover3 = await loadImage("images/PinkFloyd_Animals.jpg");
  cover4 = await loadImage("images/ATribeCalledQuest_TheAnthology.jpg");
  cover5 = await loadImage("images/JeffMills_TheBells.jpg");
}

// draw() runs repeatedly to display the scene.
function draw() {
  background("#0b0026");
  noStroke();

  // Draw the shelf.
  fill("#383838");
  rect(50, 500, 900, 20);

  // Draw the album covers above the shelf and lift the cover if the mouse hovers over it. && means and: all four comparisons must be true.

  // Kendrick
  if (mouseX >= 60 && mouseX <= 200 && mouseY >= 300 && mouseY <= 490) {
    image(cover1, 60, 300, 140, 140);
  } else {
    image(cover1, 60, 350, 140, 140);
  }

  // Nas
  if (mouseX >= 230 && mouseX <= 370 && mouseY >= 300 && mouseY <= 490) {
    image(cover2, 230, 300, 140, 140);
  } else {
    image(cover2, 230, 350, 140, 140);
  }

  // Pink Floyd
  if (mouseX >= 400 && mouseX <= 540 && mouseY >= 300 && mouseY <= 490) {
    image(cover3, 400, 300, 140, 140);
  } else {
    image(cover3, 400, 350, 140, 140);
  }

  // ATCQ
  if (mouseX >= 570 && mouseX <= 680 && mouseY >= 300 && mouseY <= 490) {
    image(cover4, 570, 300, 140, 140);
  } else {
    image(cover4, 570, 350, 140, 140);
  }

  // Jeff Mills
  if (mouseX >= 740 && mouseX <= 880 && mouseY >= 300 && mouseY <= 490) {
    image(cover5, 740, 300, 140, 140);
  } else {
    image(cover5, 740, 350, 140, 140);
  }
}
