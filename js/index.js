const grids = document.querySelector('.grids')
const boxSize =  25
const columns = Math.floor(window.innerWidth / boxSize)
const rows = 15
let totalCell = rows*columns
let startNode;
let endNode;


grids.style.setProperty("grid-template-columns", `repeat(${columns}, 1fr)`)
grids.style.setProperty("grid-template-rows", `repeat(${rows}, 1fr)`)

let box;
// function allDijkastra(){
//     divAttributes = function(){
//         let attributes ={
//             'distance': Infinity,
//             'isVisited': false,
//             'isBlocked':false,
//             'previous':null
//         }
//         return attributes
//     }
    
//     let {distance,isVisited} = divAttributes()
//     console.log(distance,isVisited)
//     for (var index = 0 ; index < (rows*columns); index++){
//         box = document.createElement('div')
//         box.id = 'node' + index
//         box.style.width =  boxSize + 'px'
//         box.style.height = boxSize + 'px'
//         // box.innerHTML = index
//         box.setAttribute('distance',distance)
//         box.setAttribute('isVisited',false)
//         box.setAttribute('isblocked',false)
//         box.setAttribute('previous',null)
//         grids.appendChild(box).className = 'box'
//     }
    
//     function randomNumberFromRange(min,max){
//         return size = parseInt(Math.random() * (max - min) + min);
//     }
    
//     startEndNodes = function (){
//         startNode = randomNumberFromRange(0,rows*columns)
//         endNode = randomNumberFromRange(0,rows*columns)
//         if (startNode === endNode){
//             endNode = randomNumberFromRange(0,rows*columns)
//         }
//         document.getElementById(`node${startNode}`).classList.add('start')
//         document.getElementById(`node${endNode}`).classList.add('end')
//     }
//     startEndNodes();
    
    
    
//     checkDraggedStartEnd = function(eventThrown){
//         if (
//             eventThrown.target.id != `node${startNode}` &&  eventThrown.target.id != `node${endNode}` 
//             && eventThrown.target.className === 'box'
//             ){
//                 return true
//             }
//         return false
//     }
    
    
//     document.addEventListener('mouseup',function(event){
//         if (checkDraggedStartEnd(event)){
//             event.target.classList.add('blocked')
//             event.target.setAttribute('isBlocked',true)
//         }
//     })
    
    
//     document.addEventListener("dragover", function(event) {
//         if (checkDraggedStartEnd(event)){
//             event.target.setAttribute('isBlocked',true)
//             event.target.classList.add('blocked')
//         }
//     }, false);
    
    
    
//     //div attributes
    
//     let leftNode;
//     let rightNode;
//     let upNode;
//     let downNode;
    
//     getBoundary = function(){
//       let boundaryNode = []
//       let additional = 0
//       for (let index = 0 ; index < columns ; index++){
//         boundaryNode.push(index)
//       }
//       for (let index = 0 ; index < rows ; index++){
//         additional += columns
//         boundaryNode.push(additional)
//         boundaryNode.push(additional-1)
//       }
//       boundaryNode.pop()
//       return boundaryNode
//     }
    
//     checkBoundary = function(checkElement)
//     {
//         let getBoundaryArray = getBoundary()
//         if (getBoundaryArray.includes(checkElement)){
//             return true
//         }
//         else{
//             return false
//         }
//     }
    
//     getNeighbours = function(currentNode){
//         let neighboour = []
//         leftNode = currentNode - 1
//         rightNode = currentNode + 1
//         upNode = currentNode - columns
//         downNode = currentNode + columns
//         neighboour.push(upNode)
//         if (!rightBoundary(rightNode)){
//             neighboour.push(rightNode)
//         }
//         neighboour.push(downNode)
//         if (!leftBoundary(leftNode)){
//             neighboour.push(leftNode)
//         }
//         return neighboour
//     }
    
//     getNodeDiv = function(node){
//         return document.getElementById('node'+ node)
//     }
    
//     //Algorithm  Dijkastra
    
//     nonVisited = function(){
//         let noneVisited = []
//         for (var index = 0 ; index < (rows*columns); index++){
//             noneVisited.push(index)
//         }
//         return noneVisited
//     }
    
