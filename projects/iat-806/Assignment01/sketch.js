// JIMOTHY'S VINYL COLLECTION
// Arrays and loops replace the repeated code for five albums.
// Keep your existing HTML, images folder, and audio folder.

// --------------------------------------------------
// ALBUM ARRAYS
// --------------------------------------------------

// An array is a list. Its first item has index 0.
// Matching items in these arrays must stay in the same order.

let covers = []; // Loaded images will be stored here.

let coverFiles = [
  "images/WuTang_36Chambers.jpeg",
  "images/Nas_Illmatic.jpg",
  "images/PinkFloyd_Animals.jpg",
  "images/ATribeCalledQuest_TheAnthology.jpg",
  "images/JeffMills_TheBells.jpg",
];

// Each album's horizontal position.
let albumX = [60, 230, 400, 570, 740];

// These names match the order of the shelf audio files.
let songNames = [
  "Wu-Tang Clan - Protect Ya Neck",
  "Nas - NY State of Mind",
  "Pink Floyd - Dogs",
  "A Tribe Called Quest - Luck of Lucian",
  "Jeff Mills - The Bells",
];

// These names match the order of Jimothy's extra audio files.
let pickNames = [
  "Delano Smith - Survival",
  "1morning - Flow",
  "Hamatsuki - Doom Disco",
];

// --------------------------------------------------
// VARIABLES: INFORMATION THE PROGRAM REMEMBERS
// --------------------------------------------------

// 0 means no shelf album is selected.
// Numbers 1 through 5 represent the five shelf albums.
let selectedRecord = 0;

let Jimothy;

// Current position and destination are separate.
// Clicking changes the destination; draw() changes the position.
let JimothyX = 60;
let JimothyY = 200;
let targetX = 60;

// A boolean stores either true or false.
let facingRight = true;

// These variables control the vinyl's appearance.
let isPlaying = false;
let isPaused = false;
let vinylSize = 0;
let spinAngle = 0;

// These arrays will hold browser audio objects.
let songs = [];
let jimothyPicks = [];

// null means no current audio object.
let currentSong = null;

// An empty string displays no text.
let nowPlaying = "";

// Flying-image variables.
let songsPlayed = 0;
let flyingImage;
let flyX = -180;
let flyY = 100;
let flySpeed = 3;
let isFlying = false;

// --------------------------------------------------
// SETUP: RUNS ONCE
// --------------------------------------------------

// async allows us to use await.
// await waits for each image-loading operation to finish.
async function setup() {
  const canvas = createCanvas(1000, 600);

  // Place the canvas inside this element in the HTML.
  canvas.parent("sketch-holder");

  // Load all five covers using one loop.
  //
  // let i = 0: begin at the first index.
  // i < coverFiles.length: continue while i is within the list.
  // i++: increase i by one after each repetition.
  for (let i = 0; i < coverFiles.length; i++) {
    covers[i] = await loadImage(coverFiles[i]);
  }

  Jimothy = await loadImage("images/Jimothy.png");

  flyingImage = await loadImage("images/realdjsplayvinyl.png");

  // new Audio creates a browser audio player for each file.
  // It does not start playback here.
  songs = [
    new Audio("audio/wutang.mp3"),
    new Audio("audio/nas.mp3"),
    new Audio("audio/pinkfloyd.mp3"),
    new Audio("audio/atcq.mp3"),
    new Audio("audio/jeffmills.mp3"),
  ];

  jimothyPicks = [
    new Audio("audio/DelanoSmith_Survival_clip.mp3"),
    new Audio("audio/1morning_Flow_clip.mp3"),
    new Audio("audio/Hamatsuki_DoomDisco_clip.mp3"),
  ];
}

// --------------------------------------------------
// DRAW: RUNS REPEATEDLY TO CREATE ANIMATION
// --------------------------------------------------

