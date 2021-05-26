const grids = document.querySelector('.grids')
const boxSize =  25
const columns = Math.floor(window.innerWidth / boxSize)
const rows = 15

grids.style.setProperty("grid-template-columns", `repeat(${columns}, 1fr)`)
grids.style.setProperty("grid-template-rows", `repeat(${rows}, 1fr)`)

let totalCell = rows*columns
let startNode;
let endNode;
let box;

drawGrid = function() {
    for (var index = 0 ; index < totalCell; index++){
        box = document.createElement('div')
        box.id = 'node' + index
        // box.innerHTML = index
        box.style.width =  boxSize + 'px'
        box.style.height = boxSize + 'px'
        grids.appendChild(box).className = 'box'
    }
}

function randomNumberFromRange(min,max){
    return size = parseInt(Math.random() * (max - min) + min);
}

function rightBoundary(index) {
    colCount = columns
    const colPosition = index % colCount;
    // const rowPosition = Math.floor(index / colCount);
    if (colPosition==(colCount-1)) {
        return true
    } else {
        return false
    } 
}

function leftBoundary(index) {
    colCount = columns
    const colPosition = index % colCount;
    // const rowPosition = Math.floor(index / colCount);
    if (colPosition==0) {
        return true
    } else {
        return false
    } 
}
startEndNodes = function (){
    startNode = randomNumberFromRange(0,rows*columns) 
    endNode = randomNumberFromRange(0,rows*columns)
    if (startNode === endNode){
        endNode = randomNumberFromRange(0,rows*columns)
    }
    if (rightBoundary(startNode) || leftBoundary(startNode)){
        startNode = randomNumberFromRange(0,rows*columns)
    }
    if (rightBoundary(endNode) || leftBoundary(endNode)){
        endNode = randomNumberFromRange(0,rows*columns)
    }
    document.getElementById(`node${startNode}`).classList.add('start')
    document.getElementById(`node${endNode}`).classList.add('end')
}
checkDraggedStartEnd = function(eventThrown){
    if (
        eventThrown.target.id != `node${startNode}` &&  eventThrown.target.id != `node${endNode}` 
        && eventThrown.target.className === 'box'
        ){
            return true
        }
    return false
}
// function rightBoundary(index) {
//     colCount = columns
//     const colPosition = index % colCount;
//     // const rowPosition = Math.floor(index / colCount);
//     if (colPosition==(colCount-1)) {
//         return true
//     } else {
//         return false
//     } 
// }

// function leftBoundary(index) {
//     colCount = columns
//     const colPosition = index % colCount;
//     // const rowPosition = Math.floor(index / colCount);
//     if (colPosition==0) {
//         return true
//     } else {
//         return false
//     } 
// }


getNeighbours = function(currentNode){
    let neighboour = []
    leftNode = currentNode - 1
    rightNode = currentNode + 1
    upNode = currentNode - columns
    downNode = currentNode + columns
    neighboour.push(upNode)
    if (!rightBoundary(rightNode)){
        neighboour.push(rightNode)
    }
    neighboour.push(downNode)
    if (!leftBoundary(leftNode)){
        neighboour.push(leftNode)
    }
    return neighboour
}

getNodeDiv = function(node){
    return document.getElementById('node'+ node)
}


function sealBoundary(index) {
    for (var index = 0 ; index < totalCell; index++){
        if (rightBoundary(index) || leftBoundary(index)){
            getBoundaryDiv = getNodeDiv(index)
            getBoundaryDiv.setAttribute('isBlocked',true)
            getBoundaryDiv.classList.add('boundary')
        }
    }   
}

function clearBoard(){
    let boxClass = document.getElementsByClassName('box')
    for (var index = 0 ; index < (rows*columns); index++){
        boxClass[index].removeAttribute('distance')
        boxClass[index].removeAttribute('isVisited')
        boxClass[index].removeAttribute('isPath')
        boxClass[index].removeAttribute('previous')
        boxClass[index].removeAttribute('isBlocked')
        boxClass[index].removeAttribute('distanceGn')
        boxClass[index].removeAttribute('distanceHn')
        boxClass[index].removeAttribute('isMazeVisted')
        boxClass[index].removeAttribute('previousLink')
    }
}

