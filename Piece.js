const PUYO_SIZE = 20;
const gravity = 1;

class Piece{
    constructor(type)
    {
        this.type = type;
        this.initPos();
        this.velocity = 0;
    }

    initPos = () =>
    {
        this.x = 2;
        this.y = -1;
        this.gX = this.x*PUYO_SIZE//Graphic X
        this.gY = this.y*PUYO_SIZE
    }

    fall = (bottom) =>
    {
        this.velocity += gravity;
        this.gY += this.velocity;

        if(this.gY>bottom)
        {
            this.velocity = 0;
            this.gY = bottom;
        }
    }
}

class MultPieces{
    constructor(piece1, piece2)
    {
        this.mainPiece = piece1;
        this.subPiece = piece2;
        this.rotation = 0;
    }

    getPos = () =>
    {
        let data = {
            
        }
        return data;
    }

}