function draw() {
  // Clear the previous frame before drawing the next one.
  background("#0b0026");
  noStroke();

  // Draw Jimothy's pick button.
  // push() saves drawing settings; pop() restores them.
  push();

  fill("#1f1f1f");

  // rect(x, y, width, height)
  rect(700, 60, 240, 60);

  fill("#8352ff");
  textFont("Figtree");
  textSize(22);
  textAlign(CENTER, CENTER);

  // The text is positioned at the button's centre.
  text("Jimothy's pick", 820, 90);

  pop();

  // Draw the shelf.
  fill("#1f1f1f");
  rect(50, 500, 900, 20);

  // Draw every album using one loop.
  for (let i = 0; i < covers.length; i++) {
    // Get this album's horizontal position.
    let x = albumX[i];

    // && means AND: all four comparisons must be true.
    // x + 140 is the album's right edge.
    if (mouseX >= x && mouseX <= x + 140 && mouseY >= 300 && mouseY <= 490) {
      // Hovered album: draw it higher.
      image(covers[i], x, 300, 140, 140);
    } else {
      // Otherwise, draw it at its resting position.
      image(covers[i], x, 350, 140, 140);
    }
  }

  // Move Jimothy toward his destination.
  if (JimothyX < targetX) {
    facingRight = true;

    // Increasing x moves him right.
    JimothyX = JimothyX + 4;

    // Correct his position if he passes the destination.
    if (JimothyX > targetX) {
      JimothyX = targetX;
    }
  } else if (JimothyX > targetX) {
    facingRight = false;

    // Decreasing x moves him left.
    JimothyX = JimothyX - 4;

    if (JimothyX < targetX) {
      JimothyX = targetX;
    }
  }

  // When JimothyX equals targetX, neither branch runs.
  // That makes him stop.

  // Draw Jimothy facing the appropriate direction.
  push();

  // Move the drawing origin to his horizontal centre.
  // His image is 120 pixels wide, so half is 60.
  translate(JimothyX + 60, JimothyY);

  if (facingRight === false) {
    // Mirror horizontally around the new origin.
    scale(-1, 1);
  }

  // Start 60 pixels left of the origin.
  image(Jimothy, -60, 0, 120, 120);

  // Restore the drawing settings and transformations.
  pop();

  // Keep the vinyl visible while a record is active.
  // Pausing freezes it but does not hide it.
  if (isPlaying) {
    drawVinyl();
  }

  // Display the track name.
  push();

  fill("#8352ff");
  textFont("Figtree");
  textSize(18);
  textAlign(LEFT, CENTER);
  text(nowPlaying, 50, 555);

  pop();

  // Draw the flying image last so it appears in front.
  drawFlyingImage();
}

// --------------------------------------------------
// MOUSE INPUT
// --------------------------------------------------

function mousePressed() {
  // Check the button's boundaries:
  // left = 700; right = 700 + 240 = 940
  // top = 60; bottom = 60 + 60 = 120
  if (mouseX >= 700 && mouseX <= 940 && mouseY >= 60 && mouseY <= 120) {
    stopRecord();

    // Stop Jimothy wherever he currently is.
    targetX = JimothyX;

    // This track is not linked to a shelf album.
    selectedRecord = 0;

    // random(3) produces a number from 0 up to, excluding, 3.
    // floor() rounds down, giving an index of 0, 1, or 2.
    let randomIndex = floor(random(jimothyPicks.length));

    // The same index selects matching audio and text.
    currentSong = jimothyPicks[randomIndex];
    nowPlaying = "Now Playing: " + pickNames[randomIndex];

    // Play the audio.
    // catch() reports a failed playback request.
    currentSong.play().catch(function (error) {
      console.error("Could not play:", error);
    });

    // Start the vinyl animation from the beginning.
    vinylSize = 0;
    spinAngle = 0;
    isPlaying = true;
    isPaused = false;

    countSongPlay();

    // Finish handling this click.
    return;
  }

  // Check all five albums using one loop.
  for (let i = 0; i < covers.length; i++) {
    let x = albumX[i];

    if (mouseX >= x && mouseX <= x + 140 && mouseY >= 300 && mouseY <= 490) {
      stopRecord();

      // Set the destination, not his current position.
      targetX = x;

      // Convert array index to album number.
      // Index 0 becomes album 1; index 1 becomes album 2.
      selectedRecord = i + 1;

      return;
    }
  }
}

// --------------------------------------------------
// KEYBOARD INPUT
// --------------------------------------------------

