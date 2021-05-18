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
    box.innerHTML = index
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

boundaryElements = function(){
  let boundaryArray = []
}


getNeighbours = function(currentNode){
    let neighbouringArray = []
    leftNode = currentNode - 1
    rightNode = currentNode + 1
    if (currentNode > columns){
        upNode = currentNode - columns
    }
    if (currentNode < rows * columns - columns){
      downNode = currentNode + columns 
    }
    
    let allNodes = [upNode,rightNode,downNode,leftNode]
    allNodes.forEach(function(nodes){
      if (node === node-node){}
      
      
    })

  return allNodes
    
}


dijkstra = function(){
    let getStartNodeById = document.getElementById('node'+ startNode)
    getStartNodeById.setAttribute('distance',0)
    let previousDistance = 0
    let getNeighbourArray = getNeighbours(startNode)
    console.log(getNeighbourArray)
    flag = 0
    // !getNeighbourArray.includes(endNode)
    while (flag < 4){
        console.log('yess')
        previousDistance += 1
        newArray = []
        getNeighbourArray.forEach(element => {
            console.log(`node${element}`)
            let getNeighbourNodeById = document.getElementById('node'+element)
            console.log(getNeighbourNodeById)
            console.log(getNeighbourNodeById.isVisited)
            console.log(!!getNeighbourNodeById.getAttribute('isVisited'))
            if ((!! (getNeighbourNodeById.getAttribute('isVisited'))) &&  
              element !== startNode && element !== endNode
            )
            {
                getNeighbourNodeById.setAttribute('distance',previousDistance)
                getNeighbourNodeById.setAttribute('isVisited',true)
                getNeighbourNodeById.style.background='yellow'
                getNeighboursOfNewElemnet = getNeighbours(element)
                getNeighboursOfNewElemnet.forEach(function(newNeighbours){
                  newArray.push(newNeighbours)
                })
            }
        });
  
        getNeighbourArray = newArray
        console.log(newArray,getNeighbourArray)
        flag ++;
    } 
}
dijkstra() 


