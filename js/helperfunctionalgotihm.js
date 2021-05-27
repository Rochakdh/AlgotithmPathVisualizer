function getBoundary(){

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
  
function checkBoundary(checkElement)
{
    let getBoundaryArray = getBoundary()
    return getBoundaryArray.includes(checkElement)
}

function getNeighbours(currentNode){
    
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

function getNodeDiv(node){

    return document.getElementById('node'+ node)
}

nonVisited = function(){
    let noneVisited = []
    for (var index = 0 ; index < totalCell; index++){
        noneVisited.push(index)
    }

    return noneVisited
}