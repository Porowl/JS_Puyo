const BOARD_WIDTH = 6;
const BOARD_HEIGHT = 13;
const VISIBLE_HEIGHT = 12;

const PUYO_SIZE = 20;
const gravity = 1;

const PUYO_TYPE = Obejct.freeze(
    {
        EMPTY: -1,
        R: 0,
        G: 1,
        B: 2,
        P: 3,
        Y: 4,
        TRASH: 5
    }
);

const PUYO_COLOR = object.freeze(
    {
        R:"rgba(255,050,019,1.0)",
        G:"rgba(114,203,059,1.0)",
        B:"rgba(003,065,174,1.0)",
        P:"rgba(160,000,241,1.0)",
        Y:"rgba(255,213,000,1.0)",
        TRASH:"rgba(200,200,200,1.0)"
    }
)

const XY_OFFSETS = object.freeze(
    [
        [ 0,-1],
        [ 1, 0],
        [ 0, 1],
        [-1, 0]
    ]
)