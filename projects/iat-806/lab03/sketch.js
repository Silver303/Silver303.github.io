// An array is a list. We will put the dance images in this list after loading them.
let frames = [];

// These are practice variables. They store example values, but the animation does not use them yet.
let myAge = 10;
let myName = "Afrooz";
let myStudentsAges = [];
let numFrames = 8;

// setup() runs once when the sketch starts.
async function setup() {
  // Make an 800-by-800 pixel drawing area.
  createCanvas(800, 800);

  for (let i = 0; i < numFrames; i++) {
    // Load each image file and wait for it to finish before continuing.
    // The image paths are relative to this sketch's index.html file.
    frames[i] = await loadImage("images/dance" + i + ".png");
  }

  // Load the image files and wait for each one to finish before continuing.
  // The image paths are relative to this sketch's index.html file.
  //frames[0] = await loadImage("images/dance0.png");
  //frames[1] = await loadImage("images/dance1.png");
  //frames[2] = await loadImage("images/dance2.png");
  //frames[3] = await loadImage("images/dance3.png");
  //frames[4] = await loadImage("images/dance4.png");
  //frames[5] = await loadImage("images/dance5.png");
  //frames[6] = await loadImage("images/dance6.png");
  //frames[7] = await loadImage("images/dance7.png");

  // Print the loaded images in the browser console; useful for checking that loading worked.
  console.log(frames);

  // noLoop() would stop draw() from repeating. It is commented out, so the animation keeps running.
  // noLoop();
}

// draw() repeats continuously after setup(), usually around 60 times per second.
function draw() {
  // Clear the previous drawing by painting the whole canvas black.
  background(0);

  // Set the fill color for shapes or text drawn next. It does not change image colors.
  fill(140);

  // Show every loaded image as a small preview along the top of the canvas.
  for (let i = 0; i < frames.length; i++) {
    // Place each preview 100 pixels farther right than the previous one.
    let xPosition = i * 100;

    // Draw this image at its calculated position and resize it to 100 by 125 pixels.
    image(frames[i], xPosition, 20, 100, 125);
  }

  // Set the fill color to black for any text or shapes drawn after this point.
  fill("black");

  // Choose how many draw() repetitions each animation image stays on screen.
  let speed = 3;

  // Divide the total number of draw() repetitions into groups of 10.
  let slowFrame = floor(frameCount / speed);

  // The remainder selects a frame number from 0 through the last loaded frame.
  // Using frames.length makes the animation loop through all loaded images.
  let index = slowFrame % frames.length;

  // These commented-out lines are optional debugging tools. Uncomment them to see values on the canvas or in the console.
  // text(frameCount, 500, 60);
  // text(floor(frameCount / speed), 500, 80);
  // text(index, 500, 120);
  // text(index == 0, 500, 140);
  // console.log(index);

  // Draw the selected image at (100, 100). The background() call above clears the previous one first.
  image(frames[index], 100, 100);
}
