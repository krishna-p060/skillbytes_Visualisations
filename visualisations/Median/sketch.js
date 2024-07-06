let points = [];
let mean = 0;
let median = 0;
const minRange = 0;
const maxRange = 50;
const canvasWidth = 800;
const canvasHeight = 200;
const boundaryStart = 50;
const boundaryEnd = canvasWidth - 50;
const boundaryTop = 50;
const boundaryBottom = canvasHeight - 50;
const numCheckpoints = 10;
const stepSize = (maxRange - minRange) / numCheckpoints;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    textSize(16);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(255);
    drawBoundary();
    drawNumberLine();
    drawPoints();
    drawMean();
    drawMedian();
    drawHoverValue();
}

function drawBoundary() {
    noFill();
    stroke(0);
    rect(boundaryStart-15, boundaryTop-20, boundaryEnd - boundaryStart+35, boundaryBottom - boundaryTop+40);
}

function drawNumberLine() {
    // stroke(0);
    line(boundaryStart, height / 2, boundaryEnd, height / 2);
    let pt = 0;
    for (let i = 0; i <= maxRange; i++) {
        let value = minRange + pt * stepSize;
        // fill(0, 0, 255);
        let x = map(i, minRange, maxRange, boundaryStart, boundaryEnd);
        line(x, height / 2 - 5, x, height / 2 + 5);
        // noStroke();
        fill(0);
        if(value == i) {
        text(value.toFixed(1), x, height / 2 + 20);
        pt++;
        }
    }
}

function drawPoints() {
    for (let i = 0; i < points.length; i++) {
        let x = map(points[i], minRange, maxRange, boundaryStart, boundaryEnd);
        fill(0, 0, 255);
        ellipse(x, height / 2 - 20, 10, 10);

        // Show number only when hovered, on the upper side of the number line
        if (dist(mouseX, mouseY, x, height / 2 - 20) < 5) {
            fill(0);
            text(points[i].toFixed(2), x, height / 2 - 40);
        }
    }
}

function drawMean() {
    if (points.length > 0) {
        mean = points.reduce((acc, val) => acc + val, 0) / points.length;
        let meanX = map(mean, minRange, maxRange, boundaryStart, boundaryEnd);
        fill(255, 0, 0);
        ellipse(meanX, height / 2 - 20, 10, 10);
        fill(0);
        text(`Mean: ${mean.toFixed(2)}`, meanX, height / 2 - 40);
    }
}

function drawMedian() {
    if (points.length > 0) {
        median = calculateMedian(points);
        let medianX = map(median, minRange, maxRange, boundaryStart, boundaryEnd);
        fill(0, 255, 0);
        ellipse(medianX, height / 2 - 20, 10, 10);
        fill(0);
        text(`Median: ${median.toFixed(2)}`, medianX, height / 2 - 60);
    }
}

function drawHoverValue() {
    if (mouseY >= height / 2 - 10 && mouseY <= height / 2 + 10) {  // Check if mouse is near the number line
        let value = map(mouseX, boundaryStart, boundaryEnd, minRange, maxRange);
        fill(0);
        text(`${value.toFixed(2)}`, mouseX, height / 2 - 10);
    }
}

function mousePressed() {
    if (mouseX >= boundaryStart && mouseX <= boundaryEnd && mouseY >= boundaryTop && mouseY <= boundaryBottom) {
        let x = map(mouseX, boundaryStart, boundaryEnd, minRange, maxRange);
        points.push(x);
    }
}

function calculateMedian(arr) {
    let sortedArr = arr.slice().sort((a, b) => a - b);
    let middle = Math.floor(sortedArr.length / 2);

    if (sortedArr.length % 2 === 0) {
        return (sortedArr[middle - 1] + sortedArr[middle]) / 2;
    } else {
        return sortedArr[middle];
    }
}
