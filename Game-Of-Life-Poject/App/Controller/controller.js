import {Model} from "../Model/model.js";
import {View} from "../View/view.js";


export class Controller{

    timer;
    model;
    view;

    constructor(lines){
        this.init(lines);
    }

    init(lines){
        this.model = new Model(lines);
        this.view = new View(this.model.getGeneration());
        if(!this.model.getFileError()){
            this.view.startGame();
        }else{
            this.view.error();
        }
    }

    next(){
        this.stop();
        this.refresh();
        this.view.update(this.model.getGeneration());
    }

    start(){
        clearInterval(this.timer);
        this.timer = setInterval(myTimer ,300);
        const self = this;
        function myTimer() {
            self.refresh();
            self.view.update(self.model.getGeneration());
        }
    }

    stop(){
        clearInterval(this.timer);
    }

    refresh(){
        this.model.nextGeneration();
    }

}

