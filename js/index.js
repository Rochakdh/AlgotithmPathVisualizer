const grids = document.querySelector(".grids");
let boxSize = 25;
let rows = 15;
let columns = Math.floor(window.innerWidth / boxSize);

grids.style.setProperty("grid-template-columns", `repeat(${columns}, 1fr)`);
grids.style.setProperty("grid-template-rows", `repeat(${rows}, 1fr)`);

let totalCell = rows * columns;
let startNode;
let endNode;
let box;
let currentAlgorithm;
let previousBlockedArray;
let previousStartEnd;
let startNodeDragging = false;
let reload = false;

function drawGrid() {
  for (var index = 0; index < totalCell; index++) {
    box = document.createElement("div");
    box.id = "node" + index;
    box.style.width = boxSize + "px";
    box.style.height = boxSize + "px";
    grids.appendChild(box).className = "box";
  }
}

function randomNumberFromRange(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

function rightBoundary(index) {
  colCount = columns;
  const colPosition = index % colCount;
  return colPosition === colCount - 1;
}

function leftBoundary(index) {
  colCount = columns;
  const colPosition = index % colCount;
  return colPosition === 0;
}

function startEndNodes() {
  startNode = randomNumberFromRange(0, totalCell);
  endNode = randomNumberFromRange(0, totalCell);
  if (startNode === endNode) {
    endNode = randomNumberFromRange(0, totalCell);
  }
  if (rightBoundary(startNode) || leftBoundary(startNode)) {
    startNode = randomNumberFromRange(0, totalCell);
  }
  if (rightBoundary(endNode) || leftBoundary(endNode)) {
    endNode = randomNumberFromRange(0, totalCell);
  }
  document.getElementById(`node${startNode}`).classList.add("start");
  document.getElementById(`node${endNode}`).classList.add("end");
}

function checkDraggedStartEnd(eventThrown) {
  return (
    eventThrown.target.id !== `node${startNode}` &&
    eventThrown.target.id !== `node${endNode}` &&
    eventThrown.target.className === "box"
  );
}

function isPathClaculated() {
  for (var index = 1; index < totalCell; index++) {
    if (!rightBoundary(index) || !leftBoundary(index)) {
      pathDiv = getNodeDiv(index);
      if (pathDiv.getAttribute("isPath") === "true") {
        return true;
      }
    }
  }
  return false;
}

function isPathVisited() {
  for (var index = 1; index < totalCell; index++) {
    if (!rightBoundary(index) || !leftBoundary(index)) {
      pathDiv = getNodeDiv(index);
      if (pathDiv.getAttribute("isVisited") === "true") {
        return true;
      }
    }
  }
  return false;
}

function getNeighbours(currentNode) {
  let neighboour = [];
  leftNode = currentNode - 1;
  rightNode = currentNode + 1;
  upNode = currentNode - columns;
  downNode = currentNode + columns;
  neighboour.push(upNode);
  if (!rightBoundary(rightNode)) {
    neighboour.push(rightNode);
  }
  neighboour.push(downNode);
  if (!leftBoundary(leftNode)) {
    neighboour.push(leftNode);
  }

  return neighboour;
}

function sealBoundary() {
  for (var index = 0; index < totalCell; index++) {
    if (rightBoundary(index) || leftBoundary(index)) {
      getBoundaryDiv = getNodeDiv(index);
      getBoundaryDiv.setAttribute("isBlocked", true);
      getBoundaryDiv.classList.add("boundary");
    }
  }
}

function getBoundary() {
  let boundaryNode = [];
  let additional = 0;
  for (let index = 0; index < columns; index++) {
    boundaryNode.push(index);
  }
  for (let index = 0; index < rows; index++) {
    additional += columns;
    boundaryNode.push(additional);
    boundaryNode.push(additional - 1);
  }
  boundaryNode.pop();

  return boundaryNode;
}

function checkBoundary(checkElement) {
  let getBoundaryArray = getBoundary();
  return getBoundaryArray.includes(checkElement);
}

function getNodeDiv(node) {
  return document.getElementById("node" + node);
}

function nonVisited() {
  let noneVisited = [];
  for (var index = 0; index < totalCell; index++) {
    noneVisited.push(index);
  }

  return noneVisited;
}

function clearBoard() {
  let boxClass = document.getElementsByClassName("box");
  for (var index = 0; index < totalCell; index++) {
    boxClass[index].removeAttribute("distance");
    boxClass[index].removeAttribute("isVisited");
    boxClass[index].removeAttribute("isPath");
    boxClass[index].removeAttribute("previous");
    boxClass[index].removeAttribute("previousVisited");
    boxClass[index].removeAttribute("distanceGn");
    boxClass[index].removeAttribute("distanceHn");
    boxClass[index].removeAttribute("isMazeVisted");
    boxClass[index].removeAttribute("previousLink");
  }
}

function clearAllTimeOuts() {
  let x = setTimeout("");
  for (let i = 0; i < x; i++) clearTimeout(x);
}

drawGrid();
startEndNodes();
sealBoundary();
