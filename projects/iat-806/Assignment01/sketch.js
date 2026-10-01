// These variables store each album cover image so the program can draw them on screen.
// A pattern like this is useful when you have several similar items (images, buttons, shapes) that need to be managed separately.
let cover1;
let cover2;
let cover3;
let cover4;
let cover5;

// selectedRecord remembers which album Jimothy is standing by.
// 0 means no album is selected yet. This is a common beginner pattern: keep track of a current state with a variable.
let selectedRecord = 0;

// Jimothy is the character image that will move around the scene.
let Jimothy;

// Jimothy's position and direction on screen.
// X and Y are coordinates: X is left-right, Y is up-down.
// targetX is the destination Jimothy is trying to reach.
let JimothyX = 60;
let JimothyY = 200;
let targetX = 60; // where Jimothy wants to walk to
let facingRight = true;

// These variables control the record animation while music is playing.
// isPlaying tells us whether a track is active, and the size/angle values change every frame to create movement.
let isPlaying = false;
let vinylSize = 0;
let spinAngle = 0;

// isPaused tells us whether the music is temporarily stopped without resetting the track.
// This is useful because pause is different from stop: pause keeps the song's place, stop resets it.
let isPaused = false;

// These arrays hold the audio objects for normal album tracks and Jimothy's random picks.
// Arrays are a good way to store a list of related items such as sounds or images.
let songs = [];
let jimothyPicks = [];
let currentSong = null;

// These are the labels that appear under the record when a song is playing.
// They are kept in the same order as the songs array so the title matches the correct track.
let songNames = [
  "Wu-Tang Clan - Protect Ya Neck",
  "Nas - NY State of Mind",
  "Pink Floyd - Dogs",
  "A Tribe Called Quest - Luck of Lucian",
  "Jeff Mills - The Bells",
];

// Titles for the three random tracks, matching jimothyPicks.
let pickNames = [
  "Delano Smith - Survival",
  "1morning - Flow",
  "Hamatsuki - Doom Disco",
];

let nowPlaying = "";

//REAL DJS PLAY VINYL
let songsPlayed = 0;
let flyingImage;
let flyX = -180;
let flyY = 100;
let flySpeed = 3;
let isFlying = false;

// === Setup: runs once when the sketch starts ===
// This is the "start-up" section. It creates the canvas and loads all images and sounds
// before the program starts drawing the scene and playing music.
// A good way to think about setup(): it prepares the scene, then draw() keeps updating it.
async function setup() {
  const canvas = createCanvas(1000, 600);
  canvas.parent("sketch-holder");

  // Load each album cover one by one so the images are ready before we use them.
  // The await keyword pauses here until each image finishes loading. This prevents errors from drawing pictures too early.
  cover1 = await loadImage("images/WuTang_36Chambers.jpeg");
  cover2 = await loadImage("images/Nas_Illmatic.jpg");
  cover3 = await loadImage("images/PinkFloyd_Animals.jpg");
  cover4 = await loadImage("images/ATribeCalledQuest_TheAnthology.jpg");
  cover5 = await loadImage("images/JeffMills_TheBells.jpg");

  // Load Jimothy's sprite image so it can be drawn on the scene.
  Jimothy = await loadImage("images/Jimothy.png");

  // LOAD VINYL SNOB MESSAGE
  flyingImage = await loadImage("images/realdjsplayvinyl.png");

  // This array stores the actual audio objects for the shelf songs.
  // Each item is a new Audio object tied to a music file.
  songs = [
    new Audio("audio/wutang.mp3"),
    new Audio("audio/nas.mp3"),
    new Audio("audio/pinkfloyd.mp3"),
    new Audio("audio/atcq.mp3"),
    new Audio("audio/jeffmills.mp3"),
  ];

  // These are the bonus/random tracks Jimothy can choose.
  // They are stored in a separate list because they are not the main shelf albums.
  jimothyPicks = [
    new Audio("audio/DelanoSmith_Survival_clip.mp3"),
    new Audio("audio/1morning_Flow_clip.mp3"),
    new Audio("audio/Hamatsuki_DoomDisco_clip.mp3"),
  ];
}

