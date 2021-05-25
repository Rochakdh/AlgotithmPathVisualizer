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
    
    function Maze() {
        let firstNode = 1
        let vistedTracker = [firstNode]
        neighbourArray = [firstNode]
        setLinkedList = []
        getNodeDiv(firstNode).setAttribute('isMazeVisted',true)
        eachElementNeighbour = getNeighbours(firstNode)
        j = 1 
        let i = 0
        while(j<totalCell){
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
                console.log(poppedElement)
                poppedDiv = getNodeDiv(poppedElement)
                poppedDiv.setAttribute('isBlocked',true)
                poppedDiv.classList.add('blocked')
            }
            eachElementNeighbour = getNeighbours(vistedTracker[vistedTracker.length-1])
            j++
        }
    }
    setAllMazeVisitedToFalse()
    Maze()
}

// generateRandomMaze();
