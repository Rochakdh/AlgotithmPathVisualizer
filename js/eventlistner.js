let btn = document.getElementById('visualize')
let clear = document.getElementById('clear')
let maze = document.getElementById('maze')
let dragged;

function checkDroppableLocation(eventId, starOrEnd){
    getIdCurrent= eventId.target.id
    getnodeNumber = parseInt(getIdCurrent.substring(4))
    if (getnodeNumber !== endNode && !leftBoundary(getnodeNumber) && !rightBoundary(getnodeNumber)){
        dragged.target.classList.remove(starOrEnd)
        eventId.target.classList.add(starOrEnd)
        startNode = getnodeNumber 
    }
}

function switchCaseDuringDrag(){
    switch (selectedAlgorithm) {
        case 'dijkstra':
            startNodeDragging = true
            clearBoard();
            allDijkastra();
            startNodeDragging = false
            break;
        case 'astar':
            clearBoard();
            allAstar();
            break;
        case 'breadthfirst':
            startNodeDragging = true
            clearBoard();
            allDijkastra();
            startNodeDragging = false
        case 'depthfirst':
            clearBoard();
            allDeapthFirstSearch()
            break;
    }
}

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

    checkPath = isPathClaculated()
    if (dragged.target.id === 'node' + startNode){

        if(checkPath){
            checkDroppableLocation(event,'start');
            switchCaseDuringDrag();
        }
        else{
            checkDroppableLocation(event,'start'); 
        }
    }
    else if (dragged.target.id === 'node' + endNode){
        
        if(checkPath){
            checkDroppableLocation(event,'end');
            switchCaseDuringDrag();

        }
        else{
            checkDroppableLocation(event,'end');
        }
    }
    event.dataTransfer.dropEffect = "copy";
}, false);

btn.addEventListener('click', function(){
    switch (selectedAlgorithm) {
        case 'dijkstra':
            console.log(selectedAlgorithm)
            allDijkastra();
            break;
        case 'astar':
            allAstar();
            break;
        case 'breadthfirst':
            allDijkastra();
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
    
    location.reload();
})