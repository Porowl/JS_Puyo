class Stats{
    constructor(user, randomizer)
    {
        this.user = user;
        this.randomizer = randomizer;
        this.index = 0;
        this.keyMap = this.initKeyMap()
    }

    getPuyo = () =>
    {
        const ranNum = this.randomizer.getPuyo(this.index++);
        const p1 = ( ranNum & 0o70 ) / 0o10
        const p2 = ranNum % 0o10
        return new MultPuyos(new Puyo(p1),new Puyo(p2))
    }

    initKeyMap = () =>
    {
        let arr = [];
        for(let i = 0; i<101; i++)
            arr.push(false);
    } 

    
}