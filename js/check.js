let animate;
dijkstra = function(){
    let getStartNodeById = document.getElementById('node'+ startNode)
    getStartNodeById.setAttribute('distance',0)
    let previousDistance = 0
    let getNeighbourArray = getNeighbours(startNode)
    flag = 0
    let visited = []
    while (flag < 25){
        animate = setTimeout(function(){
          previousDistance += 1
          newArray = []
          getNeighbourArray.forEach(element => {
            console.log(element)
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
 