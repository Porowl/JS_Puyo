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

    validRotation = (x, y, direction) =>
    {
        if(x<0||x>BOARD_WIDTH||y>=BOARD_HEIGHT)
        {
            console.log(`test 1`)
            return false
        }
        if(this.table[y][x] != color){
            console.log(`test 2`)
            return false;
        }

        x += XY_OFFSETS[direction][0];
        y += XY_OFFSETS[direction][1];

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
        console.log(`locking ${data.color1} at (${x},${y})`)

        x += data.dx;
        y += data.dy;
        console.log(`locking ${data.color2} at (${x},${y})`)
        
        this.table[y][x] = data.color2;
        return true;
    }
    
    lockSingle = (puyo) => {
        console.log(`locking ${puyo.type} at (${puyo.x},${puyo.y})`)

        this.table[puyo.y][puyo.x] = puyo.type
    };

    CALC = () => {
        let arr = [];

        let visited = [[]];
        
        for(let i = 1; i<BOARD_HEIGHT;i++)
        {
            visited.push([]);
            for(let j = 0; j<BOARD_WIDTH;j++)
            {
                visited[i].push(false);
            }
        }

        for(let i = 1; i<BOARD_HEIGHT;i++)
        {
            for(let j = 0; j<BOARD_WITH; j++)
            {
                if(!visited[i][j] && this.table[i][j]!=PUYO_TYPE.EMPTY)
                {
                    let temp = this.BFS(j,i,visited);
                    if(temp.length>=4)
                        arr.push(temp)
                }
            }
        }
        return arr;
    }

    BFS = (x,y,visited) => {
        let queue = [];
        let route = [];

        queue.push({x,y});
        route.push({x,y});

        while(queue.length!=0)
        {
            let point = queue.pop();

            for(let i = 0; i<4; i++)
            {
                let ty = point.y + XY_OFFSETS[i][1];
                let tx = point.x + XY_OFFSETS[i][0];

                if(ty<1||ty>=BOARD_HEIGHT||tx<0||tx>=BOARD_WIDTH||visited[ty][tx])
                {
                    continue;
                }

                if(this.table[ty][tx] == this.table[y][x])
                {
                    queue.push({x:tx,y:ty});
                    route.push({x:tx,y:ty});

                    visited[ty][tx] = true;
                }
            }
        }

        return route;
    }

    POP = () => {}




    fall = () =>
    {
        let puyos = [];
        for(let x = 0; x<BOARD_WIDTH; x++)
        {
            let xArr = [];
            let lowest = 0;
            for(let y = BOARD_HEIGHT-1; y>=0; y--)
            {
                if(this.table[y][x] == PUYO_TYPE.EMPTY)
                {
                    lowest = y;
                    break;
                }
            }

            for(let y = BOARD_HEIGHT-2; y>0; y--)
            {
                if(this.table[y][x] != PUYO_TYPE.EMPTY)
                {
                    if(this.table[y+1][x] == PUYO_TYPE.EMPTY)
                    {
                        let color = this.table[y][x];
                        this.table[y][x] = PUYO_TYPE.EMPTY;

                        let puyo = new Puyo(color);
                        puyo.setPos(x,y);

                        console.log(`new dropping puyo type ${color} at (${x},${y}) to (${x},${lowest})`)

                        puyo.setLimit(lowest--);

                        xArr.push(puyo);
                    }
                }
            }
            puyos.push(xArr);
        }
        return puyos;
    }
}