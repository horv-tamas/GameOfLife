import {Reader} from "./reader.js";


export class Model{
    reader;
    prevBoard;
    board;
    fileError;
    survivalRule;
    birthRule;

    constructor(lines){
        this.prevBoard = [];
        this.board = [];
        this.fileError = false;
        this.reader = new Reader(lines);
        this.init();
    }

    init(){
        if(!this.reader.getFileError()){
            this.board = this.reader.getBoard();
            this.survivalRule = this.reader.getSurvivalRule();
            this.birthRule = this.reader.getBirthRule();
            this.fileError = false;
        }else{
            this.fileError = true;
        }
    }

    nextGeneration(){
        this.prevBoard = JSON.parse(JSON.stringify(this.board));
        this.replaceBoard();
    }

    replaceBoard(){
        for(let i = 0; i < this.board.length ; i++){
            for(let j = 0; j < this.board[0].length ; j++){
                if(!this.isSurvive(i,j)){
                    this.board[i][j] = 0;
                }
                if(this.isBirth(i,j)){
                    this.board[i][j] = 1;
                }
            }
        }
        
    }
    
    isSurvive(row,columns){
        let bool = false;
        let i = 0;
        while(!bool && i < this.survivalRule.length){
            bool = this.survivalRule[i] === this.liveNeighborCounter(row,columns);
            i++;
        }
        return bool;
    }

    isBirth(row,columns){
        let bool = false;
        let i = 0;
        while(!bool && i < this.birthRule.length){
            bool = this.birthRule[i] === this.liveNeighborCounter(row,columns);
            i++;
        }
        return bool;
    }

    liveNeighborCounter(row,columns){
        let count = 0;
        for(let i = -1; i <= 1 ; i++){
            for(let j = -1; j <= 1 ; j++){
                if(row + i >= 0 && columns + j >= 0 && row + i < this.prevBoard.length && columns + j < this.prevBoard[0].length){
                    if(this.prevBoard[row+i][columns+j] === 1 && (i != 0 || j != 0) ){
                        count++;
                    }
                }
            }
        }
        return count;
    }

    getGeneration(){
        return this.board;
    }

    getPrevGeneration(){
        return this.prevBoard;
    }

    getFileError(){
        return this.fileError;
    }

}
