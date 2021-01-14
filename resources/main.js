var b;
var cycle;
const init = () =>
{
    let randomizer = new Randomizer();
    b = new PuyoPlayer(0,randomizer);

    cycle = setInterval(()=>
    {
        if(!b.cycle())
        {
            alert(`Game Over`);
            clearInterval(cycle);
            cycle = undefined;
        }
    }, 17);
        
}