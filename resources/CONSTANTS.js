const BOARD_WIDTH = 6;
const BOARD_HEIGHT = 13;
const VISIBLE_HEIGHT = 12;

const PUYO_SIZE = 32;
const GRAVITY = 0.25;

const PUYO_TYPE = Object.freeze(
    {
        EMPTY: -1,
        R: 0,
        G: 1,
        B: 2,
        Y: 3,
        P: 4,
        TRASH: 5
    }
);

const PUYO_COLOR = Object.freeze(
    {
        R:"rgba(255,050,019,1.0)",
        G:"rgba(114,203,059,1.0)",
        B:"rgba(003,065,174,1.0)",
        P:"rgba(160,000,241,1.0)",
        Y:"rgba(255,213,000,1.0)",
        TRASH:"rgba(200,200,200,1.0)"
    }
)

const PUYO_STATE = Object.freeze(
    {
        N : 0,
        D : 1,
        U : 2,
        UD : 3,
        R : 4,
        DR : 5,
        UR : 6,
        UDR : 7,
        L : 8,
        DL : 9,
        UL : 10,
        UDL : 11,
        LR : 12,
        DLR : 13,
        ULR : 14,
        UDLR : 15  
    }
);

const PHASE = 
{
    DROP: 0,
    LOCK: 1,
    FALL: 2,
    FALL_ANIMATION: 3,
    FALL_ANIMATION_END: 4,
    CALC: 5,
    POP:6,
    POP_ANIMATION:7,
    NEW_PUYO:8,


    GAME_OVER:99
}

const GROUP_SIZE_BONUS = Object.freeze([0,0,0,0,0,2,3,4,5,6,7,10]);
const CHAIN_BONUS = Object.freeze([   0,   8,  16,  32,  64,  96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 480, 512]);
const COLOR_BONUS = Object.freeze([0,3,6,12,24]);

const XY_OFFSETS = Object.freeze(
    [
        [ 0,-1],
        [ 1, 0],
        [ 0, 1],
        [-1, 0]
    ]
);

const DIRECTION = Object.freeze(
    {
        NONE:  [0,0],
        LEFT:  [-1,0],
        RIGHT: [1,0],
        DOWN:  [0,1],
        UP: [0,-1],
        CW: 1,
        ACW: -1,
        DOUBLE: 2
    }
);

const KICK = Object.freeze(
{
    NO_ROTATION: -1,
    DONT_PUSH: 0,
    PUSH_LEFT: 1,
    PUSH_RIGHT: 2,
    PUSH_UP: 3,
    DOUBLE_ROTATION:4
});

const POP_SPRITE = Object.freeze(
[
    [9,11],     //R
    [9,13],     //G
    [10,0],     //B
    [10,2],     //Y
    [10,4]      //P
]);

const DX_DY = Object.freeze(
    [
        [ 0,-1],
        [ 0, 1],
        [-1, 0],
        [ 1, 0]
    ]
);

// IMAGE

const SPRITE_IMAGE = new Image();
SPRITE_IMAGE.src ='resources/puyo.png'

// HTMLS

const fieldCanvas = document.getElementById(`field`);
const STAGE = fieldCanvas.getContext("2d")

const animationCanvas = document.getElementById(`animation`);
const SPRITE = animationCanvas.getContext("2d")

const infoCanvas  = document.getElementById(`infos`);
const INFO = infoCanvas.getContext("2d")

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  };