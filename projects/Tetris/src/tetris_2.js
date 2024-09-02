let playing;
let grid;
let score;
let lines;
let gamePieces = {
    L: [
        [1, 1],
        [1, 2],
        [1, 3],
        [2, 3],
    ],
    Z: [
        [1, 1],
        [2, 1],
        [2, 2],
        [2, 3],
    ],
    S: [
        [1, 2],
        [2, 1],
        [2, 2],
        [3, 1],
    ],
    T: [
        [1, 1],
        [2, 1],
        [2, 2],
        [3, 1],
    ],
    O: [
        [1, 1],
        [1, 2],
        [2, 1],
        [2, 2],
    ],
    I: [
        [1, 1],
        [1, 2],
        [1, 3],
        [1, 4],
    ],
};
let colours = {
    L: "Orange",
    Z: "Blue",
    S: "Green",
    T: "Purple",
    O: "Yellow",
    I: "Turquoise",
    B: null,
};
let direction;

function tetris() {
    disableButton();
    document.getElementById("audio").play();
    score = 0;
    lines = 0;
    grid = createGrid();
    let tetrisDiv = document.createElement("div");
    tetrisDiv.id = "tetris-bg";
    tetrisDiv.style.position = "relative";
    tetrisDiv.style.backgroundPosition = "center";
    tetrisDiv.style.margin = "10px";
    tetrisDiv.style.marginTop = "10px";
    tetrisDiv.style.width = "300px";
    tetrisDiv.style.height = "600px";
    document.getElementById("greyBox").appendChild(tetrisDiv);
    addGridToWebpage(grid);
    createElementListener();
    let currentBlock = selectBlock();
    placePieceOnGrid(currentBlock);
    myInterval = setInterval(gameLoop, 1000);
    playing = true;
}

function disableButton() {
    document.getElementById("StartButton").style.display = "none";
    document.getElementById("StartButton").disabled = true;
}

function createGrid(col = 10, row = 20) {
    let board = new Array(col);
    for (i = 0; i < col; i++) {
        board[i] = new Array(row);
        for (j = 0; j < row; j++) {
            board[i][j] = document.createElement("div");
            board[i][j].id = "Empty";
        }
    }
    return board;
}

function addGridToWebpage(grid) {
    let boxSize = 28;
    const GRIDSIZE = 30;
    let offSet = (GRIDSIZE - boxSize) / 2;
    for (i in grid) {
        for (j in grid[i]) {
            let left = i * GRIDSIZE + offSet + "px";
            let top = j * GRIDSIZE + offSet + "px";
            let width = boxSize + "px";
            let height = boxSize + "px";
            grid[i][j].style.position = "absolute";
            grid[i][j].style.width = width;
            grid[i][j].style.height = height;
            grid[i][j].style.left = left;
            grid[i][j].style.top = top;
            document.getElementById("tetris-bg").appendChild(grid[i][j]);
        }
    }
}

function createElementListener() {
    addEventListener("keydown", checkKey);
}

function checkKey(key) {
    if (playing) {
        switch (key.keyCode) {
            case 37:
            case 65:
                //console.log("Left arrow or A");
                moveLeft();
                break;
            case 39:
            case 68:
                //console.log("Right arrow or D");
                moveRight();
                break;
            case 40:
            case 83:
                //console.log("Down arrow or S");
                playerDown();
                break;
            case 38:
            case 87:
                // console.log("Up Arrow or W");
                rotate();
            default:
                break;
        }
    }
}

function gameLoop() {
    moveDown();
}

function selectBlock() {
    let piecesIds = ["L", "Z", "S", "T", "O", "I"];
    let randomIndex = Math.floor(Math.random() * piecesIds.length);
    let randomId = piecesIds[randomIndex];
    return randomId;
    //return "T";
}

function placePieceOnGrid(id) {
    score++;
    let block = gamePieces[id];
    let dx = 3;
    let dy = -1;
    let valid = true;
    direction = 0;

    for (i in block) {
        if (checkObstucted(block[i][0] + dx, block[i][1] + dy)) valid = false;
    }
    if (!valid) return gameOver();

    for (j in block) {
        let x = block[j][0] + dx;
        let y = block[j][1] + dy;
        //console.log(id);
        grid[x][y].style.backgroundColor = colours[id];
        grid[x][y].id = "block";
    }
}

