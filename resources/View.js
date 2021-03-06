class View{
    constructor(board)
    {
        this.board = board;
        this.puyoArr = [];
        this.drawBoard();
        this.popFrame = 0;
    }

    addPuyo = puyo => this.puyoArr.push(puyo);

    fallingPuyos = arr => this.puyoArr = arr;

    addMultPuyo = multPuyo =>
    {   
        this.puyoArr = multPuyo;
    }

    emptyArray = () => this.puyoArr.length = 0;

    getPuyoArr = () => this.puyoArr;

    drawBoard = () =>
    {
        STAGE.clearRect(0,0,1024,786)
        for(var i = 0; i<BOARD_WIDTH;i++)
        {
            for(var j = 1; j<BOARD_HEIGHT;j++)
            {
                let color = this.board.table[j][i] 
                if(color != PUYO_TYPE.EMPTY)
                {
                    let color = this.board.table[j][i]
                    this.drawPuyoByPointer(i,j-1,color,STAGE);
                }
                STAGE.strokeRect(i*PUYO_SIZE,(j-1)*PUYO_SIZE,PUYO_SIZE,PUYO_SIZE)
            }
        }
    }

    moveCycle = () =>
    {
        SPRITE.clearRect(0,0,1024,786);
        
        let main = this.puyoArr.mainPiece
        let sub = this.puyoArr.subPiece
        
        main.move();
        sub.moveRotate(main.gX,main.gY);

        this.drawPuyo(main, SPRITE);
        this.drawPuyo(sub, SPRITE);
    }

    fallCycle = () =>
    {
        let counter = 0;
        SPRITE.clearRect(0,0,1024,786);
        for(let x = 0; x<BOARD_WIDTH;x++)
        {
            for(let puyo of this.puyoArr[x])
            {
                if(puyo){
                    if(!puyo.fall()) counter++;
                    this.drawPuyo(puyo, SPRITE)    
                }
            }    
        }
        return counter>0
    }

    popCycle = (arr) =>
    {
        if(arr.length==0) return true;
        this.popFrame++;

        let frame = 4;
        SPRITE.clearRect(0,0,1024,786);
        for(let pos of arr)
        {
            const x = pos.x;
            const y = pos.y;
            const color = pos.color;

            if( this.popFrame < frame*1)
            {
                this.drawPuyo({
                    gX: x*PUYO_SIZE,
                    gY: y*PUYO_SIZE,
                    type: POP_SPRITE[color][0],
                    state: POP_SPRITE[color][1],
                }, SPRITE)
            }
            else if (this.popFrame < frame*2)
            {
                this.drawPuyo({
                    gX: x*PUYO_SIZE,
                    gY: y*PUYO_SIZE,
                    type: POP_SPRITE[color][0],
                    state: POP_SPRITE[color][1]+1,
                }, SPRITE)
            }
            else if (this.popFrame < frame*3)
            {
                this.drawPuyo({
                    gX: x*PUYO_SIZE,
                    gY: y*PUYO_SIZE,
                    type: 10,
                    state: 6+color*2
                }, SPRITE)
            }
            else if (this.popFrame < frame*4)
            {
                this.drawPuyo({
                    gX: x*PUYO_SIZE,
                    gY: y*PUYO_SIZE,
                    type: 10,
                    state: 6+color*2+1
                }, SPRITE)
            }
        }
        return this.popFrame>frame*5
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
            puyo.gY-PUYO_SIZE,       //dY
            PUYO_SIZE,              //dW
            PUYO_SIZE               //dH
        )
    }

    drawPuyoByPointer = (x,y,color, ctx) =>
    {
        let type = color;

        let state = this.board.getState(x,y);

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
            x*PUYO_SIZE,       //dX
            y*PUYO_SIZE,       //dY
            PUYO_SIZE,              //dW
            PUYO_SIZE               //dH
        )
    }
}