function keyPressed() {
  // === checks equality. " " represents a space.
  if (key === " ") {
    // Play if:
    // an album is selected AND Jimothy has arrived,
    // OR an existing song is available to resume.
    // || means OR.
    if ((selectedRecord > 0 && JimothyX === targetX) || currentSong !== null) {
      // Reset only when starting a new record.
      if (isPlaying === false) {
        vinylSize = 0;
        spinAngle = 0;
      }

      // Choose a shelf track only when no song is loaded.
      // This preserves Jimothy's random track when resuming.
      if (currentSong === null) {
        // Album numbers start at 1; array indices start at 0.
        currentSong = songs[selectedRecord - 1];

        nowPlaying = "Now Playing: " + songNames[selectedRecord - 1];

        // Count a new selection, not a pause/resume.
        countSongPlay();
      }

      currentSong.play().catch(function (error) {
        console.error("Could not play:", error);
      });

      isPlaying = true;
      isPaused = false;
    }

    // Prevent Space from scrolling the page.
    return false;
  }

  // Accept either lowercase or uppercase P.
  if (key === "p" || key === "P") {
    // Check that an audio object exists.
    if (currentSong !== null) {
      // Pause keeps the current playback position.
      currentSong.pause();

      // Freeze the vinyl animation too.
      isPaused = true;
    }
  }
}

// --------------------------------------------------
// VINYL ANIMATION
// --------------------------------------------------

function drawVinyl() {
  // Grow only while unpaused and smaller than 100 pixels.
  if (isPaused === false && vinylSize < 100) {
    vinylSize = vinylSize + 5;
  }

  push();

  // Position the record above Jimothy.
  translate(JimothyX + 60, JimothyY - 60);

  // Rotate around that new origin.
  // p5 uses radians by default.
  rotate(spinAngle);

  // Main disc: circle(x, y, diameter).
  noStroke();
  fill("#151515");
  circle(0, 0, vinylSize);

  // A mark makes the rotation visible.
  stroke("#888888");
  strokeWeight(2);
  line(0, 0, vinylSize / 3, 0);

  // Label: its size stays proportional to the disc.
  noStroke();
  fill("#c9c9c9");
  circle(0, 0, vinylSize / 3);

  // Centre hole.
  fill("#151515");
  circle(0, 0, vinylSize / 15);

  pop();

  // Changing the angle each frame creates spinning.
  if (isPaused === false) {
    spinAngle = spinAngle + 0.05;
  }
}

// --------------------------------------------------
// STOP AND RESET THE CURRENT RECORD
// --------------------------------------------------

function stopRecord() {
  if (currentSong !== null) {
    currentSong.pause();

    // Return playback to zero seconds.
    currentSong.currentTime = 0;
  }

  currentSong = null;
  isPlaying = false;
  isPaused = false;
  nowPlaying = "";

  // Do not reset isFlying.
  // An existing flight continues when tracks change.
}

// --------------------------------------------------
// COUNT NEW TRACK STARTS
// --------------------------------------------------

function countSongPlay() {
  songsPlayed = songsPlayed + 1;

  // % gives the remainder after division.
  // 3, 6, 9... leave zero when divided by 3.
  // Only start a flight if one is not already active.
  if (songsPlayed % 3 === 0 && isFlying === false) {
    isFlying = true;

    // Start outside the canvas's right edge.
    flyX = width + 50;

    // Fixed vertical position: 220 on this canvas.
    flyY = height / 2 - 80;

    // Negative speed moves the image left.
    flySpeed = -2;
  }
}

// --------------------------------------------------
// FLYING IMAGE ANIMATION
// --------------------------------------------------

function drawFlyingImage() {
  if (isFlying) {
    // Update the position each frame.
    flyX = flyX + flySpeed;

    let flyWidth = 400;

    // Preserve the original image's proportions.
    let flyHeight = (flyWidth * flyingImage.height) / flyingImage.width;

    image(flyingImage, flyX, flyY, flyWidth, flyHeight);

    // Stop after the entire image leaves the left edge.
    if (flyX < -flyWidth) {
      isFlying = false;
    }
  }
}
