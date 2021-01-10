class MultPuyos{
    constructor(piece1, piece2)
    {
        this.mainPiece = piece1;
        this.subPiece = piece2;
        this.rotation = 0;
        this.tempRotation = 0;
    }

    getPos = (direction = DIRECTION.NONE) =>
    {
        let data = {
            color1: this.mainPiece.type,
            x: this.mainPiece.x + direction[0],
            y: this.mainPiece.y + direction[1],

            color2: this.mainPiece.type,
            dx: XY_OFFSETS[this.rotation][0],
            dy: XY_OFFSETS[this.rotation][1],
        }
        return data;
    }

    rotate = (rotation) =>
    {
        switch(rotation)
        {
            case 0:
                //clockwise
                break;
            case 1:
                //anticlockwise
                break;
            case 2:
                //double
                break;
        }
    }

    move = (x = 0,y = 0) =>
    {
        if(x===0&&y===0)console.error(`CAUTION: x,y not passed`);

        this.mainPiece.movePos(x,y);
    }
}