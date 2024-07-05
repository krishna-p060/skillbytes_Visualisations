let data = [];
let m = 0;
let b = 0;
let userLine = [];
let userM, userB;

function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  if (data.length < 10) {
    let x = map(mouseX, 0, width, 0, 1);
    let y = map(mouseY, 0, height, 1, 0);
    let point = createVector(x, y);
    data.push(point);
  } else if (userLine.length < 2) {
    let x = map(mouseX, 0, width, 0, 1);
    let y = map(mouseY, 0, height, 1, 0);
    let point = createVector(x, y);
    userLine.push(point);
    if (userLine.length == 2) {
      userM = (userLine[1].y - userLine[0].y) / (userLine[1].x - userLine[0].x);
      userB = userLine[0].y - userM * userLine[0].x;
    }
  }
}

function drawLine(m, b, col) {
  stroke(col);
  let x1 = 0;
  let y1 = m * x1 + b;
  let x2 = 1;
  let y2 = m * x2 + b;

  x1 = map(x1, 0, 1, 0, width);
  y1 = map(y1, 0, 1, height, 0);
  x2 = map(x2, 0, 1, 0, width);
  y2 = map(y2, 0, 1, height, 0);

  line(x1, y1, x2, y2);
}

function linearRegression() {
  let xsum = 0;
  let ysum = 0;
  for (let i = 0; i < data.length; i++) {
    xsum += data[i].x;
    ysum += data[i].y;
  }
  let xmean = xsum / data.length;
  let ymean = ysum / data.length;

  let num = 0;
  let den = 0;
  for (let i = 0; i < data.length; i++) {
    let x = data[i].x;
    let y = data[i].y;
    num += (x - xmean) * (y - ymean);
    den += (x - xmean) * (x - xmean);
  }

  m = num / den;
  b = ymean - m * xmean;
}

function calculateScore(m, b) {
  let score = 0;
  for (let i = 0; i < data.length; i++) {
    let x = data[i].x;
    let y = data[i].y;
    let yline = m * x + b;
    let d = (y - yline) ** 2;
    score += d;
  }
  return score;
}

function draw() {
  background(51);
  for (let i = 0; i < data.length; i++) {
    let x = map(data[i].x, 0, 1, 0, width);
    let y = map(data[i].y, 0, 1, height, 0);
    fill(255);
    stroke(255);
    ellipse(x, y, 8, 8);
  }
  if (data.length > 1) {
    linearRegression();
  }
  if (userLine.length == 2) {
    drawLine(userM, userB, color(0, 0, 255));
    drawLine(m, b, color(0, 255, 0));
    let userScore = calculateScore(userM, userB);
    let normalizedScore = map(userScore, 0, 10, 10, 0); // Normalize the score to a scale of 0 to 10
    text(`User's score: ${normalizedScore.toFixed(2)}`, 10, height - 20);
  }
}
