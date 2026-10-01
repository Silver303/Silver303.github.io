// Creates an empty array called danceFrames.
// An array is like one container that can hold all 8 images.
let danceFrames = [];

// Keeps track of which image/frame should currently be shown.
// We start at 0 because arrays in JavaScript start counting at 0.
let currentFrame = 0;

// preload() runs before setup().
// It is useful for loading images, sounds, or other files before the sketch begins.
function preload() {
  // Loads frame_01.svg from the images folder
  // and stores it in position 0 of the danceFrames array.
  danceFrames[0] = loadImage("images/frame_01.svg");

  // Stores the second image in position 1.
  danceFrames[1] = loadImage("images/frame_02.svg");

  // Stores the third image in position 2.
  danceFrames[2] = loadImage("images/frame_03.svg");

  // Stores the fourth image in position 3.
  danceFrames[3] = loadImage("images/frame_04.svg");

  // Stores the fifth image in position 4.
  danceFrames[4] = loadImage("images/frame_05.svg");

  // Stores the sixth image in position 5.
  danceFrames[5] = loadImage("images/frame_06.svg");

  // Stores the seventh image in position 6.
  danceFrames[6] = loadImage("images/frame_07.svg");

  // Stores the eighth image in position 7.
  danceFrames[7] = loadImage("images/frame_08.svg");
}

// setup() runs once when the sketch starts.
function setup() {
  // Creates an 800 pixel wide by 800 pixel tall canvas.
  // We store it inside a variable called canvas so we can refer to it later.
  let canvas = createCanvas(800, 800);

  // Places the p5 canvas inside the HTML element
  // whose id is "sketch-holder".
  canvas.parent("sketch-holder");

  // Tells p5 to run draw() 8 times per second.
  // Since we change to a new image each time draw() runs,
  // this means the animation plays at 8 frames per second.
  frameRate(8);
}

// draw() runs repeatedly.
// Normally it loops forever while the sketch is open.
function draw() {
  // Paints the canvas black at the beginning of every frame.
  // This clears away the previous image before drawing the next one.
  background("black");

  // Draws ONE image from the danceFrames array.
  //
  // currentFrame tells JavaScript which image to choose.
  //
  // For example:
  // currentFrame = 0 means danceFrames[0]
  // currentFrame = 1 means danceFrames[1]
  //
  // 0, 0 means draw the image starting at the top-left corner.
  // 800, 800 means make the image 800 pixels wide and 800 pixels tall.
  image(danceFrames[currentFrame], 0, 0, 800, 800);
  currentFrame = (currentFrame + 1) % danceFrames.length;
}
