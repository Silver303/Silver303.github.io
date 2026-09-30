// creates a variable to hold an album image.
let cover1;
let cover2;
let cover3;
let cover4;
let cover5;

let selectedRecord = 0;

let Jimothy;

//assign Jimothy's starting position and direction.
let JimothyX = 60;
let JimothyY = 200;
let targetX = 60; //his destination
let facingRight = true;

//whether the vinyl is playing, how large it is, and its rotation.
let isPlaying = false;
let vinylSize = 0;
let spinAngle = 0;

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

  //load Jimothy
  Jimothy = await loadImage("images/Jimothy.png");
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
  if (mouseX >= 570 && mouseX <= 710 && mouseY >= 300 && mouseY <= 490) {
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

  // Still inside draw(): move him every frame. When he stops, facingRight keeps its last value.
  if (JimothyX < targetX) {
    facingRight = true;
    JimothyX = JimothyX + 2;

    if (JimothyX > targetX) {
      JimothyX = targetX;
    }
  } else if (JimothyX > targetX) {
    facingRight = false;
    JimothyX = JimothyX - 2;

    if (JimothyX < targetX) {
      JimothyX = targetX;
    }
  }

  // Jimothy changes direction depending on whether the album is to his right or not.
  push(); //keep these changes from affecting the albums.
  translate(JimothyX + 60, JimothyY); //translate() moves the drawing origin to Jimothy’s horizontal centre.

  if (facingRight === false) {
    scale(-1, 1); //scale(-1, 1) mirrors the drawing horizontally.
  }

  image(Jimothy, -60, 0, 120, 120); //places half of his 120-pixel width on either side of that centre.
  pop(); //keep these changes from affecting the albums.
} // draw() ends here

function mousePressed() {
  // Click Kendrick.
  if (mouseX >= 60 && mouseX <= 200 && mouseY >= 300 && mouseY <= 490) {
    targetX = 60;
    selectedRecord = 1;
  }

  // Click Nas.
  else if (mouseX >= 230 && mouseX <= 370 && mouseY >= 300 && mouseY <= 490) {
    targetX = 230;
    selectedRecord = 2;
  }

  // Click Pink Floyd.
  else if (mouseX >= 400 && mouseX <= 540 && mouseY >= 300 && mouseY <= 490) {
    targetX = 400;
    selectedRecord = 3;
  }

  // Click ATCQ.
  else if (mouseX >= 570 && mouseX <= 710 && mouseY >= 300 && mouseY <= 490) {
    targetX = 570;
    selectedRecord = 4;
  }

  // Click Jeff Mills.
  else if (mouseX >= 740 && mouseX <= 880 && mouseY >= 300 && mouseY <= 490) {
    targetX = 740;
    selectedRecord = 5;
  }
}

function keyPressed() {
  if (key === " ") {
    // Play only after an album is clicked and Jimothy arrives.
    if (selectedRecord > 0 && JimothyX === targetX) {
      isPlaying = true;
      vinylSize = 0;
      spinAngle = 0;
    }

    return false; // Prevent Space from scrolling the page.
  }
}
