class View{
    constructor(board)
    {
        this.board = board;
        this.puyoArr = [];
        this.drawBoard();
    }

    addPuyo = puyo => this.puyoArr.push(puyo);

    fallingPuyos = arr => this.puyoArr = arr;

    addMultPuyo = multPuyo =>
    {   
        this.puyoArr.push(multPuyo.mainPiece);
        this.puyoArr.push(multPuyo.subPiece);
    }

    emptyArray = () => this.puyoArr.length = 0;

    drawBoard = () =>
    {
        for(var i = 0; i<BOARD_WIDTH;i++)
        {
            for(var j = 0; j<BOARD_HEIGHT;j++)
            {
                let color = this.board.table[j][i] 
                console.log(color);
                if(color != PUYO_TYPE.EMPTY)
                {
                    let puyo = new Puyo(this.board.table[j][i])
                    puyo.setPos(i,j);
                    this.drawPuyo(puyo,STAGE);
                }
                STAGE.strokeRect(i*PUYO_SIZE,j*PUYO_SIZE,PUYO_SIZE,PUYO_SIZE)
            }
        }
    }

    moveCycle = () =>
    {
        SPRITE.clearRect(0,0,1024,786);
        for(let puyo of this.puyoArr)
        {
            puyo.move();
            this.drawPuyo(puyo, SPRITE)
        }
    }

    fallCycle = () =>
    {
        let counter = 0;
        SPRITE.clearRect(0,0,1024,786);
        for(let x = 0; x<BOARD_WIDTH;x++)
        {
            let height = this.board.getHeight(x); 
            for(let puyo of this.puyoArr[x])
            {
                if(puyo.fall(height)) counter++;
                this.drawPuyo(puyo, SPRITE)
            }    
        }
        return counter>0
    }

    drawPuyo = (puyo, ctx) =>
    {
        let type = puyo.type;
        let state = puyo.state;
        if(type==PUYO_TYPE.EMPTY) return;
        if(type==PUYO_TYPE.TRASH)
        {
            type = 6;
            state = 12;
        }
        ctx.drawImage( 
            SPRITE_IMAGE,           //Source
            state*PUYO_SIZE,        //sX
            type*PUYO_SIZE,         //sY
            PUYO_SIZE,              //s Width
            PUYO_SIZE,              //s Height
            puyo.gX,       //dX
            puyo.gY,       //dY
            PUYO_SIZE,              //dW
            PUYO_SIZE               //dH
        )
    }

}