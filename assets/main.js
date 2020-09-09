let xWidth = window.innerWidth;
let yHeight = window.innerHeight;
let xCentre = xWidth / 2;
let yCentre = yHeight / 2;
let circleRadius = Math.min(yHeight / 2.1, xWidth / 2.1);

let canvasStatic = document.getElementById("canvasStatic");
let ctxStatic = canvasStatic.getContext("2d");
canvasStatic.width = xWidth;
canvasStatic.height = yHeight;

function getRotatedPoint(angle, handSize) {
  handRadius = circleRadius * handSize;
  handAngle = angle - (Math.PI * 1) / 2;
  newX = handRadius * Math.cos(handAngle);
  newY = handRadius * Math.sin(handAngle);
  return [newX, newY];
}

function drawStatic() {
  drawClock();
  drawTimeMarkers();
}

function drawClock() {
  ctxStatic.strokeStyle = "black";
  ctxStatic.lineWidth = 5;
  ctxStatic.beginPath();
  ctxStatic.arc(xWidth / 2, yHeight / 2, circleRadius, 0, 2 * Math.PI);
  ctxStatic.stroke();
  ctxStatic.beginPath();
  ctxStatic.arc(xWidth / 2, yHeight / 2, 4, 0, 2 * Math.PI);
  ctxStatic.fill();
}

function drawTimeMarkers() {
  number = 1;
  for (i = 0; i < 60; i++) {
    angleDeg = (i + 1) * 6;
    angleRad = angleDeg * (Math.PI / 180);
    pt1 = getRotatedPoint(angleRad, 0.95);
    pt2 = getRotatedPoint(angleRad, 1);
    console.log(pt1, pt2);
    ctxStatic.lineWidth = 4;
    ctxStatic.beginPath();
    ctxStatic.moveTo(xCentre + pt1[0], yCentre + pt1[1]);
    ctxStatic.lineTo(xCentre + pt2[0], yCentre + pt2[1]);
    ctxStatic.stroke();
    if (angleDeg % 30 == 0) {
      ctxStatic.lineWidth = 6;
      pt1 = getRotatedPoint(angleRad, 0.92);
      ctxStatic.beginPath();
      ctxStatic.moveTo(xCentre + pt1[0], yCentre + pt1[1]);
      ctxStatic.lineTo(xCentre + pt2[0], yCentre + pt2[1]);
      ctxStatic.stroke();
      textLoc = getRotatedPoint(angleRad, 0.8);
      ctxStatic.font = "30px Arial";
      ctxStatic.fillText(
        `${number}`,
        xCentre + textLoc[0] - 10,
        yCentre + textLoc[1] + 10
      );
      number += 1;
    }
  }
}

let canvas = document.getElementById("canvasActive");
let ctx = canvas.getContext("2d");
ctx.canvas.width = xWidth;
ctx.canvas.height = yHeight;

function init() {
  drawStatic();
  draw();
}

function draw() {
  let now = new Date();
  // console.log(
  //   `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`
  // );
  ctx.clearRect(0, 0, xWidth, yHeight);
  drawHoursHand(now);
  drawMinutesHand(now);
  drawSecondsHand(now);
  window.requestAnimationFrame(draw);
}

function drawSecondsHand(today) {
  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;
  angleDeg =
    (360 / 60) * today.getSeconds() + (6 / 1000) * today.getMilliseconds();
  angleRad = angleDeg * (Math.PI / 180);
  newPoint = getRotatedPoint(angleRad, 0.8);
  ctx.beginPath();
  ctx.moveTo(xCentre, yCentre);
  ctx.lineTo(xCentre + newPoint[0], yCentre + newPoint[1]);
  ctx.stroke();
}

function drawMinutesHand(today) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  angleDeg = (360 / 60) * today.getMinutes() + (6 / 60) * today.getSeconds();
  angleRad = angleDeg * (Math.PI / 180);
  newPoint = getRotatedPoint(angleRad, 0.9);
  ctx.beginPath();
  ctx.moveTo(xCentre, yCentre);
  ctx.lineTo(xCentre + newPoint[0], yCentre + newPoint[1]);
  ctx.stroke();
}

function drawHoursHand(today) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 6;
  angleDeg =
    (360 / 12) * (today.getHours() % 12) + (15 / 60) * today.getMinutes();
  angleRad = angleDeg * (Math.PI / 180);
  newPoint = getRotatedPoint(angleRad, 0.7);
  ctx.beginPath();
  ctx.moveTo(xCentre, yCentre);
  ctx.lineTo(xCentre + newPoint[0], yCentre + newPoint[1]);
  ctx.stroke();
}

init();