// === Main animation loop ===
// This runs every frame and redraws the background, shelf, albums, Jimothy, and track text.
// The draw() function is the heart of a p5.js sketch: it continuously refreshes the screen.
function draw() {
  background("#0b0026");
  noStroke();

  // Draw the "Jimothy's pick" button near the top right.
  // This button chooses a random song from the special picks list.
  // push() and pop() keep drawing settings (such as fill and text settings) from leaking into later shapes.
  push();

  fill("#1f1f1f");
  rect(700, 60, 240, 60);

  fill("#8352ff");
  textFont("Figtree");
  textSize(22);
  textAlign(CENTER, CENTER);
  text("Jimothy's pick", 820, 90);

  pop();

  // Draw the shelf where the albums sit.
  // This is a simple rectangle used as a base for the records/albums.
  fill("#1f1f1f");
  rect(50, 500, 900, 20);

  // === Album hover behavior ===
  // This section checks where the mouse is.
  // If the mouse is over an album, that album lifts upward slightly to look like it is being hovered over.
  // This is a common interactive pattern: compare mouse coordinates with known rectangle boundaries.

  // Wu-Tang
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

  // === Jimothy movement ===
  // This keeps Jimothy walking toward his target position every frame until he reaches it.
  // This is a simple animation pattern: update a position value repeatedly, then draw the character in the updated spot.
  if (JimothyX < targetX) {
    facingRight = true;
    JimothyX = JimothyX + 4;

    if (JimothyX > targetX) {
      JimothyX = targetX;
    }
  } else if (JimothyX > targetX) {
    facingRight = false;
    JimothyX = JimothyX - 4;

    if (JimothyX < targetX) {
      JimothyX = targetX;
    }
  }

  // === Sprite facing and positioning ===
  // This flips Jimothy left or right based on whether he is moving toward the right or left.
  // translate() moves the drawing origin so the image appears at Jimothy's new position.
  // scale(-1, 1) mirrors the image, which is a classic trick for making a character face the other way.
  push(); // keep these drawing transforms from affecting the album art
  translate(JimothyX + 60, JimothyY); // translate() moves the drawing origin to Jimothy's horizontal centre.

  if (facingRight === false) {
    scale(-1, 1); // scale(-1, 1) mirrors the drawing horizontally.
  }

  image(Jimothy, -60, 0, 120, 120); // place half of his 120-pixel width on either side of that centre.
  pop(); // keep these changes from affecting the albums.

  // === Vinyl display ===
  // If a record is playing, draw the spinning vinyl above Jimothy.
  // Separating pieces of code into helper functions like drawVinyl() makes your program easier to understand and reuse.
  if (isPlaying) {
    drawVinyl();
  }

  // Display the current track name below the shelf.
  // This is a simple text label that tells the player what is currently playing.
  push();

  fill("#8352ff");
  textFont("Figtree");
  textSize(18);
  textAlign(LEFT, CENTER);
  text(nowPlaying, 50, 555);

  pop();

  drawFlyingImage();
} // draw() ends here

// === Mouse input ===
// This section runs when the user clicks the mouse.
// It handles both the random pick button and the album choices.
// A common beginner pattern is: check mouse coordinates, then run an action if they fall inside a specific box.
function mousePressed() {
  // If the user clicks the "Jimothy's pick" button, pick a random song and start it.
  // The numbers define a rectangle: x from 700 to 940, y from 60 to 120.
  if (mouseX >= 700 && mouseX <= 940 && mouseY >= 60 && mouseY <= 120) {
    stopRecord();

    targetX = JimothyX;
    selectedRecord = 0;

    let randomIndex = floor(random(jimothyPicks.length));
    currentSong = jimothyPicks[randomIndex];
    nowPlaying = "Now Playing: " + pickNames[randomIndex];

    currentSong.play().catch(function (error) {
      console.error("Could not play:", error);
    });

    vinylSize = 0;
    spinAngle = 0;
    isPlaying = true;
    isPaused = false;

    countSongPlay();

    return;
  }

  // Click the Wu-Tang album.
  // This is the same pattern repeated for each album: check if the click is inside that album's rectangle and then move Jimothy there.
  if (mouseX >= 60 && mouseX <= 200 && mouseY >= 300 && mouseY <= 490) {
    stopRecord();
    targetX = 60;
    selectedRecord = 1;
  }

  // Click Nas.
  else if (mouseX >= 230 && mouseX <= 370 && mouseY >= 300 && mouseY <= 490) {
    stopRecord();
    targetX = 230;
    selectedRecord = 2;
  }

  // Click Pink Floyd.
  else if (mouseX >= 400 && mouseX <= 540 && mouseY >= 300 && mouseY <= 490) {
    stopRecord();
    targetX = 400;
    selectedRecord = 3;
  }

  // Click ATCQ.
  else if (mouseX >= 570 && mouseX <= 710 && mouseY >= 300 && mouseY <= 490) {
    stopRecord();
    targetX = 570;
    selectedRecord = 4;
  }

  // Click Jeff Mills.
  else if (mouseX >= 740 && mouseX <= 880 && mouseY >= 300 && mouseY <= 490) {
    stopRecord();
    targetX = 740;
    selectedRecord = 5;
  }
}

