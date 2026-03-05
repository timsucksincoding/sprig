
// The player sprite
const player = "p"

// Different blocks in the game
const grass = "g"
const wood = "w"
const planks = "o"
const leaves = "l"
const cobblestone = "c"
const tnt = "t"
const diamond = "d"

// The sky
const sky = "s"

// Black screen in the beginning
const black = "b"

// Gravity
let gravity = 1

// The direction the player is facing
let direction = "down"

setLegend(
  [player, bitmap`
......CCCC......
......0C0C......
......CCCC......
......CCCC......
....77777777....
....77777777....
....77777777....
....CC7777CC....
....CC7777CC....
....CC5775CC....
....CC5555CC....
......5555......
......5555......
......5555......
......LLLL......
......0000......`],
  [grass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DCDCDCDDCDCDDDCD
DCCCDCCDCDCCDCCC
CCCCCCCCCCCCCCCC
CCLCCCLCCLLLCCLC
CCCCCCCCCCCCCCCC
CCCLCCCCCCCCCLCC
LLCCCCCCLCCCCCCC
CCCCCCCCCCLCCCCC
CCCCCCLCCCCCCCLC
CCCLCCCCCCCCCCCC
CCCCCCCCCCCCCLCC
CCCCCCCCCLCCCCCC
CLCCCCCCCCCCCCCC`],
  [wood, bitmap`
CC0C0C0C0CCC0C0C
CC0C0CCC0C0C0C0C
LC0C0CCC0C0CCC0C
0CLCCC0CCCCC0CLC
CCCC0C0C0C0CCC0C
0CCC0C0CCCLCCCCC
0C0CLCCC0C0C0C0C
CC0C0C0CCCCC0C0C
0CCC0CLCCCCCCCCC
0CCCCC0C0C0C0C0C
LC0CCCCC0C0C0LLC
LCLCC0CCCC0C0C0C
CC0CCLCC0C0CCCCC
0C0CC0CC0C0C0C0C
LC0CCCCCCCLC0C0C
0C0C0CCC0C0C0CLC`],
  [planks, bitmap`
FFFFFFFFF0F00FFF
FCFFFFFFF0F0FFFF
CCFFFCCCF0CCCCCF
0000000000000000
FFFCCC0CCFFFCFFF
FFFFFF0FFFFFFFFF
FCFFFF0FFFCFFFCF
CCFCCF0FFFCFFCCC
0000000000000000
FFFFFFFCC0CCFFCF
FFCFFFFFF0FFFFFF
FFCFFFFFF0FFCFFF
CFCCCFFFF0CCCFCC
0000000000000000
FFFCC0CCCCFFFFFF
FFFFF0FFFCFFFFFF`],
  [leaves, bitmap`
DDDD44DDDD4DD4DD
444DDDDD4DDD4DD4
DD4D4D444DDD4DDD
DDD4DDDDDD4DDD4D
DDD444D44DD4DDD4
44DDDDD4DDD4DDDD
D4D4DDDD44DDD4DD
DDD444DD4D4D4DD4
44DDDDDDDDD4DDDD
D44DD44D44DD4D4D
DDD4DDDDD4444D4D
44DDD444DDD4DDDD
D4DDDDDDD4DDDD4D
44DD4DD4444D44DD
DDDD44DD44DDDDD4
4D4DD4DDDDD4D4DD`],
  [cobblestone, bitmap`
101L11L1LL11L111
100100001L1LL100
111L1101L11L0101
1L011101L1111001
0110000110111LL0
L11LL11100L11111
10101111110LLLLL
101LL11111000000
L0111L01L1111111
01111001L00L1101
1111100111L0L110
1L00L010110L0001
0L11111011011111
10110011010LL110
L101L0111000L011
1L111L01110110L1`],
  [tnt, bitmap`
993CC93933C993CC
933CC39993C933CC
993CC99933C993CC
933CC93993C393CC
993CC99933C993CC
2222222222222222
2200020220200022
2220220020220222
2220220200220222
2220220220220222
2222222222222222
993CC93993C993CC
933CC39933C393CC
993CC99393C993CC
933CC93993C933CC
993CC39933C993CC`],
  [diamond, bitmap`
5577777777777755
5222777777777225
7277777772277727
7277777777727777
7277272227777777
7772777722277777
7777777777222777
7777727777777777
7772277777777277
7777777777722777
7777777227727727
7277722277227777
7277227777777727
7277777777777727
5222777777772225
5577777777777755`],
  [sky, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [black, bitmap`
CCCCCCCCLCCCLCCC
CLCCCLC1CCCCCCL1
LCLLLCCCLCCLLLCC
CC11LLC1CCC1L1CC
C1CCCCCCCLCCCCLC
CLCCCCCLCCCC1CLC
CCCC1CCCLC1CCCCC
CLLLLLCCCCCLCLCC
CCCLCLC1LCCLLCLC
CC1CCCC1LCCCCCCL
LCL11CCCLC1LCCC1
CCCCCCCCCCCCL1CC
CCCCLLCCLCCCLLCC
CLCL1LC1LC1LLCCL
C1CCCCC1LCCCCLLC
CCCCCLCCCCCCLCCC`],
)

let currentBlockIndex = 0
const blocks = {
  grass: "g",
  wood: "w",
  planks: "o",
  leaves: "l",
  cobblestone: "c",
  tnt: "t",
  diamond: "d"
}
// Levels
let level = 0
const levels = [
  map`
..................
..................
..................
..................
..ssssssssssssssss
..ssssssssssssssss
..ssssssssssssssss
..ssssssssssssssss
..ssssggssssssssss
....ggbbgssssssgss
..sgbbbbbg..gggbss
..ggggggggggbbbgss
ggbbddbbbccccbccgs
bbccccccccbdbccbbg`,
  map`
..................................
..................................
..................................
...llllll.........................
..llllllll........................
..lllllllll.............o.........
.llllllllll............ooo........
.lllllllll............ooooo.......
..lllwwwl.............cwwwc.......
..lllwww..............w...w.......
.....www..............w...w.......
.....www..............w...w.......
.....www............ggggggggggg...
gggg.gggg....p....gggbbbbbbbbbbggg
bbbbggbbbggggggggggbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbccccbbbbbbbbbbbbbbbb
bbbbbbbbbbbccccbcbbbbbbddbcccccccc
cbcbbbccccccccbcdccbbbccccbbbbcccc
bbbbbbbbbbbbccbdddccccbbbbbbccccbc
bbbcbccccccbbccbbdcbccbbbdddccccbc
bbbcbccdddccbbccbbbbcccbbd.ddddcbc
cccccccccddccbbcbbbbbbbbbccccccccc
ccccbbdccdddccbcbbdc.c.cbbbccccccc
cccccbbcccccddcccccddcdcbccccbbbcc
ccccccbbbbbcbbbbcccccccccccbbbcccc
cccddddcccccbcccbccbbbbbcccccccccc
cccccccccccccccccccccccccccccccccc`,
]

setSolids([player, ...Object.values(blocks)])

// Set background
setBackground(sky);

// Gravity
function applyGravity() {
  const playerSprite = getFirst(player)
  if (playerSprite) {
    const belowTile = getTile(playerSprite.x, playerSprite.y + 1)
    if (!belowTile.some(sprite => Object.keys(blocks).includes(sprite))) {
      playerSprite.y += gravity
    }
  }
}
// Start screen
setMap(levels[level])

addText("Controls:", {
  x: 1,
  y: 1,
  color: color`0`,
})

addText("WASD - to move", {
  x: 2,
  y: 2,
  color: color`0`,
})

addText("\nK, L - \nto place, destroy \nblocks", {
  x: 2,
  y: 3,
  color: color`0`,
})

addText("\nI - \ncycle through\nblocks", {
  x: 2,
  y: 7,
  color: color`0`,
})

addText("\nJ - reset map", {
  x: 2,
  y: 11,
  color: color`0`
})

setPushables({
  [player]: []
})

// Start Game Function
function startGame() {
  clearText()
  level = 1
  setMap(levels[level])
}

function getCurrentBlock() {
  return Object.values(blocks)[currentBlockIndex]
}

// Gravity interval
let gravityInterval = setInterval(applyGravity, 300)

// Movement Keys
onInput("w", () => {
  if (level == 0) startGame()
  clearText()
  const playerSprite = getFirst(player)
  if (playerSprite) {
    const aboveTile = getTile(playerSprite.x, playerSprite.y - 1)
    const isSolidAbove = aboveTile.some(sprite => Object.keys(blocks).includes(sprite))
    if (!isSolidAbove) {
      playerSprite.y -= 1
      direction = "up"
    }
  }
})


onInput("a", () => {
  if (level == 0) startGame()
  clearText()
  playerSprite = getFirst(player)
  playerSprite.x -= 1
  if (playerSprite) {
    const leftTile = getTile(playerSprite.x - 1, playerSprite.y)
    const isSolidLeft = leftTile.some(sprite => Object.keys(blocks).includes(sprite))
    if (!isSolidLeft) {
      direction = "left"
    }
  }
})

onInput("d", () => {
  if (level == 0) startGame()
  clearText()
  playerSprite = getFirst(player)
  playerSprite.x += 1

  if (playerSprite) {
    const rightTile = getTile(playerSprite.x + 1, playerSprite.y)
    const isSolidRight = rightTile.some(sprite => Object.keys(blocks).includes(sprite))
    if (!isSolidRight) {
      direction = "right"
    }
  }
})

onInput("s", () => {
  if (level == 0) startGame()
  clearText()
  const playerSprite = getFirst(player)
  if (playerSprite) {
    const belowTile = getTile(playerSprite.x, playerSprite.y + 1)
    const isSolidBelow = belowTile.some(sprite => Object.keys(blocks).includes(sprite))
    if (!isSolidBelow) {
      direction = "down"
    }
  }
})

// Place block
onInput("k", () => {
  if (level == 0) startGame()
  clearText()
  const playerSprite = getFirst(player)
  if (playerSprite) {
    let targetX = playerSprite.x
    let targetY = playerSprite.y

    if (direction === "up") {
      targetY -= 1
    } else if (direction === "down") {
      targetY += 1
    } else if (direction === "left") {
      targetX -= 1
    } else if (direction === "right") {
      targetX += 1
    }

    const targetTile = getTile(targetX, targetY)
    const isTargetEmpty = targetTile.length === 0

    if (isTargetEmpty) {
      addSprite(targetX, targetY, getCurrentBlock())
    }
  }
})

// Destroy block
onInput("l", () => {
  if (level == 0) startGame()
  clearText()
  const playerSprite = getFirst(player)
  if (playerSprite) {
    let targetX = playerSprite.x
    let targetY = playerSprite.y

    if (direction === "up") {
      targetY -= 1
    } else if (direction === "down") {
      targetY += 1
    } else if (direction === "left") {
      targetX -= 1
    } else if (direction === "right") {
      targetX += 1
    }

    const targetTile = getTile(targetX, targetY)
    const isTargetEmpty = targetTile.length === 0

    if (!isTargetEmpty) {
      clearTile(targetX, targetY)
    }
  }
})

// Cycle through available blocks
onInput("i", () => {
  if (level == 0) startGame()
  clearText()
  currentBlockIndex = (currentBlockIndex + 1) % Object.keys(blocks).length
  addText("Current block: ", {
    x: 3,
    y: 4,
    color: color`3`
  })
  addText(Object.keys(blocks)[currentBlockIndex], {
    x: 3,
    y: 5,
    color: color`5`
  })
})

// Reset Level
onInput("j", () => {
  if (level == 0) startGame()
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel);
  }
});

afterInput(() => {})