drawGrid();
startEndNodes();
sealBoundary();

function allDijkastra(){
    
    setDijkastraProperty= function(){
        let boxClass = document.getElementsByClassName('box')
        console.log(boxClass)
        for (var index = 0 ; index < (rows*columns); index++){
            boxClass[index].setAttribute('distance',Infinity)
            boxClass[index].setAttribute('isVisited',false)
            boxClass[index].setAttribute('isPath',false)
            boxClass[index].setAttribute('previous',null)
            if (boxClass[index].getAttribute('isblocked') === 'true'){
                continue;
            }
            else{
                boxClass[index].setAttribute('isblocked',false)
            }
        }
    }
    setDijkastraProperty();
 
    //div attributes
    
    let leftNode;
    let rightNode;
    let upNode;
    let downNode;
    let timeOut;
    
    getBoundary = function(){
      let boundaryNode = []
      let additional = 0
      for (let index = 0 ; index < columns ; index++){
        boundaryNode.push(index)
      }
      for (let index = 0 ; index < rows ; index++){
        additional += columns
        boundaryNode.push(additional)
        boundaryNode.push(additional-1)
      }
      boundaryNode.pop()
      return boundaryNode
    }
    
    checkBoundary = function(checkElement)
    {
        let getBoundaryArray = getBoundary()
        if (getBoundaryArray.includes(checkElement)){
            return true
        }
        else{
            return false
        }
    }
    

    nonVisited = function(){
        let noneVisited = []
        for (var index = 0 ; index < (rows*columns); index++){
            noneVisited.push(index)
        }
        return noneVisited
    }
    
    dijkstra = function(){
        let notVistedNode = nonVisited()
        let startNodeDiv = getNodeDiv(startNode)
        distance = 0
        startNodeDiv.setAttribute('distance',distance)
        notVistedNode = notVistedNode.filter(e=>e !== startNode)
        let queue = []
        neighbourOfCurrentNode = [startNode]
        j = 1
        endNodeDiv = getNodeDiv(endNode)
        endNodeVisited = endNodeDiv.getAttribute('isVisited')
        let animate;
        timeOut = 1
        while(j<totalCell)
        {
            animate = setTimeout(function(){
            distance = distance + 1
            neighbourOfCurrentNode.some(element => {
                if (element===endNode){
                    j = totalCell + 1
                    return true
                }
                getNeighbourDiv = getNodeDiv(element)
                isWall = getNeighbourDiv.getAttribute('isblocked')
                if (isWall === 'false'){
                    getNeighbourDiv.setAttribute('distance',distance)
                    getNeighbourDiv.setAttribute('isVisited',true)
                    newNeighbours = getNeighbours(element)
                    newNeighbours = newNeighbours.filter(e => e > 0 && e < 1275 && notVistedNode.includes(e))
                    newNeighbours.forEach(function(individualNeighbour){
                        let newNeighbourDiv = getNodeDiv(individualNeighbour)
                        if (newNeighbourDiv.getAttribute('isVisited')==="false"){
                            newNeighbourDiv.setAttribute('previous',element)
                            queue.push(individualNeighbour) 
                        }                   
                    })
                    notVistedNode = notVistedNode.filter(e=>e !== element)
                } 
            });
            queue = queue.filter(function(elem, index, self) {
                return index === self.indexOf(elem);
            })
            neighbourOfCurrentNode = queue.filter(e => e > 0 && e < 1275 && notVistedNode.includes(e))
            },90*j)
            j++
            timeOut ++;
        }
        clearInterval(animate)
    }
    function getNodesInShortestPathOrder() {
        const nodesInShortestPathOrder = [];
        let currentNode = endNode;
        while (currentNode !== 'null') {
            nodesInShortestPathOrder.push(parseInt(currentNode));
            getPreviousDiv = getNodeDiv(currentNode)
            getPrevious = getPreviousDiv.getAttribute('previous')
            currentNode = getPrevious
        }
        return nodesInShortestPathOrder;
    }
    
    
    animateShortestPath  = function () {
        getPath = getNodesInShortestPathOrder()
        getPath.forEach(function(individualPath){
            if (individualPath !== startNode && individualPath !== endNode){
                console.log(individualPath)
                getPathDiv = getNodeDiv(individualPath)
                console.log(getPathDiv)
                getPathDiv.setAttribute('isPath',true)
            }
        })
        // clearInterval(animatePath)
    }

    dijkstra()
    wrapper = function(){
        animateShortestPath()
    }
    setTimeout(wrapper,10*timeOut)
}