function checkObstucted(x, y) {
    // console.log(x, y);
    if (y > 19) {
        return true;
    }
    if (grid[x][y].id == "Set") {
        console.log("GridObstructed");
        return true;
    }
    if (grid[x][y].id == "Empty") {
        console.log("GridFree");
        return false;
    }
}

function gameOver() {
    console.log("END GAME");
    clearInterval(myInterval);
    playing = false;
    let board = document.getElementById("tetris-bg");
    board.style.backgroundColor = "gray";
    for (x in grid) {
        for (y in grid[x]) {
            grid[x][y].style.opacity = "0.5";
        }
    }
    addToLeaderboard();
    let resultDiv = document.createElement("div");
    resultDiv.id = "results";
    document.getElementById("tetris-bg").appendChild(resultDiv);
    resultDiv.innerHTML = "<h1>Score: " + score + "</h1> <br> <h1>Lines:" + lines + "</h1> <br>";
    resultDiv.appendChild(createLeaderboardButton());
    resultDiv.appendChild(document.createElement("p"));
    resultDiv.appendChild(createRestartButton());
}

function draw(position, col) {
    for (let x = 0; x < 4; x++) {
        grid[position[x][0]][position[x][1]].id = "block";
        grid[position[x][0]][position[x][1]].style.backgroundColor = col;
    }
}

function locateBlock() {
    let position = [[,], [,], [,], [,]];
    let positionCount = 0;

    for (i in grid) {
        for (j in grid[i]) {
            if (grid[i][j].id == "block") {
                //console.log(position[positionCount][0]);
                //console.log(i);
                position[positionCount][0] = parseInt(i);
                //console.log(position[positionCount][0]);
                position[positionCount][1] = parseInt(j);
                positionCount++;
            }
        }
    }

    return position;
}

function removeCurrent(position) {
    let col;
    for (x in position) {
        col = grid[position[x][0]][position[x][1]].style.backgroundColor;
        grid[position[x][0]][position[x][1]].style.backgroundColor = colours["B"];
        grid[position[x][0]][position[x][1]].id = "Empty";
    }
    return col;
}

function moveLeft() {
    let position = locateBlock();
    let check = checkLeft(position);
    let col = removeCurrent(position);

    if (check) {
        for (i in position) position[i][0] -= 1;
    }

    draw(position, col);
}

function checkLeft(position) {
    let dx = -1;
    for (i in position) {
        let x = position[i][0] + dx;
        let y = position[i][1];
        if (x < 0) {
            return false;
        } else if (grid[x][y].id == "Set") {
            return false;
        }
    }
    return true;
}

function moveRight() {
    let position = locateBlock();
    let check = checkRight(position);
    let col = removeCurrent(position);

    if (check) {
        for (i in position) position[i][0] += 1;
    }

    draw(position, col);
}

function checkRight(position) {
    let dx = +1;
    for (i in position) {
        let x = position[i][0] + dx;
        let y = position[i][1];
        if (x > grid.length - 1) {
            return false;
        } else if (grid[x][y].id == "Set") {
            return false;
        }
    }
    return true;
}

function playerDown() {
    clearInterval(myInterval);
    myInterval = setInterval(moveDown, 1000);
    moveDown();
}

function moveDown() {
    let position = locateBlock();
    // console.log(position);
    let check = checkDown(position);
    let col = removeCurrent(position);

    if (check) {
        for (i in position) position[i][1] += 1;
    }

    draw(position, col);

    if (!check) {
        setId(position);
        let rowsToRemove = [];
        for (j in position) rowsToRemove.push(checkLine(position[j][1]));
        removeRow(rowsToRemove);
        addGridToWebpage(grid);
        nextBlock();
    }
}

function checkDown(position) {
    let dy = +1;
    for (i in position) {
        let x = position[i][0];
        let y = position[i][1] + dy;
        //console.log(position);
        if (y > grid[x].length - 1) {
            //console.log("Test");
            return false;
        } else if (grid[x][y].id == "Set" && y < 20) {
            //console.log("Test2");
            return false;
        }
    }
    return true;
}

