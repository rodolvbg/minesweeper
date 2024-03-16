import {timer} from "./elements.js";
import {gameOn} from "./variables.js";

function startTime() {
    let cont = Number(timer.innerText);
    setInterval(() => {
        if(gameOn){
            cont ++;
        }
        timer.innerText = cont.toString();
    }, 1000);
}

export {startTime}