const PUYO_SIZE = 20;
const gravity = 1;

class Board{
    constructor()
    {
        this.table = this.initTable();
    }

    initTable = () =>
    {
        const temp = [];
        for(let x = 0; x<BOARD_WIDTH;x++)
        {
            temp.push = [];
            for(let y = 0; y<BOARD_HEIGHT;y++)
            {
                temp[x].push = PUYO_TYPE.EMPTY;
            }
        }
    }
}