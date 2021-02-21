
export class Reader{
    board;
    boardCenter;
    lines;
    survivalRule;
    birthRule;
    fileError;

    constructor(lines){
        this.survivalRule = [];
        this.birthRule  = [];
        this.lines = lines;
        this.boardCenter = [0,0];
        this.board = [];
        this.fileError = false;
        this.process()
    }

    process(){
        switch(this.lines[0]){
            case "#Life 1.05":
                this.process_1_005();
                break;
            case "#Life 1.06":
                this.process_1_006();
                break;
            default:
                this.fileError = true;
                break;
        }
    }

    process_1_005(){
        this.fillBoard();
        for(let i = 1; i < this.lines.length; i++){
            switch(this.lines[i].substring(0,2)){
                case "#N":
                    this.survivalRule = [2,3];
                    this.birthRule  = [3];
                    break;
                case "#R":
                    this.readRules(this.lines[i]);
                    break;
                case '#P':
                    i = this.makeBoard(i)-1;
                    break;
                default:
                    break;
            }
        }
    }

    process_1_006(){
        this.fillBoard();
        let i = 1;
        while(i < this.lines.length){
            console.log(this.lines[i]);
            if(this.lines[i]){
                let coords = this.processPositionss(this.lines[i]);
                this.board[this.boardCenter[0] + coords[1]][this.boardCenter[1] + coords[0]] = 1;
            }
            i++;
        }
        this.survivalRule = [2,3];
        this.birthRule  = [3];
    }

    readRules(str){
        let survivalRule = true;
        for(let i = 1; i < str.length; i ++){
            if(str.charAt(i) > "0" && str.charAt(i) < "9"){
                if(survivalRule){
                    this.survivalRule.push(parseInt(str.charAt(i)))
                }else{
                    this.birthRule.push(parseInt(str.charAt(i)))
                }
            }else if(str.charAt(i) === "/"){
                survivalRule = false;
            }
        }
    }

    makeBoard(index){
        let cursor = this.processPositionss(this.lines[index]);
        let i = index + 1;
        while(i < this.lines.length && this.lines[i].substring(0,1) != "#"){
            for(let j = 0; j < this.lines[i].length; j++ ){
                if(this.lines[i].charAt(j) === "*"){
                    this.board[this.boardCenter[0] + cursor[1]][this.boardCenter[1] + cursor[0]+j] = 1;
                }
            }
            i++;
            cursor[1]++;
        }
        return i;
    }

    processPositionss(str){
        const regex = /-?\d+/g;
        const coord = [];
        coord.push(parseInt(str.match(regex)[0]));
        coord.push(parseInt(str.match(regex)[1]));
        
        return coord;
    }

    fillBoard(){
        for(let i = 0; i < 349; i ++ ){
            this.board[i] = [];
            for(let j = 0; j < 349; j++){
                this.board[i][j] = 0;
            }
        }
        this.setupCenter();
    }

    setupCenter(){
        this.boardCenter[0] = this.board.length / 2 - 0.5;
        this.boardCenter[1] = this.board[0].length / 2 - 0.5;
    }

    getBoard(){
        return this.board;
    }

    getSurvivalRule(){
        return this.survivalRule;
    }

    getBirthRule(){
        return this.birthRule;
    }

    getFileError(){
        return this.fileError;
    }

}