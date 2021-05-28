function allDeapthFirstSearch() {
  let distance = 0;
  let vistedPath = [];

  function areAllNodeVisited(nodeArray) {
    initialVisit = 0;
    nodeArray.forEach((element) => {
      getNode = getNodeDiv(element);
      if (
        getNode.getAttribute("previouslyVisited") === "true" ||
        getNode.getAttribute("isBlocked") === "true"
      ) {
        initialVisit += 1;
      }
    });
    if (initialVisit === nodeArray.length) {
      return true;
    } else {
      return false;
    }
  }

  function setDfsProperty() {
    let boxClass = document.getElementsByClassName("box");
    for (var index = 0; index < rows * columns; index++) {
      boxClass[index].setAttribute("distance", distance);
      boxClass[index].setAttribute("previouslyVisited", false);
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

  function deapthFirstSearch() {
    let firstNode = startNode;
    let vistedTracker = [firstNode];
    neighbourArray = [firstNode];
    getNodeDiv(firstNode).setAttribute("previouslyVisited", true);
    eachElementNeighbour = getNeighbours(firstNode);
    startCell = 1;
    pointer = firstNode;
    indexFlag = 0;
    breakFlag = false;
    while (vistedTracker.length) {
      distance = distance + 1;
      eachElementNeighbour = eachElementNeighbour.filter(
        (e) => e > 0 && e < totalCell
      );
      if (!areAllNodeVisited(eachElementNeighbour) && !breakFlag) {
        eachElementNeighbour = eachElementNeighbour.filter(
          (e) => getNodeDiv(e).getAttribute("previouslyVisited") === "false"
        );
        eachElementNeighbour = eachElementNeighbour.filter(
          (e) => getNodeDiv(e).getAttribute("isBlocked") === "false"
        );
        selectOneNeighbours = eachElementNeighbour[indexFlag];
        downDiv = getNodeDiv(selectOneNeighbours);
        downDiv.setAttribute("previouslyVisited", true);
        downDiv.setAttribute("distance", distance);
        downDiv.setAttribute(
          "previous",
          vistedTracker[vistedTracker.length - 1]
        );
        vistedTracker.push(selectOneNeighbours);
        vistedPath.push(selectOneNeighbours);
        if (selectOneNeighbours === endNode) {
          breakFlag = true;
        }
      } else {
        vistedTracker.pop();
      }
      eachElementNeighbour = getNeighbours(
        vistedTracker[vistedTracker.length - 1]
      );
      startCell++;
    }
  }

  function animateDfsVisited() {
    vistedPath.forEach(function (element, index) {
      animateDfsVisited = setTimeout(function () {
        downDiv = getNodeDiv(element);
        downDiv.setAttribute("isVisited", true);
      }, 10 * index);
    });
    clearTimeout(animateDfsVisited);
  }

  function animateDfs() {
    vistedPath.forEach(function (element, index) {
      animateShortestDfsPath = setTimeout(function () {
        downDiv = getNodeDiv(element);
        downDiv.setAttribute("isPath", true);
      }, 20 * index);
    });
    clearTimeout(animateShortestDfsPath);
  }

  function dfsWithoutAnimation() {
    vistedPath.forEach(function (element, index) {
      downDiv = getNodeDiv(element);
      downDiv.setAttribute("isPath", true);
    });
  }

  setDfsProperty();
  deapthFirstSearch();
  if (!startNodeDragging) {
    animateDfsVisited();
    if (vistedPath[vistedPath.length - 1] === endNode) {
      setTimeout(animateDfs(), vistedPath.length * 10);
    }
  } else {
    dfsWithoutAnimation();
    if (vistedPath[vistedPath.length - 1] === endNode) {
      animateDfs();
    }
  }
}
