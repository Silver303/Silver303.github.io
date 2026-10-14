// --------------------------------------------------
// ARRAYS
// Items in these lists must stay in the same order.
// --------------------------------------------------

let covers = [];
let songs = [];

let coverFiles = [
  "images/WuTang_36Chambers.jpeg",
  "images/Nas_Illmatic.jpg",
  "images/PinkFloyd_Animals.jpg",
  "images/ATribeCalledQuest_TheAnthology.jpg",
  "images/JeffMills_TheBells.jpg",
];

let songFiles = [
  "audio/wutang.mp3",
  "audio/nas.mp3",
  "audio/pinkfloyd.mp3",
  "audio/atcq.mp3",
  "audio/jeffmills.mp3",
];

let songNames = [
  "Wu-Tang Clan - Protect Ya Neck",
  "Nas - NY State of Mind",
  "Pink Floyd - Dogs",
  "A Tribe Called Quest - Luck of Lucian",
  "Jeff Mills - The Bells",
];

// Horizontal position of each album.
let albumX = [60, 230, 400, 570, 740];

// --------------------------------------------------
// VARIABLES
// --------------------------------------------------

let Jimothy;
let JimothyX = 60;
let JimothyY = 200;
let targetX = 60;

// 0 means no album is selected.
// 1 through 5 represent the shelf albums.
let selectedRecord = 0;

let currentSong = null;
let nowPlaying = "";

let isPlaying = false;
let isPaused = false;

let vinylSize = 0;
let spinAngle = 0;

// --------------------------------------------------
// SETUP: RUNS ONCE
// --------------------------------------------------

async function setup() {
  const canvas = createCanvas(1000, 600);
  canvas.parent("sketch-holder");

  Jimothy = await loadImage("images/Jimothy.png");

  // Load matching images and audio using one loop.
  for (let i = 0; i < coverFiles.length; i++) {
    covers[i] = await loadImage(coverFiles[i]);
    songs[i] = new Audio(songFiles[i]);
  }
}

// --------------------------------------------------
// DRAW: RUNS REPEATEDLY
// --------------------------------------------------

function draw() {
  background("#0b0026");
  noStroke();

  // Jimothy's pick button.
  fill("#1f1f1f");
  rect(700, 60, 240, 60);

  fill("#8352ff");
  textFont("Figtree");
  textSize(22);
  textAlign(CENTER, CENTER);
  text("Jimothy's pick", 820, 90);

  // Shelf.
  fill("#1f1f1f");
  rect(50, 500, 900, 20);

  // A line along the shelf's top edge.
  stroke("#8352ff");
  strokeWeight(2);
  line(50, 500, 950, 500);
  noStroke();

  // Draw all five covers.
  for (let i = 0; i < covers.length; i++) {
    let x = albumX[i];

    // Raise the cover when the mouse is over it.
    if (mouseX >= x && mouseX <= x + 140 && mouseY >= 300 && mouseY <= 490) {
      image(covers[i], x, 300, 140, 140);
    } else {
      image(covers[i], x, 350, 140, 140);
    }
  }

  // Move Jimothy right.
  if (JimothyX < targetX) {
    JimothyX = JimothyX + 4;

    // Stop exactly at the destination.
    if (JimothyX > targetX) {
      JimothyX = targetX;
    }
  }

  // Move Jimothy left.
  else if (JimothyX > targetX) {
    JimothyX = JimothyX - 4;

    if (JimothyX < targetX) {
      JimothyX = targetX;
    }
  }

  // Draw him directly, without flipping his image.
  image(Jimothy, JimothyX, JimothyY, 120, 120);

  // Freeze the vinyl when the audio finishes.
  if (currentSong !== null) {
    if (currentSong.ended) {
      isPaused = true;
    }
  }

  if (isPlaying) {
    drawVinyl();
  }

  // Track name.
  fill("#8352ff");
  noStroke();
  textSize(18);
  textAlign(LEFT, CENTER);
  text(nowPlaying, 50, 555);
}

// --------------------------------------------------
// MOUSE INPUT
// --------------------------------------------------

function mousePressed() {
  // Clicking Jimothy's pick chooses a random shelf album.
  if (mouseX >= 700 && mouseX <= 940 && mouseY >= 60 && mouseY <= 120) {
    stopRecord();

    // Choose an index from 0 through 4.
    let randomIndex = floor(random(songs.length));

    targetX = albumX[randomIndex];
    selectedRecord = randomIndex + 1;

    return;
  }

  // Clicking a cover selects that album.
  for (let i = 0; i < covers.length; i++) {
    let x = albumX[i];

    if (mouseX >= x && mouseX <= x + 140 && mouseY >= 300 && mouseY <= 490) {
      stopRecord();

      targetX = x;
      selectedRecord = i + 1;

      return;
    }
  }
}

// --------------------------------------------------
// KEYBOARD INPUT
// --------------------------------------------------

function keyPressed() {
  if (key === " ") {
    // An album must be selected, and Jimothy must arrive.
    if (selectedRecord > 0 && JimothyX === targetX) {
      // Choose the audio only when starting a new record.
      if (currentSong === null) {
        currentSong = songs[selectedRecord - 1];

        nowPlaying = "Now Playing: " + songNames[selectedRecord - 1];

        vinylSize = 0;
        spinAngle = 0;
      }

      // Start or resume the track.
      currentSong.play().catch(function (error) {
        console.error("Could not play:", error);
      });

      isPlaying = true;
      isPaused = false;
    }

    // Prevent Space from scrolling the page.
    return false;
  }

  if (key === "p" || key === "P") {
    if (currentSong !== null) {
      currentSong.pause();
      isPaused = true;
    }
  }
}

// --------------------------------------------------
// OUR OWN DRAWING FUNCTION
// --------------------------------------------------

function drawVinyl() {
  if (isPaused === false) {
    // Grow until the disc is 100 pixels wide.
    if (vinylSize < 100) {
      vinylSize = vinylSize + 5;
    }

    spinAngle = spinAngle + 0.05;
  }

  // Centre the vinyl above Jimothy.
  let x = JimothyX + 60;
  let y = JimothyY - 60;

  // Black disc.
  noStroke();
  fill("#151515");
  circle(x, y, vinylSize);

  // Draw a curved groove.
  // arc(x, y, width, height, startAngle, endAngle)
  // PI describes half a turn in radians.
  // Changing both angles moves the groove around the disc.
  noFill();
  stroke("#777777");
  strokeWeight(2);

  arc(x, y, vinylSize * 0.8, vinylSize * 0.8, spinAngle, spinAngle + PI);

  // Centre label.
  noStroke();
  fill("#c9c9c9");
  circle(x, y, vinylSize / 3);

  // Centre hole.
  fill("#151515");
  circle(x, y, vinylSize / 15);
}

// --------------------------------------------------
// STOP THE PREVIOUS RECORD
// --------------------------------------------------

function stopRecord() {
  if (currentSong !== null) {
    currentSong.pause();
    currentSong.currentTime = 0;
  }

  currentSong = null;
  isPlaying = false;
  isPaused = false;
  nowPlaying = "";
}
