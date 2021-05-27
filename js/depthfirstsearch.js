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
            if (getNode.getAttribute('previouslyVisited') === 'true' || getNode.getAttribute('isBlocked') === 'true'){
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
            boxClass[index].setAttribute('previouslyVisited',false)
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
        getNodeDiv(firstNode).setAttribute('previouslyVisited',true)
        eachElementNeighbour = getNeighbours(firstNode)
        startCell = 1 
        pointer = firstNode
        indexFlag = 0
        breakFlag = false
        while(vistedTracker.length){ 
                distance = distance + 1
                eachElementNeighbour = eachElementNeighbour.filter (e => e > 0 && e < totalCell)
                console.log(eachElementNeighbour)
                if (!areAllNodeVisited(eachElementNeighbour) && !breakFlag){
                    eachElementNeighbour = eachElementNeighbour.filter (e => getNodeDiv(e).getAttribute('previouslyVisited') ==='false')
                    eachElementNeighbour = eachElementNeighbour.filter (e => getNodeDiv(e).getAttribute('isBlocked') ==='false')
                    selectOneNeighbours = eachElementNeighbour[indexFlag]
                    downDiv = getNodeDiv(selectOneNeighbours)
                    downDiv.setAttribute('previouslyVisited',true)
                    downDiv.setAttribute('distance',distance)
                    downDiv.setAttribute('previous',vistedTracker[vistedTracker.length-1])
                    vistedTracker.push(selectOneNeighbours)
                    vistedPath.push(selectOneNeighbours)
                    console.log(downDiv)
                    if (selectOneNeighbours === endNode){
                        breakFlag = true
                    }
                }
                else{
                    vistedTracker.pop()
                }
                eachElementNeighbour = getNeighbours(vistedTracker[vistedTracker.length-1])
            // },100*startCell)
            startCell++
        }
        vistedPath.forEach(function(element,index){
            animate = setTimeout(function(){
                downDiv = getNodeDiv(element)
                downDiv.setAttribute('isVisited',true)
            },100*index)
        })
        clearTimeout(animate)
    }
    animateDfs= function(){
        vistedPath.forEach(function(element,index){
            animate = setTimeout(function(){
                downDiv = getNodeDiv(element)
                downDiv.setAttribute('isPath',true)
            },20*index)
        })
        clearTimeout(animate)
    }
    setDfsProperty()
    deapthFirstSearch()
    wrapper = function(){
        animateDfs()
    }
    setTimeout(wrapper,vistedPath.length*100)
}
