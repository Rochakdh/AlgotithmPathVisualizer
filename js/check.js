let animate;
dijkstra = function(){
    let getStartNodeById = document.getElementById('node'+ startNode)
    getStartNodeById.setAttribute('distance',0)
    let previousDistance = 0
    let getNeighbourArray = getNeighbours(startNode)
    flag = 0
    end = 0
    let visited = []
    while (flag < 25){
        animate = setTimeout(function(){
          previousDistance += 1
          newArray = []
          getNeighbourArray.forEach(element => {
            // console.log(element)
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
 



function getNodesInShortestPathOrder() {
    const nodesInShortestPathOrder = [];
    let currentNode = startNode;
    while (parseInt(currentNode) !== endNode) {
        console.log(currentNode,endNode)
        // isWall = getNeighbourDiv.getAttribute('isblocked')
            // if (isWall === 'false'){

        getAllNeighboursElements = getNeighbours(currentNode)
        getAllNeighboursElements = getAllNeighboursElements.filter(e=> e>0 && e < totalCell)
        console.log('^^^^^^^^^^^',getAllNeighboursElements)
        getAllNeighboursElements = getAllNeighboursElements.filter(e=> getNodeDiv(e).getAttribute('isblocked') === 'false')
        getAllNeighboursElements = getAllNeighboursElements.filter(e=> getNodeDiv(e).getAttribute('isPath') === 'false')
        console.log('vvvvvvvvvvv',getAllNeighboursElements)
        getNeighbourTotalCost = []
        getAllNeighboursElements.forEach(function(eachNeighbour){
            eachNeighbourDiv = getNodeDiv(eachNeighbour)
            // checkWall = eachNeighbourDiv.getAttribute('isblocked')
            // if(checkWall==="false"){
                getNeighbourTotalCost.push(getTotalCost(eachNeighbour))
            // }
        })
        // console.log(getNeighbourTotalCost)
        // getNeighbourTotalCost.filter(e => typeof e !== "number")
        fixedNode = Math.min(...getNeighbourTotalCost)
        console.log('min-node',fixedNode)
        // getAllNeighboursElements.filter(e => getNodeDiv(e).getAttribute('isblocked') === 'false')
        let nextNode;
        if (hasDuplicates(getNeighbourTotalCost)){
            // let hnArray = []
            // getDuplicateNode = getAllNeighboursElements.filter(e => getTotalCost(e) === fixedNode)
            // getDuplicateNode.forEach(function(elem){
            //     elementDiv = getNodeDiv(elem)
            //     hN = elementDiv.getAttribute('distanceHn')
            //     hnArray.push(parseInt(hN))
            // })
            // minHn = Math.min(...hnArray)
            // getDuplicateNode.forEach(function(elem){
            //     elementDiv = getNodeDiv(elem)
            //     hN = elementDiv.getAttribute('distanceHn')
            //     if (parseInt(hN) === minHn){
            //         nextNode = elem
            //     }
            // })
            getDuplicateNode = getAllNeighboursElements.filter(e => getTotalCost(e) === fixedNode)
            nextNode = getDuplicateNode.reduce(function(e1,e2){
                hN1 = getNodeDiv(e1).getAttribute('distanceHn')
                hN2 = getNodeDiv(e2).getAttribute('distanceHn')
                return ( hN1 < hN2 ? e1 : e2);
            })

        }
        else{
            nextNode = getAllNeighboursElements.reduce(function(e1,e2){
                e1Div = getTotalCost(e1)
                e2Div = getTotalCost(e2)
                return ( e1Div < e2Div ? e1 : e2);
            })
        }
        // console.log('unique-fixed-node-after-filter',nextNode)
        visitedDiv = getNodeDiv(currentNode)
        visitedDiv.setAttribute('isPath',true)
        nodesInShortestPathOrder.push(nextNode);
        // console.log('sorted-Node-Path',nodesInShortestPathOrder)
        currentNode = nextNode
    }
    return nodesInShortestPathOrder;
}