let btn = document.getElementById('visualize')
let clear = document.getElementById('clear')
let maze = document.getElementById('maze')


document.addEventListener('mouseup',function(event){
    if (checkDraggedStartEnd(event)){
        if ( event.target.getAttribute('isBlocked')==='false'){
            event.target.classList.add('blocked')
            event.target.setAttribute('isBlocked',true)
        }
        else{
            event.target.classList.remove('blocked')
            event.target.setAttribute('isBlocked',false)
        }
    }
})


let dragged;
document.addEventListener("dragstart", function(event) {
    event.dataTransfer.effectAllowed = "copy";
    dragged = event;
    console.log(dragged)
}, false);



grids.addEventListener("dragover", function(event) {
    event.preventDefault();
    if ((dragged.target.id !== 'node' + startNode) && (dragged.target.id !== 'node' + endNode)){
        if (checkDraggedStartEnd(event)){
            event.target.setAttribute('isBlocked',true)
            event.target.classList.add('blocked')
        }
    }
  }, false);

grids.addEventListener("drop", function(event) {
    if (dragged.target.id === 'node' + startNode){
        getIdCurrent= event.target.id
        getnodeNumber = parseInt(getIdCurrent.substring(4))
        if (getnodeNumber !== endNode && !leftBoundary(getnodeNumber)
        && !leftBoundary(getnodeNumber)){
            dragged.target.classList.remove('start')
            event.target.classList.add('start')
            startNode = getnodeNumber 
        }
        console.log(startNode)
    }
    else if (dragged.target.id === 'node' + endNode){
        getIdCurrent= event.target.id
        getnodeNumber = parseInt(getIdCurrent.substring(4))
        if (getnodeNumber !== startNode  && !leftBoundary(getnodeNumber) && !leftBoundary(getnodeNumber)){
            dragged.target.classList.remove('end')
            event.target.classList.add('end')
            endNode = getnodeNumber 
        }
    }
    event.dataTransfer.dropEffect = "copy";
  }, false);



btn.addEventListener('click', function(){
    switch (selectedAlgorithm) {
        case 'dijkstra':
            allDijkastra();
            break;
        case 'astar':
            allAstar();
            break;
        case 'breadthfirst':
            // allDeapthFirstSearch()
            break;
        case 'depthfirst':
            allDeapthFirstSearch()
            break;
    }
})

maze.addEventListener('click', function(){
    generateRandomMaze();
})

clear.addEventListener('click', function(){
    // clearBoard();
    location.reload();
})


// ............................................................................................................................//
// A star //