// === Keyboard controls ===
// Press the spacebar to play the selected music.
// Press P to pause the current track.
// This function listens for keyboard input from the user and reacts to specific keys.
function keyPressed() {
  if (key === " ") {
    if ((selectedRecord > 0 && JimothyX === targetX) || currentSong !== null) {
      // If the record is not already spinning, reset the vinyl animation so it starts fresh.
      // This is important because if you don't reset the size/angle, the animation may continue from the last frame.
      if (isPlaying === false) {
        vinylSize = 0;
        spinAngle = 0;
      }

      // If no song is currently playing, start the selected record and update the nowPlaying label.
      if (currentSong === null) {
        currentSong = songs[selectedRecord - 1];
        nowPlaying = "Now Playing: " + songNames[selectedRecord - 1];

        countSongPlay();
      }

      currentSong.play().catch(function (error) {
        console.error("Could not play:", error);
      });

      isPlaying = true;
      isPaused = false;
    }

    return false;
  }

  if (key === "p" || key === "P") {
    if (currentSong !== null) {
      currentSong.pause();
      isPaused = true;
    }
  }
}

// === Vinyl animation ===
// This function draws and animates the record as it spins while a song is playing.
// A lot of animation works by changing a number little by little each frame, then redrawing the shape using that new value.
function drawVinyl() {
  // Grow into view until the vinyl is 100 pixels wide.
  // This creates a smooth "appearing" effect instead of snapping instantly into place.
  if (isPaused === false && vinylSize < 100) {
    vinylSize = vinylSize + 5;
  }

  push();

  // Place the vinyl above Jimothy's horizontal centre.
  // translate() moves the drawing origin to a new spot on the canvas.
  translate(JimothyX + 60, JimothyY - 60);
  rotate(spinAngle);

  // Black vinyl
  // This creates the main disc shape.
  noStroke();
  fill("#151515");
  circle(0, 0, vinylSize);

  // A mark that makes the spinning visible.
  // This line acts like a groove or marker on the record so the rotation is easier to see.
  stroke("#888888");
  strokeWeight(2);
  line(0, 0, vinylSize / 3, 0);

  // Centre label
  // The circle in the middle gives the record a label-like appearance.
  noStroke();
  fill("#c9c9c9");
  circle(0, 0, vinylSize / 3);

  // Centre hole
  // This smaller black circle creates the hole in the middle of the vinyl.
  fill("#151515");
  circle(0, 0, vinylSize / 15);

  pop();

  // Rotate the vinyl if it is not paused.
  // Rotating the angle a little each frame makes the disk appear to spin smoothly.
  if (isPaused === false) {
    spinAngle = spinAngle + 0.05;
  }
}

// === Stop / reset playback ===
// This function pauses the current audio, resets the position, and clears the playing state.
// A reset function is helpful because it keeps the code organized: instead of repeating the same stop logic many times, we call this function.
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

// === Flying image animation ===
// This function tracks how many songs have played and triggers the flying image every third song.
function countSongPlay() {
  songsPlayed = songsPlayed + 1;

  if (songsPlayed % 3 === 0 && isFlying === false) {
    isFlying = true;
    flyX = width + 50; // start off the right side of the screen
    flyY = height / 2 - 80; // center vertically on the canvas
    flySpeed = -2; // move left
  }
}

// This function draws the flying image across the screen while the animation is active.
function drawFlyingImage() {
  if (isFlying) {
    flyX = flyX + flySpeed;

    let flyWidth = 400; // make the image bigger
    let flyHeight = (flyWidth * flyingImage.height) / flyingImage.width;

    image(flyingImage, flyX, flyY, flyWidth, flyHeight);

    if (flyX < -flyWidth) {
      isFlying = false;
    }
  }
}
