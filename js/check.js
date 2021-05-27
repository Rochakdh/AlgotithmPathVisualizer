function allDeapthFirstSearch(){
    let distance = 0;
    let vistedPath = []
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    
    function areAllNodeVisited(nodeArray){
        initialVisit = 0 
        nodeArray.forEach(element => {
            getNode = getNodeDiv(element)
            if (getNode.getAttribute('isVisited') === 'true' || getNode.getAttribute('isBlocked') === 'true'){
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
    
    setDfsProperty= function(){
        let boxClass = document.getElementsByClassName('box')
        console.log(boxClass)
        for (var index = 0 ; index < (rows*columns); index++){
            boxClass[index].setAttribute('distance',distance)
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

    function deapthFirstSearch() {
        let firstNode = startNode
        let vistedTracker = [firstNode]
        neighbourArray = [firstNode]
        getNodeDiv(firstNode).setAttribute('isVisited',true)
        eachElementNeighbour = getNeighbours(firstNode)
        startCell = 1 
        pointer = firstNode
        indexFlag = 0
        breakFlag = false
        while(startCell<totalCell){ 
            animate = setTimeout(function(){
                distance = distance + 1
                eachElementNeighbour = eachElementNeighbour.filter (e => e > 0 && e < totalCell)
                console.log(eachElementNeighbour)
                if (!areAllNodeVisited(eachElementNeighbour) && !breakFlag){
                    eachElementNeighbour = eachElementNeighbour.filter (e => getNodeDiv(e).getAttribute('isVisited') ==='false')
                    eachElementNeighbour = eachElementNeighbour.filter (e => getNodeDiv(e).getAttribute('isBlocked') ==='false')
                    selectOneNeighbours = eachElementNeighbour[indexFlag]
                    downDiv = getNodeDiv(selectOneNeighbours)
                    downDiv.setAttribute('isVisited',true)
                    downDiv.setAttribute('distance',distance)
                    downDiv.setAttribute('previous',vistedTracker[vistedTracker.length-1])
                    vistedTracker.push(selectOneNeighbours)
                    vistedPath.push(selectOneNeighbours)
                    console.log(downDiv)
                    if (selectOneNeighbours === endNode){
                        breakFlag = true
                        animateDfs()
                        clearTimeout(animate)
                    }
                }
                else{
                    vistedTracker.pop()
                }
                eachElementNeighbour = getNeighbours(vistedTracker[vistedTracker.length-1])
            },100*startCell)
            startCell++
        }
    }
    animateDfs= function(){
        // j = 1
        vistedPath.forEach(function(element){
            // animate = setTimeout(function(){
                downDiv = getNodeDiv(element)
                // downDiv.setAttribute('isVisited',false)
                downDiv.setAttribute('isPath',true)
                // downDiv.innerHTML = j
                // j++
                // if(j>vistedPath.length){
                //     setTimeout(animate)
                // }
            // },100*j)
        })
    }
    setDfsProperty()
    deapthFirstSearch()
    // wrapper = function(){
    //     animateDfs()
    // }
    // setTimeout(wrapper,3000)
}