function allAstar(){
    setProperty = function(){
        let boxClass = document.getElementsByClassName('box')
        console.log(boxClass)
        for (var index = 0 ; index < (rows*columns); index++){
            boxClass[index].setAttribute('distanceGn',Infinity)
            boxClass[index].setAttribute('distanceHn',Infinity)
            boxClass[index].setAttribute('isVisited',false)
            boxClass[index].setAttribute('isPath',false)
            boxClass[index].setAttribute('previous',null)
            if (boxClass[index].getAttribute('isblocked') === 'true'){
                continue;
            }
            else{
                boxClass[index].setAttribute('isblocked',false)
            }
        }
    }
    setProperty();
    let leftNode;
    let rightNode;
    let upNode;
    let downNode;
    
    getBoundary = function(){
      let boundaryNode = []
      let additional = 0
      for (let index = 0 ; index < columns ; index++){
        boundaryNode.push(index)
      }
      for (let index = 0 ; index < rows ; index++){
        additional += columns
        boundaryNode.push(additional)
        boundaryNode.push(additional-1)
      }
      boundaryNode.pop()
      return boundaryNode
    }
    
    checkBoundary = function(checkElement)
    {
        let getBoundaryArray = getBoundary()
        if (getBoundaryArray.includes(checkElement)){
            return true
        }
        else{
            return false
        }
    }
    
    getNeighbours = function(currentNode){
        let neighboour = []
        leftNode = currentNode - 1
        rightNode = currentNode + 1
        upNode = currentNode - columns
        downNode = currentNode + columns
        neighboour.push(upNode)
        if (!rightBoundary(rightNode)){
            neighboour.push(rightNode)
        }
        neighboour.push(downNode)
        if (!leftBoundary(leftNode)){
            neighboour.push(leftNode)
        }
        return neighboour
    }
    
    getNodeDiv = function(node){
        return document.getElementById('node'+ node)
    }
    
    nonVisited = function(){
        let noneVisited = []
        for (var index = 0 ; index < totalCell; index++){
            noneVisited.push(index)
        }
        return noneVisited
    }
    
    aStarGn = function(){
        let notVistedNode = nonVisited()
        let startNodeDiv = getNodeDiv(startNode)
        distanceGn = 0
        startNodeDiv.setAttribute('distanceGn',distanceGn)
        notVistedNode = notVistedNode.filter(e=>e !== startNode)
        let queue = []
        neighbourOfCurrentNode = getNeighbours(startNode)
        neighbourOfCurrentNode = neighbourOfCurrentNode.filter(e=>e>0 && e<totalCell)
        neighbourOfCurrentNode.forEach(
            function(eachNeighbour) {
                eachNeighbourDiv = getNodeDiv(eachNeighbour)
                // eachNeighbourDiv.setAttribute('previous',startNode)
            }
        )
        neighbourOfCurrentNode = neighbourOfCurrentNode.filter(e => e > 0 && e < totalCell)
        j = 1
        // endNodeDiv = getNodeDiv(endNode)
        // endNodeVisited = endNodeDiv.getAttribute('isVisited')
        // console.log(endNodeVisited)
        let animate;
        while(j<60)
        {
            // animate = setTimeout(function(){
            distanceGn = distanceGn + 1
            neighbourOfCurrentNode.forEach(element => {
                getNeighbourDiv = getNodeDiv(element)
                isWall = getNeighbourDiv.getAttribute('isblocked')
                if (isWall === 'false'){
                    getNeighbourDiv.setAttribute('distanceGn',distanceGn)
                    // getNeighbourDiv.setAttribute('isVisitedGn',true)
                    newNeighbours = getNeighbours(element)
                    newNeighbours = newNeighbours.filter(e => e > 0 && e < totalCell && notVistedNode.includes(e))
                    newNeighbours.forEach(function(individualNeighbour){
                        // let newNeighbourDiv = getNodeDiv(individualNeighbour)
                        // if (newNeighbourDiv.getAttribute('isVisitedGn')==="false"){
                        //     newNeighbourDiv.setAttribute('previous',element)
                            queue.push(individualNeighbour) 
                        // }                   
                    })
                    notVistedNode = notVistedNode.filter(e=>e !== element)
                } 
            });
    
            queue = queue.filter(function(elem, index, self) {
                return index === self.indexOf(elem);
            })
            neighbourOfCurrentNode = queue.filter(e => e > 0 && e < totalCell && notVistedNode.includes(e))
            // },90*j)
            j++
        }
        // clearInterval(animate)
    }

    aStarHn = function(){
        let notVistedNode = nonVisited()
        let endNodeDiv = getNodeDiv(endNode)
        distanceHn = 0
        endNodeDiv.setAttribute('distanceHn',distanceHn)
        notVistedNode = notVistedNode.filter(e=>e !== endNode)
        let queue = []
        neighbourOfCurrentNode = getNeighbours(endNode)
        neighbourOfCurrentNode = neighbourOfCurrentNode.filter(e=>e>0 && e<totalCell)
        neighbourOfCurrentNode.forEach(
            function(eachNeighbour) {
                eachNeighbourDiv = getNodeDiv(eachNeighbour)
                // eachNeighbourDiv.setAttribute('previous',endNode)
            }
        )
        neighbourOfCurrentNode = neighbourOfCurrentNode.filter(e => e > 0 && e < totalCell)
        j = 1
        let animate;
        while(j<60)
        {
            // animate = setTimeout(function(){
            distanceHn = distanceHn + 1
            neighbourOfCurrentNode.forEach(element => {
                getNeighbourDiv = getNodeDiv(element)
                isWall = getNeighbourDiv.getAttribute('isblocked')
                if (isWall === 'false'){
                    getNeighbourDiv.setAttribute('distanceHn',distanceHn)
                    newNeighbours = getNeighbours(element)
                    newNeighbours = newNeighbours.filter(e => e > 0 && e < totalCell && notVistedNode.includes(e))
                    newNeighbours.forEach(function(individualNeighbour){
                        // let newNeighbourDiv = getNodeDiv(individualNeighbour)
                        // if (newNeighbourDiv.getAttribute('isVisitedHn')==="false"){
                            // newNeighbourDiv.setAttribute('previous',element)
                            queue.push(individualNeighbour) 
                        // }                   
                    })
                    notVistedNode = notVistedNode.filter(e=>e !== element)
                } 
            });
    
            queue = queue.filter(function(elem, index, self) {
                return index === self.indexOf(elem);
            })
            neighbourOfCurrentNode = queue.filter(e => e > 0 && e < totalCell && notVistedNode.includes(e))
            // },90*j)
            j++
        }
        // clearInterval(animate)
    }
    
    
    function hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }
    function getTotalCost(element){
        // console.log(element)
        elementDiv = getNodeDiv(element)
        gN = elementDiv.getAttribute('distanceGn')
        hN = elementDiv.getAttribute('distanceHn')
        tN = parseInt(gN) + parseInt(hN)
        return tN
    }

    function getNodesInShortestPathOrder() {
        let nodesInShortestPathOrder = [];
        let visitedPath = []
        let currentNode = startNode;
        // parseInt(currentNode) !== endNode
        j = 1 
        while (true) {
            if (parseInt(currentNode) === endNode)
            {
                break;  
            } 
            // animate =  setInterval(function(){
                pathDiv = getNodeDiv(currentNode)
                getAllNeighboursElements = getNeighbours(currentNode)
                console.log(getAllNeighboursElements)
                getAllNeighboursElements = getAllNeighboursElements.filter(e=> e > 0 && e < totalCell )
                getAllNeighboursElements = getAllNeighboursElements.filter(e => getNodeDiv(e).getAttribute('isblocked') === 'false')
                // getAllNeighboursElements = getAllNeighboursElements.filter(e=> getNodeDiv(e).getAttribute('isPath') === 'true')
                getAllNeighboursElements.forEach(function(individualNeighbour){
                    getIndividualNeighbourDiv = getNodeDiv(individualNeighbour)
                    getIndividualNeighbourDiv.setAttribute('isVisited',true)
                })
                console.log(getAllNeighboursElements)
                fixedNode = getAllNeighboursElements.reduce(function(e1,e2){
                    e1Div = getTotalCost(e1)
                    e2Div = getTotalCost(e2)
                    if (e1Div !== e2Div){
                        return ( e1Div < e2Div ? e1 : e2)
                    }
                    else{
                        e1HnDiv = getNodeDiv(e1)
                        hN1 = parseInt(e1HnDiv.getAttribute('distanceHn'))
                        e2HnDiv = getNodeDiv(e2)
                        hN2 = parseInt(e2HnDiv.getAttribute('distanceHn'))
                        console.log(hN1,hN2)
                        return ( hN1 < hN2  ? e1 : e2)
                    }
                }) 
                console.log(fixedNode)
                indexFixedNode = getAllNeighboursElements.indexOf(fixedNode)
                nextNode = getAllNeighboursElements[indexFixedNode]
                nodesInShortestPathOrder.push(nextNode)
                currentNode = nextNode          
            // },100*j)
            j++  
        }
        // clearInterval(animate)
        return nodesInShortestPathOrder
    }
        
        
    animateShortestPathAStar  = function () {
        getPath = getNodesInShortestPathOrder()
        getPath.pop()
        getPath.forEach(function(individualPath){
            getPathDiv = getNodeDiv(individualPath)
            getPathDiv.setAttribute('isPath',true)
        })
    }

    aStarGn();
    aStarHn();
    // getNodesInShortestPathOrder();
    animateShortestPathAStar();
}


