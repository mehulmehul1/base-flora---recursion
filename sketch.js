var rad;
let pg;

var res;
var angle;
var blobObj = [];

let PAD = 8;

let maxDepth = 35;

let N = 3;
let sourceNodes = [];
let drawCounter = 0;
const maxDrawLoops = 10000; // Set the number of loops you want

let animLoop;
let frameCounter = 1;
const totalFrames = 200;

let capturer;
var btn;

function saveImage() {
  saveCanvas("myImage", "png");
}

function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  background("#000");

  btn = document.createElement("button");
  btn.textContent = "save recording";
  document.body.appendChild(btn);
  btn.onclick = save_record;

  for (let n = 0; n < N; n++) {
    sourceNode = new makeNode(
      null,
      {
        x: random(PAD * 1.5, width - PAD * 1.5),
        y: random(PAD * 1.5, height - PAD * 1.5),
      },
      random(10, 30),
      maxDepth
    );

    let placeable = true;
    for (let k = 0; k < sourceNodes.length; k++) {
      if (
        dist(
          sourceNode.position.x,
          sourceNode.position.y,
          sourceNodes[k].position.x,
          sourceNodes[k].position.y
        ) <
        sourceNode.radius / 2 + sourceNodes[k].radius / 2 + 25
      ) {
        placeable = false;
      }
    }
    if (placeable) {
      sourceNodes.push(sourceNode);
      allNodes.push(sourceNode);
    }
  }

  stroke(255);
  //fill(255)
  // capturer = new CCapture({ format: 'webm' , framerate: 30});
  // capturer.start();
}

function draw() {
  drawCounter++;
  frameCounter++;
  for (let node of sourceNodes) {
    node.grow();
  }

  for (let n = 0; n < allNodes.length; n++) {
    allNodes[n].display();
  }

  if (drawCounter >= maxDrawLoops) {
    //loop.stop();
    noLoop(); // Stop the drawing loop
  }
  //console.log(frames);

  // capturer.capture(document.getElementById('defaultCanvas0'));
}

function save_record() {
  capturer.save();
}
