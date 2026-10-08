let frames = [];
let myAge = 10;
let myName = "Afrooz Ghadimi";
let myStudentsAges = [];
let numFrames = 8;
let speed = 10;

let firstName = "Afrooz";
let lastName = "Ghadimi";

let fullName = firstName + " " + lastName;

let numCols = 8;
let numRows = 6;
let colWidth;

async function setup() {
  createCanvas(800, 800);

  colWidth = width / numCols;

  // load the frames of the dancing animation into the frames array
  for (let i = 0; i < numFrames; i++) {
    // let fileName = `dance_frames/dance${i}.png`;
    let fileName = "dance_frames/dance" + i + ".png";

    frames.push(await loadImage(fileName));
  }
}

function draw() {
  background("blue");

  // Draw eight randomly flashing blue columns and rows
  for (let i = 0; i < numCols; i++) {
    for (let j = 0; j < numRows; j++) fill(40, 0, random(100, 255));
    rect(i * colWidth, 0, colWidth, height);
  }

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

// the below function is a version of the code above that is reusable and can be called from multiple places in the code

function getFrameIndex(speed) {
  let slowFrame = Math.floor(frameCount / speed);
  let index = slowFrame % frames.length;
  return index;
}
