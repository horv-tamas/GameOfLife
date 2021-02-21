import {Controller} from "./Controller/controller.js";


const input = document.querySelector(".input-file");

input.addEventListener("change",loadFile);

function loadFile(){
    let reader = new FileReader();
   
    reader.onload = e => {
        
        const lines = e.target.result.split('\n');
        const simulator = new Controller(lines);

        const nextButton = document.querySelector(".next-button");
        const startButton = document.querySelector(".start-button");
        const stopButton = document.querySelector(".stop-button");
        const newFile = document.querySelector(".refresh");

        nextButton.addEventListener("click",next);
        startButton.addEventListener("click",start);
        stopButton.addEventListener("click",stop);
        newFile.addEventListener("click",reset);        

        function next(){
            simulator.next();
        }

        function start(){
            simulator.start();
        }

        function stop(){
            simulator.stop();
        }

        function reset(){
            window.location.reload();
        }

    }

    reader.readAsText(input.files[0]);    
}

