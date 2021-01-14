class Board{
    constructor()
    {
        this.table = this.initTable();
    }

    initTable = () =>
    {
        const temp = [];
        for(let y = 0; y<BOARD_HEIGHT;y++)
        {
            temp.push([]);
            for(let x = 0; x<BOARD_WIDTH;x++)
            {
                temp[y].push(PUYO_TYPE.EMPTY);
            }
        }
        return temp;
    }

    valid = (data,color = PUYO_TYPE.EMPTY) =>
    {
        let x = data.x;
        let y = data.y;

        if(x<0||x>BOARD_WIDTH||y>=BOARD_HEIGHT)
        {
            console.log(`test 1`)
            return false
        }
        if(this.table[y][x] != color){
            console.log(`test 2`)
            return false;
        }

        x += data.dx;
        y += data.dy;

        if(x<0||x>BOARD_WIDTH||y>=BOARD_HEIGHT)
        {
            console.log(`test 3`)
            return false
        }
        if(this.table[y][x]!=color)
        {
            console.log(`test 4`)
            return false;
        }

        return true;
    }

    lockMult = (data) =>
    {
        let x = data.x;
        let y = data.y;

        try{
            this.table[y][x]
        } catch (e)
        {
            return false;
        }

        if(x==2&&y==0) return false;

        this.table[y][x] = data.color1;

        x += data.dx;
        y += data.dy;
        
        this.table[y][x] = data.color2;
        return true;
    }
    
    lockSingle = (puyo) => this.table[puyo.y][puyo.x] = puyo.type;

    fall = () =>
    {
        let puyos = [];
        for(let x = 0; x<BOARD_WIDTH; x++)
        {
            let x = [];
            for(let y = BOARD_HEIGHT-2; y>0; y--)
            {
                if(this.table[y][x] != PUYO_TYPE.EMPTY)
                {
                    if(this.table[y+1][x] = PUYO_TYPE.EMPTY)
                    {
                        let color = this.table[y][x];
                        console.log(`new puyo ` + color)
                        let puyo = new Puyo(color);
                        puyo.setPos(x,y);

                        x.push(puyo);

                        this.table[y][x] = PUYO_TYPE.EMPTY;
                    }
                }
            }
            puyos.push(x);
        }
        return puyos;
    }

    getHeight = x =>
    {
        for(let y = 0; y<BOARD_HEIGHT;y++)
        {
            if(this.table[y][x]!=PUYO_TYPE.EMPTY) return y;
        }
    }
}