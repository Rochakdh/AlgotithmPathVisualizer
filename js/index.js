const grids = document.querySelector('.grids')
const boxSize =  25
const columns = Math.floor(window.innerWidth / boxSize)
const rows = 25


grids.style.setProperty("grid-template-columns", `repeat(${columns}, 1fr)`)
grids.style.setProperty("grid-template-rows", `repeat(${rows}, 1fr)`)

let box;

divAttributes = function(){
    let attributes ={
        'distance': Infinity,
        'isVisited': false,
        'isBlocked':false
    }
    return attributes
}

let {distance,isVisited} = divAttributes()
console.log(distance,isVisited)
for (var index = 0 ; index < (rows*columns); index++){
    box = document.createElement('div')
    box.id = 'node' + index
    box.style.width =  boxSize + 'px'
    box.style.height = boxSize + 'px'
    // box.innerHTML = index
    box.setAttribute('distance',distance)
    box.setAttribute('isVisited',false)
    box.setAttribute('isblocked',false)
    grids.appendChild(box).className = 'box'
}

function randomNumberFromRange(min,max){
    return size = parseInt(Math.random() * (max - min) + min);
}

let startNode;
let endNode;
startEndNodes = function (){
    startNode = randomNumberFromRange(0,rows*columns)
    endNode = randomNumberFromRange(0,rows*columns)
    if (startNode === endNode){
        endNode = randomNumberFromRange(0,rows*columns)
    }
    document.getElementById(`node${startNode}`).classList.add('start')
    document.getElementById(`node${endNode}`).classList.add('end')
}
startEndNodes();



checkDraggedStartEnd = function(eventThrown){
    if (
        eventThrown.target.id != `node${startNode}` &&  eventThrown.target.id != `node${endNode}` 
        && eventThrown.target.className === 'box'
        ){
            return true
        }
    return false
}


document.addEventListener('mouseup',function(event){
    if (checkDraggedStartEnd(event)){
        event.target.classList.add('blocked')
        event.target.setAttribute('isBlocked',true)
    }
})


document.addEventListener("dragover", function(event) {
    if (checkDraggedStartEnd(event)){
        event.target.setAttribute('isBlocked',true)
        event.target.classList.add('blocked')
    }
}, false);


//Algorithm 
//div attributes

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
    currentNode = startNode
    notVistedNode = notVistedNode.filter(e=>e !== currentNode)
    let queue = []
    neighbourOfCurrentNode = getNeighbours(currentNode)
    neighbourOfCurrentNode = neighbourOfCurrentNode.filter(e => e > 0 && e < 1275)
    j = 1
    endNodeDiv = getNodeDiv(endNode)
    endNodeVisited = endNodeDiv.getAttribute('isVisited')
    console.log(endNodeVisited)
    let animate;
    while(j<60)
    {
        animate = setTimeout(function(){
        distance = distance + 1
        neighbourOfCurrentNode.forEach(element => {
            if (element===endNode){
                console.log('-----------------------')
            }
            getNeighbourDiv = getNodeDiv(element)
            isWall = getNeighbourDiv.getAttribute('isblocked')
            if (isWall === 'false'){
                getNeighbourDiv.setAttribute('distance',distance)
                getNeighbourDiv.setAttribute('isVisited',true)
                newNeighbours = getNeighbours(element)
                newNeighbours.forEach(function(individualNeighbour){
                    queue.push(individualNeighbour)
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
    }
    clearInterval(animate)
}


function rightBoundary(index) {
    colCount = columns
    const colPosition = index % colCount;
    const rowPosition = Math.floor(index / colCount);
    // console.log(colPosition)
    if (colPosition==(colCount-1)) {
        return true
    } else {
        return false
    } 
}

function leftBoundary(index) {
    colCount = columns
    const colPosition = index % colCount;
    const rowPosition = Math.floor(index / colCount);
    if (colPosition==0) {
        return true
    } else {
        return false
    } 
}

let btn = document.getElementById('visualize')
let clear = document.getElementById('clear')
btn.addEventListener('click', function(){
    dijkstra()
})
clear.addEventListener('click', function(){
    location.reload();
})