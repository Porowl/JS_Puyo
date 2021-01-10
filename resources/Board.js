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
}