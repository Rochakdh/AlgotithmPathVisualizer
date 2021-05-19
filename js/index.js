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
        // 'isBlocked':false
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
    // box.setAttribute('isblocked',isBlocked)
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
    }
})


document.addEventListener("dragover", function(event) {
    if (checkDraggedStartEnd(event)){
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
    // let getBoundaryArray = getBoundary()
    leftNode = currentNode - 1
    rightNode = currentNode + 1
    upNode = currentNode - columns
    downNode = currentNode + columns
    // if (upNode > -1 ){
        neighboour.push(upNode)
    // }
    if (!rightBoundary(rightNode)){
        neighboour.push(rightNode)
    }
    // if (downNode<1275){
        neighboour.push(downNode)
    // }
    if (!leftBoundary(leftNode)){
        neighboour.push(leftNode)
     }
    return neighboour
}

let animate;
dijkstra = function(){
    let getStartNodeById = document.getElementById('node'+ startNode)
    getStartNodeById.setAttribute('distance',0)
    let previousDistance = 0
    let getNeighbourArray = getNeighbours(startNode)
    flag = 0
    let visited = []
    while (flag < 25){
        animate = setTimeout(function(){
          previousDistance += 1
          newArray = []
          getNeighbourArray.forEach(element => {
            console.log(element)
            let getNeighbourNodeById = document.getElementById('node'+ element)
            getNeighbourNodeById.setAttribute('distance',previousDistance)
            getNeighbourNodeById.setAttribute('isVisited',true)
            visited.push(element)
            getNeighboursOfNewElemnet = getNeighbours(element)
            getNeighboursOfNewElemnet.forEach(function(newNeighbours){
            // checkNotVisited = visited.includes(element)
                if (newNeighbours!==startNode && newNeighbours!==endNode && !visited.includes(newNeighbours)){
                    newArray.push(newNeighbours)
                }
            })
        });
        getNeighbourArray = newArray.filter(e => -1 < e && e < 1275 && !visited.includes(e))
        console.log(getNeighbourArray,newArray)
        console.log(visited)
        },10)
        flag ++;
    }
    clearInterval(animate) 
}
dijkstra() 


function rightBoundary(index) {
    colCount = columns
    const colPosition = index % colCount;
    const rowPosition = Math.floor(index / colCount);
    console.log(rowPosition,colPosition)
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
    console.log(rowPosition,colPosition)
    if (colPosition==0) {
        return true
    } else {
        return false
    } 
}
 