// This sketch combines a few key JavaScript and p5.js ideas:
// - arrays store multiple animation frames and related data
// - variables hold state like names, counts, and animation timing
// - loops draw repeating patterns and create the background grid
// - async setup loads image assets before the animation starts
// - functions reuse logic for animating and resizing image frames

let frames = []; // stores the images used for the dance animation
let myAge = 10; // a simple example variable for age-related data
let myName = "Afrooz Ghadimi"; // stores the artist's name as a string
let myStudentsAges = []; // tracks a list of student ages, if needed later
let numFrames = 8; // total number of frames in the animation sequence
let speed = 10; // controls how quickly the animation changes frames

let firstName = "Afrooz"; // first part of a name
let lastName = "Ghadimi"; // last part of a name

let fullName = firstName + " " + lastName; // combines two strings into a full name

let numCols = 8; // number of columns in the background grid
let numRows = 6; // number of rows in the background grid
let colWidth; // width of one grid column, calculated in setup

// setup() creates the canvas and prepares the animation frames.
// p5.js runs this once before the sketch starts drawing.
async function setup() {
  createCanvas(800, 800);

  colWidth = width / numCols;

  // load the frames of the dancing animation into the frames array
  // each image is stored in order so the animation can cycle through them
  for (let i = 0; i < numFrames; i++) {
    // let fileName = `dance_frames/dance${i}.png`;
    let fileName = "dance_frames/dance" + i + ".png";

    frames.push(await loadImage(fileName));
  }
}

// draw() is called on every frame and updates the whole sketch scene.
// It paints the background, creates the grid pattern, and calls the animation helper.
function draw() {
  background("blue");

  // Draw a repeating grid of colored rectangles.
  // The nested loop creates a 2D pattern across the canvas.
  for (let i = 0; i < numCols; i++) {
    for (let j = 0; j < numRows; j++) fill(40, 0, random(100, 255));
    rect(i * colWidth, 0, colWidth, height);
  }

  // The animation is played at different speeds and positions across the canvas.
  // Each call to animate() uses the same frame sequence but changes timing and placement.
  let speed = 10;
  //let slowFrame = floor(frameCount / speed);
  //let index = slowFrame % frames.length;
  //text(index, 500, 160);
  //image(frames[index], 100, 100);
  animate(frames, 3, 50, 400, 250, 350);
  animate(frames, 5, 200, 300, 250, 450);
  animate(frames, speed, 350, 250, 250);
  animate(frames, 12, 500, 50, 250);
}

// animate() displays one frame from the image sequence at a given location.
// It also scales the image to fit the chosen width/height while preserving aspect ratio.
function animate(frames, speed, xPosition, yPosition, imageWidth, imageHeight) {
  //let slowFrame = Math.floor(frameCount / speed);
  //let index = slowFrame % frames.length;
  let index = getFrameIndex(speed);
  let currentFrame = frames[index];

  // get the original width and height of the image
  let origWidth = currentFrame.width;
  let origHeight = currentFrame.height;
  let aspectRatio = origWidth / origHeight;

  // write the original width and height of the image to the canvas for debugging purposes
  text(origWidth + " " + origHeight, 500, 100);

  // if no imageWidth or imageHeight is provided, then use the original width and height of the image
  if (imageWidth && !imageHeight) {
    let scale = imageWidth / origWidth;
    imageHeight = scale * origHeight;
  }
  // if no imageWidth is provided, but imageHeight is provided, then calculate the imageWidth based on the aspect ratio of the original image
  if (imageHeight && !imageWidth) {
    let scale = imageHeight / origHeight;
    imageWidth = scale * origWidth;
  }

  image(currentFrame, xPosition, yPosition, imageWidth, imageHeight);
}

// getFrameIndex() calculates which frame should appear based on the animation speed.
// It uses frameCount and the speed value to loop through the array continuously.
function getFrameIndex(speed) {
  let slowFrame = Math.floor(frameCount / speed);
  let index = slowFrame % frames.length;
  return index;
}
