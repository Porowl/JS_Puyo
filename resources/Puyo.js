class Puyo{
    constructor(type)
    {
        this.type = type;
        this.initPos();
        this.velocity = 0;
        this.remove = false;
        this.state = PUYO_STATE.N;
    }

    initPos = () =>
    {
        this.x = 2;
        this.y = -1;
        this.gX = this.x*PUYO_SIZE//Graphic X
        this.gY = this.y*PUYO_SIZE
    }

    movePos = (x,y) =>
    {
        this.x += x;
        this.y += y;
    }

    setPos = (x,y) =>
    {
        this.x = x;
        this.y = y;
    }

    /**
     * Returns true if fall completed;
     */
    fall = (bottom = BOARD_HEIGHT*PUYO_SIZE) =>
    {
        this.velocity += GRAVITY;
        this.gY += this.velocity;

        if(this.gY>bottom)
        {
            this.velocity = 0;
            this.gY = bottom;
            return true;
        }

        return false;
    }

    move()
    {
        let dx = (this.x * PUYO_SIZE - this.gX) * 0.25 | 0;
        
        if(dx == 0)
        {
            this.gX = this.x * PUYO_SIZE;
        }
        this.gX += dx;
    }
}