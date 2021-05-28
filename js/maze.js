function generateRandomMaze(){
    
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    
    function areAllNodeVisited(nodeArray){
        initialVisit = 0 
        nodeArray.forEach(element => {
            getNode = getNodeDiv(element)
            if (getNode.getAttribute('isMazeVisted') === 'true'){
                initialVisit += 1
            }
        });
        if (initialVisit === nodeArray.length){
            return true
        }
        else {
            return false
        }
    }
    
    function setAllMazeVisitedToFalse(){
        for (var index = 0 ; index < totalCell; index++){
            if (!rightBoundary(index) || !leftBoundary(index)){
                getBoundaryDiv = getNodeDiv(index)
                getBoundaryDiv.setAttribute('isMazeVisted',false)
                getBoundaryDiv.setAttribute('previousLink', 0)
                getBoundaryDiv.setAttribute('isBlocked',true)
                getBoundaryDiv.classList.add('blocked')   
    
            }
        }   
    }

    function removeBlock(node){
        getBoundaryDiv = getNodeDiv(node)
        getBoundaryDiv.setAttribute('isBlocked',false)
        getBoundaryDiv.classList.remove('blocked')   
    }
    
    function Maze() {
        let firstNode = 1
        let vistedTracker = [firstNode]
        neighbourArray = [firstNode]
        setLinkedList = []
        getNodeDiv(firstNode).setAttribute('isMazeVisted',true)
        eachElementNeighbour = getNeighbours(firstNode)
        startCell = 1 
        while(startCell<totalCell){
            eachElementNeighbour = eachElementNeighbour.filter (e => e > 0 && e < totalCell)
            if (!areAllNodeVisited(eachElementNeighbour)){
                eachElementNeighbour = eachElementNeighbour.filter (e => getNodeDiv(e).getAttribute('isMazeVisted') ==='false')
                shuffled = shuffle(eachElementNeighbour)
                selectOneNeighbours = shuffled[0]
                shuffledDiv = getNodeDiv(selectOneNeighbours)
                shuffledDiv.setAttribute('isMazeVisted',true)
                shuffledDiv.setAttribute('isBlocked',false)
                shuffledDiv.classList.remove('blocked') 
                shuffledDiv.setAttribute('previousLink',vistedTracker[vistedTracker.length-1])
                vistedTracker.push(selectOneNeighbours)
            }
            else{
                poppedElement = vistedTracker.pop()
                poppedDiv = getNodeDiv(poppedElement)
                if(poppedElement!==startNode && poppedElement!==endNode){
                    poppedDiv.setAttribute('isBlocked',true)
                    poppedDiv.classList.add('blocked')
                }
            }
            eachElementNeighbour = getNeighbours(vistedTracker[vistedTracker.length-1])
            startCell++
        }
    }
    setAllMazeVisitedToFalse()
    Maze()
    removeBlock(startNode);
    removeBlock(endNode);
}