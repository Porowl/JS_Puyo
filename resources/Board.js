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

        if(x<0||x>BOARD_WIDTH||y>=BOARD_HEIGHT||y<0) return false
        if(this.table[y][x] != color) return false;

        x += data.dx;
        y += data.dy;

        if(x<0||x>BOARD_WIDTH||y>=BOARD_HEIGHT||y<0) return false
        if(this.table[y][x] != color) return false;

        return true;
    }

    validRotation = (data, direction=direction.CW) =>
    {

        let rotation = data.rotation + data.tempRotation;
        rotation = (rotation + 4 + direction)%4;

        let check = {...data, 
                dx:XY_OFFSETS[rotation][0],
                dy:XY_OFFSETS[rotation][1],
                rotation: rotation
            }

        if(this.valid(check)) return (data.tempRotation==1)?KICK.DOUBLE_ROTATION:KICK.DONT_PUSH;

        let opp = (rotation+2)%4;

        if(opp===2) return KICK.NO_ROTATION;

        check.x += XY_OFFSETS[opp][0];
        check.y += XY_OFFSETS[opp][1];

        if(this.valid(check))
        {
            switch(rotation)
            {
                case 1:
                    return KICK.PUSH_LEFT;
                case 2:
                    return KICK.PUSH_UP;
                case 3:
                    return KICK.PUSH_RIGHT;
            }
        } 
        else return KICK.NO_ROTATION;
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
        //console.log(`locking ${data.color1} at (${x},${y})`)

        x += data.dx;
        y += data.dy;
        //console.log(`locking ${data.color2} at (${x},${y})`)
        
        this.table[y][x] = data.color2;
        return true;
    }
    
    lockSingle = (puyo) => {
        //console.log(`locking ${puyo.type} at (${puyo.x},${puyo.y})`)

        this.table[puyo.y][puyo.x] = puyo.type
    };

    calc = () => {
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
            for(let j = 0; j<BOARD_WIDTH; j++)
            {
                if(!visited[i][j] && this.table[i][j] != PUYO_TYPE.EMPTY)
                {
                    let temp = this.bfs(j,i,visited);
                    if(temp.length >= 4) arr = arr.concat(temp)
                }
            }
        }
        return arr;
    }

    bfs = (x,y,visited) => {
        let queue = [];
        let route = [];

        const color = this.table[y][x];

        queue.push({x,y});
        route.push({x,y,color});

        visited[y][x] = true;

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

                if(this.table[ty][tx] == color)
                {
                    queue.push({x:tx,y:ty});
                    route.push({x:tx,y:ty,color});

                    visited[ty][tx] = true;
                }
            }
        }
        return route;
    }

    pop = (arr) =>
    {
        for(let puyo of arr)
        {
            this.table[puyo.y][puyo.x] = PUYO_TYPE.EMPTY; 
        }
    }

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
                        //console.log(`new dropping puyo type ${color} at (${x},${y}) to (${x},${lowest})`)
                        puyo.setLimit(lowest--);
                        xArr.push(puyo);
                    }
                }
            }
            puyos.push(xArr);
        }
        return puyos;
    }

    getState = (x, y) =>
    {
        y++;
        if(x<0||x>BOARD_WIDTH||y>=BOARD_HEIGHT||y<0) return PUYO_STATE.N; 

        let order = 'UDLR'
        let temp = "";
        let color = this.table[y][x];

        for(let i = 0; i<4; i++)
        {
            let nx = x + DX_DY[i][0];
            let ny = y + DX_DY[i][1];

            if(nx<0||nx>BOARD_WIDTH||ny>=BOARD_HEIGHT||ny<0) continue;
            if(this.table[ny][nx] == color) temp += order.charAt(i);
        }

        if(temp.length == 0) temp = `N` 

        return PUYO_STATE[temp];
    }
}