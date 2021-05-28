function allDijkastra(){

    let vistedLength;
    let visitedNodes = []

    function setDijkastraProperty(){
        let boxClass = document.getElementsByClassName('box')
        for (var index = 0 ; index < totalCell; index++){
            boxClass[index].setAttribute('distance',Infinity)
            boxClass[index].setAttribute('isVisited',false)
            boxClass[index].setAttribute('previousVisited',false)
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
    
    function animatePath(){
        let animate;
        vistedLength = visitedNodes.length
        visitedNodes.forEach(function(element,index){
            if(!startNodeDragging){
                animate = setTimeout(function(){
                animatePathDiv = getNodeDiv(element)
                animatePathDiv.setAttribute('isVisited',true)
                },10*index)
            }
            else{
                animatePathDiv = getNodeDiv(element)
                animatePathDiv.setAttribute('isVisited',true)
            }
        })
        clearTimeout(animate)
    }

    function dijkstra(){

        let notVistedNode = nonVisited()
        let startNodeDiv = getNodeDiv(startNode)
        let distance = 0
        let queue = []
        let flagDijkastra = true

        startNodeDiv.setAttribute('distance',distance)
        notVistedNode = notVistedNode.filter(e=> e !== startNode)
        neighbourOfCurrentNode = [startNode]
        cellStart = 1
        endNodeDiv = getNodeDiv(endNode)
        endNodeVisited = endNodeDiv.getAttribute('isVisited')

        while(flagDijkastra)
        {
            distance = distance + 1
            neighbourOfCurrentNode.some(element => {
                if (element===endNode || cellStart > totalCell){
                    flagDijkastra = false
                    return true
                }
                getNeighbourDiv = getNodeDiv(element)
                isWall = getNeighbourDiv.getAttribute('isblocked')
                if (isWall === 'false'){
                    getNeighbourDiv.setAttribute('distance',distance)
                    visitedNodes.push(element)
                    newNeighbours = getNeighbours(element)
                    newNeighbours = newNeighbours.filter(e => e > 0 && e < totalCell && e !== startNode && notVistedNode.includes(e))
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

            queue = queue.filter(function(element, index, self) {
                return index === self.indexOf(element);
            })
            neighbourOfCurrentNode = queue.filter(e => e > 0 && e < totalCell && notVistedNode.includes(e))
            cellStart++
        }
        // animatePath();
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
    
    
    function animateShortestPath() {

        getPath = getNodesInShortestPathOrder()
        getPath.forEach(function(individualPath){
            if (individualPath !== startNode && individualPath !== endNode){
                getPathDiv = getNodeDiv(individualPath)
                getPathDiv.setAttribute('isPath',true)
            }
        })
    }

    setDijkastraProperty();
    dijkstra();

    function shortestPath(){

        animateShortestPath();
    }

    if(!startNodeDragging){

        setTimeout(shortestPath,vistedLength*20)
    }
    else{
        setTimeout(shortestPath,500)
    }
  
}