//     dijkstra = function(){
//         let notVistedNode = nonVisited()
//         let startNodeDiv = getNodeDiv(startNode)
//         distance = 0
//         startNodeDiv.setAttribute('distance',distance)
//         // startNodeDiv.setAttribute('previous','none')
//         currentNode = startNode
//         notVistedNode = notVistedNode.filter(e=>e !== currentNode)
//         let queue = []
//         neighbourOfCurrentNode = getNeighbours(currentNode)
//         neighbourOfCurrentNode.forEach(
//             function(eachNeighbour) {
//                 eachNeighbourDiv = getNodeDiv(eachNeighbour)
//                 eachNeighbourDiv.setAttribute('previous',startNode)
//             }
//         )
//         neighbourOfCurrentNode = neighbourOfCurrentNode.filter(e => e > 0 && e < 1275)
//         j = 1
//         endNodeDiv = getNodeDiv(endNode)
//         endNodeVisited = endNodeDiv.getAttribute('isVisited')
//         // console.log(endNodeVisited)
//         let animate;
//         while(j<60)
//         {
//             animate = setTimeout(function(){
//             distance = distance + 1
//             neighbourOfCurrentNode.forEach(element => {
//                 if (element===endNode){
//                     console.log('-----------------------')
//                 }
//                 getNeighbourDiv = getNodeDiv(element)
//                 isWall = getNeighbourDiv.getAttribute('isblocked')
//                 if (isWall === 'false'){
//                     getNeighbourDiv.setAttribute('distance',distance)
//                     getNeighbourDiv.setAttribute('isVisited',true)
//                     newNeighbours = getNeighbours(element)
//                     newNeighbours = newNeighbours.filter(e => e > 0 && e < 1275 && notVistedNode.includes(e))
//                     newNeighbours.forEach(function(individualNeighbour){
//                         let newNeighbourDiv = getNodeDiv(individualNeighbour)
//                         // if (newNeighbourDiv.getAttribute('previous') === 'null'){
//                         //     newNeighbourDiv.setAttribute('previous',element)
//                         // }
//                         if (newNeighbourDiv.getAttribute('isVisited')==="false"){
//                             newNeighbourDiv.setAttribute('previous',element)
//                             queue.push(individualNeighbour) 
//                         }                   
//                     })
//                     notVistedNode = notVistedNode.filter(e=>e !== element)
//                 } 
//             });
    
//             queue = queue.filter(function(elem, index, self) {
//                 return index === self.indexOf(elem);
//             })
//             neighbourOfCurrentNode = queue.filter(e => e > 0 && e < 1275 && notVistedNode.includes(e))
//             },90*j)
//             j++
//         }
//         clearInterval(animate)
//     }
    
    
//     function rightBoundary(index) {
//         colCount = columns
//         const colPosition = index % colCount;
//         const rowPosition = Math.floor(index / colCount);
//         // console.log(colPosition)
//         if (colPosition==(colCount-1)) {
//             return true
//         } else {
//             return false
//         } 
//     }
    
//     function leftBoundary(index) {
//         colCount = columns
//         const colPosition = index % colCount;
//         const rowPosition = Math.floor(index / colCount);
//         if (colPosition==0) {
//             return true
//         } else {
//             return false
//         } 
//     }
    
// }
// function getNodesInShortestPathOrder() {
//     const nodesInShortestPathOrder = [];
//     let currentNode = endNode;
//     while (currentNode !== 'null') {
//         nodesInShortestPathOrder.push(parseInt(currentNode));
//         getPreviousDiv = getNodeDiv(currentNode)
//         getPrevious = getPreviousDiv.getAttribute('previous')
//         currentNode = getPrevious
//     }
//     return nodesInShortestPathOrder;
// }


// animateShortestPath  = function () {
//     getPath = getNodesInShortestPathOrder()
//     console.log(getPath)
//     getPath.forEach(function(individualPath){
//         console.log(individualPath)
//         getPathDiv = getNodeDiv(individualPath)
//         console.log(getPathDiv)
//         getPathDiv.style.background = 'red'
//     })
// }
// // allDijkastra()

// let btn = document.getElementById('visualize')
// let clear = document.getElementById('clear')
// btn.addEventListener('click', function(){
//     dijkstra()
//     wrapper = function(){
//         animateShortestPath()
//     }
//     setTimeout(wrapper,5000)
// })
    
// clear.addEventListener('click', function(){
//     location.reload();
// })


//............................................................................................................................//
//A star //


