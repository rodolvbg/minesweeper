function getFlag(){
    let flag = document.createElement("img")
    flag.setAttribute("src", "assets/flag.png")
    flag.setAttribute("class", "flag")
    return flag;
}

function getMine(){
    let mine = document.createElement("img")
    mine.setAttribute("src", "assets/mine.png")
    mine.setAttribute("class", "mine")
    return mine;
}

export {getFlag, getMine}