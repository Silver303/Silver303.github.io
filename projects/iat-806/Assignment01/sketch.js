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

//assigning  the vinyl is playing, how large it is, and its animation and rotation.
let isPlaying = false;
let vinylSize = 0;
let spinAngle = 0;

// vinyl pausing and resuming
let isPaused = false;

// assigning audio
let songs = [];
let jimothyPicks = [];
let currentSong = null;

// setup() runs once when the sketch starts.
// async allows us to use await while loading images.
async function setup() {
  const canvas = createCanvas(1000, 600);
  canvas.parent("sketch-holder");

  // Wait for each image to load before continuing.
  cover1 = await loadImage("images/WuTang_36Chambers.jpeg");
  cover2 = await loadImage("images/Nas_Illmatic.jpg");
  cover3 = await loadImage("images/PinkFloyd_Animals.jpg");
  cover4 = await loadImage("images/ATribeCalledQuest_TheAnthology.jpg");
  cover5 = await loadImage("images/JeffMills_TheBells.jpg");

  //load Jimothy
  Jimothy = await loadImage("images/Jimothy.png");

  songs = [
    new Audio("audio/wutang.mp3"),
    new Audio("audio/nas.mp3"),
    new Audio("audio/pinkfloyd.mp3"),
    new Audio("audio/atcq.mp3"),
    new Audio("audio/jeffmills.mp3"),
  ];

  //jimoty's picks audio files
  jimothyPicks = [
    new Audio("audio/pick1.mp3"),
    new Audio("audio/pick2.mp3"),
    new Audio("audio/pick3.mp3"),
  ];
}

// draw() runs repeatedly to display the scene.
function draw() {
  background("#0b0026");
  noStroke();

  // Draw the random-pick button. JIMOTHY PICKS A RANDOM TRACK.
  push();

  fill("#1f1f1f");
  rect(700, 60, 240, 60);

  fill("#8352ff");
  textFont("Figtree");
  textSize(22);
  textAlign(CENTER, CENTER);
  text("Jimothy's pick", 820, 90);

  pop();

  // Draw the shelf.
  fill("#1f1f1f");
  rect(50, 500, 900, 20);

  // Draw the album covers above the shelf and lift the cover if the mouse hovers over it. && means and: all four comparisons must be true.

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

  //Draw the vinyl spinning if isPlaying is true.
  if (isPlaying) {
    drawVinyl();
  }
} // draw() ends here

function mousePressed() {
  // Click Jimothy's pick.// Click Jimothy's pick.
  if (mouseX >= 700 && mouseX <= 940 && mouseY >= 60 && mouseY <= 120) {
    stopRecord();

    // Stop Jimothy wherever he currently is.
    targetX = JimothyX;

    // No shelf album is selected.
    selectedRecord = 0;

    // Choose from Jimothy's separate audio collection.
    let randomIndex = floor(random(jimothyPicks.length));
    currentSong = jimothyPicks[randomIndex];

    currentSong.play().catch(function (error) {
      console.error("Could not play:", currentSong.src, error);
    });

    vinylSize = 0;
    spinAngle = 0;
    isPlaying = true;
    isPaused = false;

    return;
  }

  // Start the vinyl animation.
  vinylSize = 0;
  spinAngle = 0;
  isPlaying = true;
  isPaused = false;

  return;
}
// Click Wu-Tang.
if (mouseX >= 60 && mouseX <= 200 && mouseY >= 300 && mouseY <= 490) {
  targetX = 60;
  selectedRecord = 1;

  stopRecord();
}

// Click Nas.
else if (mouseX >= 230 && mouseX <= 370 && mouseY >= 300 && mouseY <= 490) {
  targetX = 230;
  selectedRecord = 2;

  stopRecord();
}

// Click Pink Floyd.
else if (mouseX >= 400 && mouseX <= 540 && mouseY >= 300 && mouseY <= 490) {
  targetX = 400;
  selectedRecord = 3;

  stopRecord();
}

// Click ATCQ.
else if (mouseX >= 570 && mouseX <= 710 && mouseY >= 300 && mouseY <= 490) {
  targetX = 570;
  selectedRecord = 4;

  stopRecord();
}

// Click Jeff Mills.
else if (mouseX >= 740 && mouseX <= 880 && mouseY >= 300 && mouseY <= 490) {
  targetX = 740;
  selectedRecord = 5;

  stopRecord();
}

function keyPressed() {
  if (key === " ") {
    // Start only after an album is selected and Jimothy arrives at the album.
    if ((selectedRecord > 0 && JimothyX === targetX) || currentSong !== null) {
      // Reset the animation when starting a new record.
      if (currentSong === null) {
        currentSong = songs[selectedRecord - 1];
      }

      // Find and play the selected song. This takes the selected track from the array and stores it in currentSong.
      // For Nas, the calculation is 2 - 1, so it chooses songs[1].
      currentSong = songs[selectedRecord - 1];

      //This starts playback. After a pause, it resumes from the paused position.
      console.log("Trying to play:", currentSong.src);

      currentSong.play().catch(function (error) {
        console.error("Could not play:", currentSong.src, error);
      });

      isPlaying = true;
      isPaused = false;
    }

    return false; // Prevent Space from scrolling.
  }

  if (key === "p" || key === "P") {
    if (currentSong !== null) {
      //This pauses playback without returning to the beginning.
      // currentSong !== null checks that a song exists before trying to pause it.
      currentSong.pause();
      isPaused = true;
    }
  }
}

//Draw the vinyl spinning. Called from draw() when isPlaying is true.

function drawVinyl() {
  // Grow into view until the vinyl is 100 pixels wide.
  if (isPaused === false && vinylSize < 100) {
    vinylSize = vinylSize + 5;
  }

  push();

  // Place the vinyl above Jimothy's horizontal centre.
  translate(JimothyX + 60, JimothyY - 60);
  rotate(spinAngle);

  // Black vinyl
  noStroke();
  fill("#151515");
  circle(0, 0, vinylSize);

  // A mark that makes the spinning visible
  stroke("#888888");
  strokeWeight(2);
  line(0, 0, vinylSize / 3, 0);

  // Centre label
  noStroke();
  fill("#c9c9c9");
  circle(0, 0, vinylSize / 3);

  // Centre hole
  fill("#151515");
  circle(0, 0, vinylSize / 15);

  pop();

  // Rotate the vinyl if it is not paused (if spacebar is pressed, it will play and if P is pressed, it will pause).
  if (isPaused === false) {
    spinAngle = spinAngle + 0.05;
  }
}

//This function groups the stopping actions in one place:
function stopRecord() {
  if (currentSong !== null) {
    currentSong.pause();
    currentSong.currentTime = 0;
  }

  currentSong = null;
  isPlaying = false;
  isPaused = false;
}
