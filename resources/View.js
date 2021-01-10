class View{
    constructor(board)
    {
        this.board = board;
        this.puyoArr = [];
        this.drawBoard();
    }

    drawBoard = () =>
    {
        for(var i = 0; i<BOARD_WIDTH;i++)
        {
            for(var j = 0; j<BOARD_HEIGHT;j++)
            {
                STAGE.strokeRect(i*PUYO_SIZE,j*PUYO_SIZE,PUYO_SIZE,PUYO_SIZE)
            }
        }
    }

    cycle()
    {
        SPRITE.clearRect(0,0,1024,786);
        for(let puyo of this.puyoArr)
        {
            puyo.move();
            puyo.fall();
            this.drawPuyo(puyo, ANIMATION)
        }
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