function allAstar(){
    for (var index = 0 ; index < (rows*columns); index++){
        box = document.createElement('div')
        box.id = 'node' + index
        box.style.width =  boxSize + 'px'
        box.style.height = boxSize + 'px'
        // box.innerHTML = index
        box.setAttribute('distanceGn',Infinity)
        box.setAttribute('distanceHn',Infinity)
        // box.setAttribute('isVisitedGn',false)
        // box.setAttribute('isVisitedHn',false)
        box.setAttribute('isVisited',false)
        box.setAttribute('isblocked',false)
        // box.setAttribute('previous',null)
        grids.appendChild(box).className = 'box'
    }

    function randomNumberFromRange(min,max){
        return size = parseInt(Math.random() * (max - min) + min);
    }
    
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

    let leftNode;
    let rightNode;
    let upNode;
    let downNode;
    
    getBoundary = function(){
      let boundaryNode = []
      let additional = 0
      for (let index = 0 ; index < columns ; index++){
        boundaryNode.push(index)
      }
      for (let index = 0 ; index < rows ; index++){
        additional += columns
        boundaryNode.push(additional)
        boundaryNode.push(additional-1)
      }
      boundaryNode.pop()
      return boundaryNode
    }
    
    checkBoundary = function(checkElement)
    {
        let getBoundaryArray = getBoundary()
        if (getBoundaryArray.includes(checkElement)){
            return true
        }
        else{
            return false
        }
    }
    
    getNeighbours = function(currentNode){
        let neighboour = []
        leftNode = currentNode - 1
        rightNode = currentNode + 1
        upNode = currentNode - columns
        downNode = currentNode + columns
        neighboour.push(upNode)
        if (!rightBoundary(rightNode)){
            neighboour.push(rightNode)
        }
        neighboour.push(downNode)
        if (!leftBoundary(leftNode)){
            neighboour.push(leftNode)
        }
        return neighboour
    }
    
    getNodeDiv = function(node){
        return document.getElementById('node'+ node)
    }
    
    //Algorithm  Astar
    
    nonVisited = function(){
        let noneVisited = []
        for (var index = 0 ; index < (rows*columns); index++){
            noneVisited.push(index)
        }
        return noneVisited
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
        while(j<60)
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
        notVistedNode = notVistedNode.filter(e=>e !== endNode)
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
        // endNodeDiv = getNodeDiv(endNode)
        // endNodeVisited = endNodeDiv.getAttribute('isVisited')
        // console.log(endNodeVisited)
        let animate;
        while(j<60)
        {
            // animate = setTimeout(function(){
            distanceHn = distanceHn + 1
            neighbourOfCurrentNode.forEach(element => {
                getNeighbourDiv = getNodeDiv(element)
                isWall = getNeighbourDiv.getAttribute('isblocked')
                if (isWall === 'false'){
                    getNeighbourDiv.setAttribute('distanceHn',distanceHn)
                    // getNeighbourDiv.setAttribute('isVisitedHn',true)
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
    
    
    function rightBoundary(index) {
        colCount = columns
        const colPosition = index % colCount;
        const rowPosition = Math.floor(index / colCount);
        // console.log(colPosition)
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
        if (colPosition==0) {
            return true
        } else {
            return false
        } 
    }

    function hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }
    function getTotalCost(element){
        // console.log(element)
        elementDiv = getNodeDiv(element)
        gN = elementDiv.getAttribute('distanceGn')
        hN = elementDiv.getAttribute('distanceHn')
        tN = parseInt(gN) + parseInt(hN)
        return tN
    }

    function getNodesInShortestPathOrder() {
        const nodesInShortestPathOrder = [];
        let currentNode = startNode;
        while (parseInt(currentNode) !== endNode) {
            console.log(currentNode,endNode)
            getAllNeighboursElements = getNeighbours(currentNode)
            getAllNeighboursElements = getAllNeighboursElements.filter(e=> e>0 && e<totalCell )
            getNeighbourTotalCost = []
            getAllNeighboursElements.forEach(function(eachNeighbour){
                eachNeighbourDiv = getNodeDiv(eachNeighbour)
                checkWall = eachNeighbourDiv.getAttribute('isblocked')
                if(checkWall==="false"){
                    getNeighbourTotalCost.push(getTotalCost(eachNeighbour))
                }
            })
            // console.log(getNeighbourTotalCost)
            // getNeighbourTotalCost.filter(e => typeof e !== "number")
            fixedNode = Math.min(...getNeighbourTotalCost)
            console.log('min-node',fixedNode)
            // getAllNeighboursElements.filter(e => getTotalCost(e) === fixedNode)
            let nextNode;
            if (hasDuplicates(getNeighbourTotalCost)){
                let hnArray = []
                getDuplicateNode = getAllNeighboursElements.filter(e => getTotalCost(e) === fixedNode)
                getDuplicateNode.forEach(function(elem){
                    elementDiv = getNodeDiv(elem)
                    hN = elementDiv.getAttribute('distanceHn')
                    hnArray.push(parseInt(hN))
                })
                minHn = Math.min(...hnArray)
                getDuplicateNode.forEach(function(elem){
                    elementDiv = getNodeDiv(elem)
                    hN = elementDiv.getAttribute('distanceHn')
                    if (parseInt(hN) === minHn){
                        nextNode = elem
                    }
                })
            }
            else{
                nextNode = getAllNeighboursElements[0]
            }
            // console.log('unique-fixed-node-after-filter',nextNode)
            nodesInShortestPathOrder.push(nextNode);
            // console.log('sorted-Node-Path',nodesInShortestPathOrder)
            currentNode = nextNode
        }
        return nodesInShortestPathOrder;
    }
        
        
    animateShortestPath  = function () {
        getPath = getNodesInShortestPathOrder()
        console.log(getPath)
        getPath.forEach(function(individualPath){
            console.log(individualPath)
            getPathDiv = getNodeDiv(individualPath)
            console.log(getPathDiv)
            getPathDiv.style.background = 'red'
        })
    }

    document.addEventListener('mouseup',function(event){
        if (checkDraggedStartEnd(event)){
            event.target.classList.add('blocked')
            event.target.setAttribute('isBlocked',true)
        }
    })
    
    
    document.addEventListener("dragover", function(event) {
        if (checkDraggedStartEnd(event)){
            event.target.setAttribute('isBlocked',true)
            event.target.classList.add('blocked')
        }
    }, false);

}

allAstar();

let astar = document.getElementById('a-star')
astar.addEventListener('click', function(){
    aStarGn()
    aStarHn()
    animateShortestPath()
    // wrapper = function(){
    //     animateShortestPath()
    // }
    // setTimeout(wrapper,5000)
})