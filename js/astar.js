function allAstar(){
    setProperty = function(){
        let boxClass = document.getElementsByClassName('box')
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
        while(j<totalCell/4)
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
        notVistedNode = notVistedNode.filter(e => e !== endNode)
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
        while(j<totalCell/4)
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
    
    
    function getTotalCost(element){
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

    setProperty();
    aStarGn();
    aStarHn();
    animateShortestPathAStar();
}