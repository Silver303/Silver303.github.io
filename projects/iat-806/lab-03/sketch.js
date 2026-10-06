// This creates an empty array. An array is a list. We will put the dance images in this list after loading them.
let frames = [];

// These are  variables. They store example values, which we can change later in the program.
let numFrames = 8;

// create something called afroozX and store the number 500 in it. This is the horizontal position of the dancing character.
// create something called afroozY and store the number 100 in it. This is the vertical position of the dancing character.
let afroozX = 500;
let afroozY = 100;
let isMoving = false;
let currentFrame = 0;

//this variable is defined to later hold the sound file.
let song;

// setup() runs once when the sketch starts.
// asysnc is used to allow the use of await inside this function.
//  e.g., await loadImage() and await loadSound() are used to load the images and sound file, before continuing with the rest of the code.
async function setup() {
  // Make an 800-by-800 pixel drawing area.
  createCanvas(800, 800);

  // "for" loop means to repeat something a certain number of times. In this case, it repeats 8 times, once for each image.
  // Load each image file and wait for it to finish before continuing.
  // The image paths are relative to this sketch's index.html file.
  // start at 0, keep going while i is less than 8, and add 1 to i each time through the loop.
  // using the loop number to construct file names. This technique is called "string concatenation" and it is used to create a string (text) from other strings and numbers instead of listing them individually.

  for (let i = 0; i < numFrames; i++) {
    frames[i] = await loadImage("images/dance" + i + ".png");
  }

  //defined it at the top with no variable in it, but now we are assigning it a value, which is the sound file.
  // The await keyword is used to wait for the sound file to finish loading before continuing with the rest of the code.
  song = await loadSound("audio/billiejean.mp3");
  console.log(frames);
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
  let speed = 4;

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

  if (isMoving) {
    // Move left.
    afroozX = afroozX - 2;

    // Change the animation frame.
    let speed = 4;
    let slowFrame = floor(frameCount / speed);
    currentFrame = slowFrame % frames.length;

    if (afroozX < -frames[currentFrame].width) {
      afroozX = width;
    }
  }

  image(frames[currentFrame], afroozX, afroozY);
}

function mousePressed() {
  isMoving = !isMoving;
  if (isMoving) {
    song.play();
  } else {
    song.pause();
  }
}
