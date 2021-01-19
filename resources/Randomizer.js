class Randomizer{
    constructor()
    {
        this.puyos = [];
    }

    getPuyo = index =>
    {
        if(this.puyos.length<index+3) this.addPuyo();
        return this.puyos[index];
    }

    addPuyo = () =>
    {
        this.puyos.push((Math.random()*5|0)*0o10+Math.random()*5|0) //0o<firstPuyo><SecondPuyo>;
    }
}