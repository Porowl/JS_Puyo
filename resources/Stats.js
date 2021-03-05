class Stats{
    constructor(user, randomizer)
    {
        this.user = user;
        this.randomizer = randomizer;
        this.index = 0;
        this.score = 0;
        this.chain = 0;

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

    calcScore = (data) =>
    {
        //Score = (10 * NumPopped) * (ChainPower + ColorBonus + GroupBonus)
        //GarbageGenerated = Score / Margin + LeftoverPoints
        let numPopped = data.arr.length;
        let chainPower = CHAIN_BONUS[Math.min(this.chain,CHAIN_BONUS.length-1)];
        let colorBonus = COLOR_BONUS[data.colors-1];
        let groupBonus = GROUP_SIZE_BONUS[data.max];

        let multiplier = Math.max(1,(chainPower + colorBonus + groupBonus))
        let score = 10 * numPopped * multiplier;
        this.score += score;

        this.chain++;

        console.log(`10 * ${numPopped} * (${chainPower} + ${colorBonus} + ${groupBonus}) = ${score}`);
        console.log(this.score)
    }

    resetChain = () => {
        this.chain = 0;
    }
}