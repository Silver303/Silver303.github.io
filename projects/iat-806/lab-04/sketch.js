let frames = [];
let myAge = 10;
let myName = "Alireza";
let myStudentsAges = [];
let numFrames = 8;

let firstName = "Afrooz";
let lastName = "Ghadimi";

let fullName = firstName + " " + lastName;

async function setup() {
  createCanvas(800, 420);

  for (let i = 0; i < numFrames; i++) {
    // let fileName = `dance_frames/dance${i}.png`;
    let fileName = "dance_frames/dance" + i + ".png";

    frames.push(await loadImage(fileName));
  }
}

function draw() {
  background(120);
  fill("black");
  text(fullName, 100, 100);

  let speed = 10;
  let slowFrame = floor(frameCount / speed);
  let index = slowFrame % frames.length;
  text(index, 500, 160);
  image(frames[index], 100, 100);
}
