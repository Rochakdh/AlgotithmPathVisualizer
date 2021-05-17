const grids = document.querySelector('.grids')

const boxSize =  25
const columns = Math.floor(window.innerWidth / boxSize)
const rows = 25


grids.style.setProperty("grid-template-columns", `repeat(${columns}, 1fr)`)
grids.style.setProperty("grid-template-rows", `repeat(${rows}, 1fr)`)

let box;

for (var index = 0 ; index < (rows*columns); index++){
    box = document.createElement('div')
    box.id = 'node' + index
    box.style.width =  boxSize + 'px'
    box.style.height = boxSize + 'px'
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
    console.log(event.target.className)
    if (checkDraggedStartEnd(event)){
        event.target.classList.add('blocked')
    }
})


document.addEventListener("dragover", function(event) {
    if (checkDraggedStartEnd(event)){
        event.target.classList.add('blocked')
    }
}, false);