function setId(position) {
    //console.log("test Set Id");
    for (i in position) {
        let x = position[i][0];
        let y = position[i][1];
        //console.log(x, y);
        grid[x][y].id = "Set";
    }
}

function nextBlock() {
    //console.log("Next Block");
    let currentBlock = selectBlock();
    placePieceOnGrid(currentBlock);
    currentBlock;
}

function checkLine(y) {
    //console.log("check", y);
    let complete = true;

    for (x in grid) {
        //console.log(grid[x][y].id);
        if (grid[x][y].id != "Set") complete = false;
        //console.log(complete);
    }

    if (complete) {
        for (x in grid) {
            grid[x][y].id = "Complete";
        }
        console.log("Finnsihed row");
        return y;
    }
}

function removeRow(rows) {
    let boxSize = 28;
    const GRIDSIZE = 30;
    let offSet = (GRIDSIZE - boxSize) / 2;

    for (row in rows) {
        if (rows[row] != undefined) {
            for (x in grid) {
                grid[x][rows[row]].remove();
                grid[x].splice(rows[row], 1);
                grid[x].unshift(document.createElement("div"));
                grid[x][0].id = "Empty";
            }
            lines++;
        }
    }

    for (i in grid) {
        for (j in grid[i]) {
            // console.log("s", grid[i][j])
            let left = i * GRIDSIZE + offSet + "px";
            let top = j * GRIDSIZE + offSet + "px";
            grid[i][j].style.left = left;
            grid[i][j].style.top = top;
            // console.log("f", grid[i][j])
        }
    }
    // console.log(document.getElementById("Test"));
}

function createLeaderboardButton() {
    console.log("button Created");
    let btn = document.createElement("button");
    btn.innerHTML = "Leaderboard";
    btn.type = "Submit";
    btn.name = "leaderboard";
    // btn.style.Top = "200px";
    // btn.formMethod = "POST";
    // btn.formAction = "leaderboard.php";
    btn.onclick = function () {
        // alert("The Button Works");
        window.location.href = "leaderboard.php";
    };
    return btn;
}

function createRestartButton(){
    let btn = document.createElement("button");
    btn.innerHTML = "Restart";
    btn.type = "Submit";
    btn.name = "Restart";
    btn.onclick = function (){
        window.location.href = "tetris.php";
    };
    return btn;
};

