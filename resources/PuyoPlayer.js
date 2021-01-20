class PuyoPlayer{
    constructor(user = 0, randomizer)
    {
        this.user = 0;
        this.Board = new Board();
        this.Stats = new Stats(user, randomizer);
        this.Puyo = {};
        this.popArr = [];
        this.View = new View(this.Board);

        this.phase = PHASE.NEW_PUYO;
        this.frame = 0;

        this.gameOver = false;

        document.addEventListener(`keydown`,event =>
        {
            if(this.phase == PHASE.DROP)
            {
                if(event.keyCode == 37) setTimeout(()=>
                {
                    if(this.Board.valid(this.Puyo.getPos(DIRECTION.LEFT)))
                    {
                        this.Puyo.move(-1,0);
                    }
                },0)
                else if(event.keyCode == 39) setTimeout(()=>
                {
                    if(this.Board.valid(this.Puyo.getPos(DIRECTION.RIGHT)))
                    {
                        this.Puyo.move(1,0);
                    }
                },0)

                else if(event.keyCode == 38) setTimeout(()=>
                {
                    let result = this.Board.validRotation(this.Puyo.getPos(),DIRECTION.CW)
                    if(result==KICK.NO_ROTATION)
                    {
                        if(this.Puyo.rotation%2==0) this.Puyo.tempRotation = 1;
                    }
                    else this.Puyo.rotate(DIRECTION.CW, result);
                },0)
            }
            //this.Stats.keyMap[event.keyCode] = true;
        });

        document.addEventListener(`up`,event =>
        {
            //this.Stats.keyMap[event.keyCode] = false;
        });
    }

    cycle = () =>
    {
        //console.log(`Current Phase is: ${this.phase}`);
        switch(this.phase)
        {
            case PHASE.DROP:
            {
                this.View.moveCycle();
                this.frame++;
                if(this.frame%8===0)
                {
                    if(this.Board.valid(this.Puyo.getPos(DIRECTION.DOWN)))
                        this.Puyo.move(0,1);
                    else{
                        this.phase++;
                    }
                }
                break;
            }

            case PHASE.LOCK:
            {
                if(this.Board.lockMult(this.Puyo.getPos()))
                {
                    this.phase++;
                    this.View.drawBoard();
                } else {
                    this.phase = PHASE.GAME_OVER;
                }
                break;
            }

            case PHASE.FALL:
            {
                let array = this.Board.fall();
                this.View.drawBoard();
                this.View.fallingPuyos(array);
                this.phase++;
                break;
            }

            case PHASE.FALL_ANIMATION:
            {
                if(!this.View.fallCycle()) this.phase++;
                break;
            }

            case PHASE.FALL_ANIMATION_END:
            {
                let arr = this.View.getPuyoArr();

                for(let x = 0; x<BOARD_WIDTH;x++)
                {
                    for(let puyo of arr[x])
                    {
                        this.Board.lockSingle(puyo);
                    }
                }
                this.View.emptyArray();
                this.View.drawBoard();
                this.phase++;
            }

            case PHASE.CALC:
            {
                this.phase++;
                this.popArr = this.Board.calc();
                break;
            }

            case PHASE.POP:
            {
                this.View.popFrame = 0;
                if(this.popArr.length>0)
                {
                    this.Board.pop(this.popArr);
                    this.View.drawBoard();
                    this.phase++;
                }
                else this.phase = PHASE.NEW_PUYO; 
                break;
            }

            case PHASE.POP_ANIMATION:
            {
                if(this.View.popCycle(this.popArr)) this.phase++;
                break;
            }

            case PHASE.NEW_PUYO:
            {
                if(this.popArr.length>0){this.phase = PHASE.FALL; break;}
                this.popArr.length = 0;
                this.Puyo = this.Stats.getPuyo();

                this.View.emptyArray();
                this.View.addMultPuyo(this.Puyo);

                this.phase = PHASE.DROP;
                break;
            }

            case PHASE.GAME_OVER:
            {
                this.gameOver = true;
                return false;   
            }
        }
        return true;
    }
}