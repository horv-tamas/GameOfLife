
export class View{

    roundCounter = document.querySelector(".round");
    canvas = document.querySelector(".game");
    fileWindow = document.querySelector(".file-upload");
    fileUploade = document.querySelector(".input-file");
    buttonBar = document.querySelector(".button-bar");
    fileError = document.querySelector(".error");

    context = this.canvas.getContext('2d');
    round;
    size;
    drawBoard;

    constructor(board){
        this.init(board);
    }

    init(board){
        this.drawBoard = board;
    }

    startGame(){
        this.round = 1;
        this.fileError.hidden = true;
        this.fileUploade.hidden = true;
        this.fileWindow.hidden = true;
        this.buttonBar.hidden = false;
        this.canvas.hidden = false;
        this.size = this.calculateSize();
        this.resizeCanvas();
        this.draw();
    }

    update(newBoard){
        this.drawBoard = newBoard;
        this.roundCounter.innerHTML = this.round++;
        this.refresh();
    }

    refresh(){
        this.draw();
    }

    draw(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = 'white';
        for(let i = 0; i < this.drawBoard.length; i++){
            for(let j = 0; j < this.drawBoard[0].length ; j++){
                if(this.drawBoard[i][j] === 1){
                    this.context.fillRect(j*this.size, i*this.size, this.size, this.size)
                }
            }
        }
    }

    calculateSize(){
        if(this.drawBoard[0].length < this.drawBoard.length){
            return this.canvas.width/this.drawBoard[0].length;
        }else{
            return this.canvas.width/this.drawBoard[0].length;
        }
    }
    
    resizeCanvas(){
        this.canvas.height = this.canvas.height + (this.drawBoard.length - this.drawBoard[0].length) * this.size; 
    }

    error(){
        this.fileError.hidden = false;
    }

}