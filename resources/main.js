var b;
const init = () =>
{
    let board = new Board();
    b = new View(board);

    setInterval(()=>
        b.cycle(),17);
        
}