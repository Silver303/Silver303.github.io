let records = [
  { title: "Record One", color: "#e88a9a" },
  { title: "Record Two", color: "#80bcb0" },
  { title: "Record Three", color: "#b19ad4" },
];

function setup() {
  const canvas = createCanvas(800, 500);
  canvas.parent("sketch-holder");
}

function draw() {
  background("#211d2b");

  fill("#d7ad77");
  rect(80, 275, 640, 18); // The shelf

  for (let i = 0; i < records.length; i++) {
    let x = 120 + i * 190;

    fill(records[i].color);
    rect(x, 130, 140, 140);

    fill("white");
    textAlign(CENTER);
    text(records[i].title, x + 70, 305);
  }
}