function addToLeaderboard() {
    let ajax = new XMLHttpRequest();
    let userScore = "Score=" + score;
    ajax.open("POST", "processing.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(userScore);
    //alert("test");
}

function getGamePieces(id, direction) {
    let rotationGamePieces = {
        L: [
            [
                [1, 1],
                [1, 2],
                [1, 3],
                [2, 3],
            ],
            [
                [1, 2],
                [2, 2],
                [3, 2],
                [3, 1],
            ],
            [
                [1, 1],
                [2, 1],
                [2, 2],
                [2, 3],
            ],
            [
                [1, 1],
                [1, 2],
                [2, 1],
                [3, 1],
            ],
        ],
        Z: [
            [
                [1, 1],
                [2, 1],
                [2, 2],
                [2, 3],
            ],
            [
                [1, 1],
                [1, 2],
                [2, 1],
                [3, 1],
            ],
            [
                [1, 1],
                [1, 2],
                [1, 3],
                [2, 3],
            ],
            [
                [1, 2],
                [2, 2],
                [3, 2],
                [3, 1],
            ],
        ],
        S: [
            [
                [1, 2],
                [2, 1],
                [2, 2],
                [3, 1],
            ],
            [
                [1, 1],
                [1, 2],
                [2, 2],
                [2, 3],
            ],
            [
                [1, 2],
                [2, 1],
                [2, 2],
                [3, 1],
            ],
            [
                [1, 1],
                [1, 2],
                [2, 2],
                [2, 3],
            ],
        ],
        T: [
            [
                [1, 1],
                [2, 1],
                [2, 2],
                [3, 1],
            ],
            [
                [1, 1],
                [1, 2],
                [1, 3],
                [2, 2],
            ],
            [
                [1, 2],
                [2, 1],
                [2, 2],
                [3, 2],
            ],
            [
                [1, 2],
                [2, 1],
                [2, 2],
                [2, 3],
            ],
        ],
        O: [
            [
                [1, 1],
                [1, 2],
                [2, 1],
                [2, 2],
            ],
        ],
        I: [
            [
                [1, 1],
                [1, 2],
                [1, 3],
                [1, 4],
            ],
            [
                [1, 1],
                [2, 1],
                [3, 1],
                [4, 1],
            ],
            [
                [1, 1],
                [1, 2],
                [1, 3],
                [1, 4],
            ],
            [
                [1, 1],
                [2, 1],
                [3, 1],
                [4, 1],
            ],
        ],
    };
    //console.log(rotationGamePieces[id]);
    return rotationGamePieces[id][direction];
}

function rotate() {
    let positions = locateBlock();
    let colour = grid[positions[0][0]][positions[0][1]].style.backgroundColor;
    let id;
    for (col in colours) {
        if (colours[col].toLowerCase() == colour.toLowerCase()) {
            id = col;
            break;
        }
    }
    //console.log(positions);
    let block, sX, sY, valid, pivot;
    switch (id) {
        case "I":
            block = getGamePieces(id, ++direction % 4);
            pivot = 2;
            sX = positions[pivot][0] - 2;
            sY = positions[pivot][1] - 2;
            valid = checkRotation(sX, sY, block);
            if (valid) {
                removeCurrent(positions);
                for (z in block) {
                    let x = block[z][0] + sX;
                    let y = block[z][1] + sY;
                    grid[x][y].id = "block";
                    grid[x][y].style.backgroundColor = colour;
                }
            } else {
                direction--;
            }
            break;
        case "O":
            break;
        case "L":
            block = getGamePieces(id, ++direction % 4);
            //console.log(block);
            pivot = 2;
            sX = positions[pivot][0] - 2;
            sY = positions[pivot][1] - 1;
            valid = checkRotation(sX, sY, block);
            if (valid) {
                removeCurrent(positions);
                for (z in block) {
                    let x = block[z][0] + sX;
                    let y = block[z][1] + sY;
                    grid[x][y].id = "block";
                    grid[x][y].style.backgroundColor = colour;
                }
            } else {
                direction--;
            }
            break;
        case "Z":
            block = getGamePieces(id, ++direction % 4);
            //console.log(block);
            pivot = 2;
            sX = positions[pivot][0] - 2;
            sY = positions[pivot][1] - 1;
            valid = checkRotation(sX, sY, block);
            if (valid) {
                removeCurrent(positions);
                for (z in block) {
                    let x = block[z][0] + sX;
                    let y = block[z][1] + sY;
                    grid[x][y].id = "block";
                    grid[x][y].style.backgroundColor = colour;
                }
            } else {
                direction--;
            }
            break;
        case "S":
            block = getGamePieces(id, ++direction % 4);
            console.log(block);
            pivot = 2;
            sX = positions[pivot][0] - 2;
            sY = positions[pivot][1] - 1;
            console.log(sX, sY);
            valid = checkRotation(sX, sY, block);
            if (valid) {
                removeCurrent(positions);
                for (z in block) {
                    let x = block[z][0] + sX;
                    let y = block[z][1] + sY;
                    grid[x][y].id = "block";
                    grid[x][y].style.backgroundColor = colour;
                }
            } else {
                direction--;
            }
            break;
        case "T":
            block = getGamePieces(id, ++direction % 4);
            console.log(block);
            pivot = 2;
            sX = positions[pivot][0] - 2;
            sY = positions[pivot][1] - 1;
            console.log(sX, sY);
            valid = checkRotation(sX, sY, block);
            if (valid) {
                removeCurrent(positions);
                for (z in block) {
                    let x = block[z][0] + sX;
                    let y = block[z][1] + sY;
                    grid[x][y].id = "block";
                    grid[x][y].style.backgroundColor = colour;
                }
            } else {
                direction--;
            }
            break;
    }
}

function checkRotation(sX, sY, block) {
    console.log(sX, sY);
    let valid = true;
    for (cell in block) {
        let x = block[cell][0] + sX;
        let y = block[cell][1] + sY;
        console.log(x, y);
        if (checkObstucted(x, y)) valid = false;
    }
    return valid;
}
