function allAstar() {
  let visitedPath = [];

  function setProperty() {
    let boxClass = document.getElementsByClassName("box");
    for (var index = 0; index < totalCell; index++) {
      boxClass[index].setAttribute("distanceGn", Infinity);
      boxClass[index].setAttribute("distanceHn", Infinity);
      boxClass[index].setAttribute("isVisited", false);
      boxClass[index].setAttribute("isPath", false);
      boxClass[index].setAttribute("previous", null);
      if (boxClass[index].getAttribute("isblocked") === "true") {
        continue;
      } else {
        boxClass[index].setAttribute("isblocked", false);
      }
    }
  }

  function aStarCostFunction(costOf, node) {
    let notVistedNode = nonVisited();
    let startNodeDiv = getNodeDiv(node);
    startCell = 1;
    distance = 0;
    startNodeDiv.setAttribute(costOf, distance);
    notVistedNode = notVistedNode.filter((e) => e !== node);
    let queue = [];
    neighbourOfCurrentNode = getNeighbours(node);
    neighbourOfCurrentNode = neighbourOfCurrentNode.filter(
      (e) => e > 0 && e < totalCell
    );
    while (startCell < totalCell / 4) {
      distance = distance + 1;
      neighbourOfCurrentNode.forEach((element) => {
        getNeighbourDiv = getNodeDiv(element);
        isWall = getNeighbourDiv.getAttribute("isblocked");
        if (isWall === "false") {
          getNeighbourDiv.setAttribute(costOf, distance);
          newNeighbours = getNeighbours(element);
          newNeighbours = newNeighbours.filter(
            (e) => e > 0 && e < totalCell && notVistedNode.includes(e)
          );
          notVistedNode = notVistedNode.filter((e) => e !== element);
          newNeighbours.forEach(function (individualNeighbour) {
            queue.push(individualNeighbour);
          });
        }
      });
      queue = queue.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      });
      neighbourOfCurrentNode = queue.filter(
        (e) => e > 0 && e < totalCell && notVistedNode.includes(e)
      );
      startCell++;
    }
  }

  function getTotalCost(element) {
    elementDiv = getNodeDiv(element);
    gN = elementDiv.getAttribute("distanceGn");
    hN = elementDiv.getAttribute("distanceHn");
    tN = parseInt(gN) + parseInt(hN);
    return tN;
  }

  function getNodesInShortestPathOrder() {
    let nodesInShortestPathOrder = [];
    let currentNode = startNode;
    startCell = 1;
    while (true) {
      if (parseInt(currentNode) === endNode) {
        break;
      }
      pathDiv = getNodeDiv(currentNode);
      getAllNeighboursElements = getNeighbours(currentNode);
      getAllNeighboursElements = getAllNeighboursElements.filter(
        (e) => e > 0 && e < totalCell
      );
      getAllNeighboursElements = getAllNeighboursElements.filter(
        (e) => getNodeDiv(e).getAttribute("isblocked") === "false"
      );
      getAllNeighboursElements.forEach(function (individualNeighbour) {
        getIndividualNeighbourDiv = getNodeDiv(individualNeighbour);
        visitedPath.push(individualNeighbour);
      });
      fixedNode = getAllNeighboursElements.reduce(function (e1, e2) {
        e1Div = getTotalCost(e1);
        e2Div = getTotalCost(e2);
        if (e1Div !== e2Div) {
          return e1Div < e2Div ? e1 : e2;
        } else {
          e1HnDiv = getNodeDiv(e1);
          hN1 = parseInt(e1HnDiv.getAttribute("distanceHn"));
          e2HnDiv = getNodeDiv(e2);
          hN2 = parseInt(e2HnDiv.getAttribute("distanceHn"));
          return hN1 < hN2 ? e1 : e2;
        }
      });
      indexFixedNode = getAllNeighboursElements.indexOf(fixedNode);
      nextNode = getAllNeighboursElements[indexFixedNode];
      nodesInShortestPathOrder.push(nextNode);
      currentNode = nextNode;
      startCell++;
    }
    return nodesInShortestPathOrder;
  }

  function animateShortestPathAStar() {
    getPath = getNodesInShortestPathOrder();
    getPath.pop();

    visitedPath.forEach(function (element, index) {
      animateAstarPath = setTimeout(function () {
        getPathDiv = getNodeDiv(element);
        getPathDiv.setAttribute("isVisited", true);
      }, 100 * index);
    });
    function animatePathAstar() {
      getPath.forEach(function (individualPath) {
        getPathDiv = getNodeDiv(individualPath);
        getPathDiv.setAttribute("isPath", true);
      });
    }
    setTimeout(animatePathAstar, 100 * visitedPath.length);
  }

  setProperty();
  aStarCostFunction("distanceGn", startNode);
  aStarCostFunction("distanceHn", endNode);
  animateShortestPathAStar();
}
