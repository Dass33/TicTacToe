"use strict";
class PlayerTurns {
    constructor(streakToWin, size) {
        this.turnOf = 0;
        this.symbolStreak;
        this.lastElement;
        this.streakToWin = streakToWin;
        this.boardSize = size - 1;
        this.gameIsGoing = true;
    }
    placeOX(img) {
        if (!img.classList.contains("canPlace"))
            return;
        if (this.turnOf % 2 === 0 && this.gameIsGoing) {
            img.src = "./src/img/cross.svg";
            img.setAttribute("symbol", "cross");
        }
        else if (this.gameIsGoing) {
            img.src = "./src/img/circle.svg";
            img.setAttribute("symbol", "circle");
        }
        img.classList.add("cantPlace");
        img.classList.remove("canPlace");
        this.turnOf++;
    }
    winRowChech(arr, rowNum, rowImageArr) {
        const row = 0;
        let winnArr;
        let rowColumn;
        this.symbolStreak = 1;
        arr[rowNum].forEach((inRowItem, i) => {
            if (this.lastElement == inRowItem) {
                this.symbolStreak++;
                rowColumn = [i, rowNum];
                winnArr.push(rowColumn);
            }
            else {
                this.symbolStreak = 1;
                winnArr = [];
            }
            if (this.symbolStreak >= this.streakToWin) {
                winnArr.unshift([i - (this.symbolStreak - 1), rowNum]);
                this.endGame(winnArr, rowImageArr, this.lastElement);
            }
            this.lastElement = inRowItem;
        });
        this.lastElement = "";
    }
    winColumnChech(arr, columnNum, rowImageArr) {
        const column = 1;
        let winnArr = [];
        let rowColumn;
        this.symbolStreak = 1;
        arr.forEach((row, i) => {
            const inColumnItem = row[columnNum];
            if (this.lastElement == inColumnItem && this.lastElement !== undefined) {
                this.symbolStreak++;
                rowColumn = [columnNum, i];
                winnArr.push(rowColumn);
            }
            else {
                this.symbolStreak = 1;
                winnArr = [];
            }
            if (this.symbolStreak >= this.streakToWin) {
                winnArr.unshift([columnNum, i - (this.symbolStreak - 1)]);
                this.endGame(winnArr, rowImageArr, this.lastElement);
            }
            this.lastElement = inColumnItem;
        });
        this.lastElement = "";
    }
    winDiagonalRightCheck(arr, columnNum, rowNum, rowImageArr) {
        const diagonalRight = 2;
        let winnArr = [];
        let rowColumn;
        this.symbolStreak = 1;
        for (let i = 0; i < arr.length; i++) {
            let currRow = rowNum + i - columnNum;
            let currColumn = i;
            if (currRow >= 0 && currRow < arr.length) {
                const inDiagonalItem = arr[currRow][currColumn];
                if (this.lastElement == inDiagonalItem && this.lastElement !== undefined) {
                    this.symbolStreak++;
                    rowColumn = [currColumn, currRow];
                    winnArr.push(rowColumn);
                }
                else {
                    this.symbolStreak = 1;
                    winnArr = [];
                }
                if (this.symbolStreak >= this.streakToWin) {
                    winnArr.unshift([i - (this.symbolStreak - 1), rowNum + i - columnNum - (this.symbolStreak - 1)]);
                    this.endGame(winnArr, rowImageArr, this.lastElement);
                }
                this.lastElement = inDiagonalItem;
            }
        }
        this.lastElement = "";
    }
    winDiagonalLeftCheck(arr, columnNum, rowNum, rowImageArr) {
        const diagonalLeft = 3;
        let winnArr = [];
        let rowColumn;
        this.symbolStreak = 1;
        for (let i = 0; i < arr.length; i++) {
            let currRow = (columnNum + rowNum + i) - this.boardSize;
            let currColumn = this.boardSize - i;
            if (currRow >= 0 && currRow < arr.length) {
                const inDiagonalItem = arr[currRow][currColumn];
                if (this.lastElement == inDiagonalItem && this.lastElement !== undefined) {
                    this.symbolStreak++;
                    rowColumn = [currColumn, currRow];
                    winnArr.push(rowColumn);
                }
                else {
                    this.symbolStreak = 1;
                    winnArr = [];
                }
                if (this.symbolStreak >= this.streakToWin) {
                    winnArr.unshift([(this.boardSize - i + this.symbolStreak - 1),
                        (columnNum + rowNum + i) - this.boardSize - (this.symbolStreak - 1)]);
                    this.endGame(winnArr, rowImageArr, this.lastElement);
                }
                this.lastElement = inDiagonalItem;
            }
        }
        this.lastElement = "";
    }
    endGame(winArr, grid, winner) {
        this.gameIsGoing = false;
        winArr.forEach(([column, row]) => {
            grid[row][column].src = `./img/src/${winner}Win.svg`;
        });
        const winCounterElement = document.getElementById(`${winner}WinCounter`);
        let winCount = localStorage.getItem(`${winner}WinCounter`);
        if (winCount != undefined) {
            winCount = (parseInt(winCount) + 1).toString();
            localStorage.setItem(`${winner}WinCounter`, winCount);
        }
        else {
            localStorage.setItem(`${winner}WinCounter`, "1");
            winCount = localStorage.getItem(`${winner}WinCounter`);
        }
        if (winCounterElement != undefined && winCount != null) {
            parseInt(winCount) < 10 ? winCounterElement.innerText = `:0${winCount}` : winCounterElement.innerText = `:${winCount}`;
        }
    }
}
function shouldResetScore() {
    const resetScoreElement = document.getElementById("resetScore");
    const winCounterElements = Array.from(document.getElementsByClassName("winCounterSpan"));
    resetScoreElement === null || resetScoreElement === void 0 ? void 0 : resetScoreElement.addEventListener("click", () => {
        winCounterElements.forEach(item => localStorage.setItem(item.id, "0"));
    });
}
function startGame() {
    const board = document.getElementById("boardId");
    const boardSizeInput = localStorage.getItem("boardSize");
    let size;
    boardSizeInput != undefined ? size = parseInt(boardSizeInput) : size = 8;
    const symbolsToWinInput = localStorage.getItem("symbolsToWinInput");
    let symbolsToWin;
    symbolsToWinInput != undefined ?
        symbolsToWin = parseInt(symbolsToWinInput) : symbolsToWin = 4;
    if (symbolsToWin > size)
        symbolsToWin = size;
    const playerTurn = new PlayerTurns(symbolsToWin, size);
    const gridArr = [];
    const imageArr = [];
    const winCounterElements = Array.from(document.getElementsByClassName("winCounterSpan"));
    winCounterElements.forEach(item => {
        const winCounterElement = document.getElementById(item.id);
        let winCount = localStorage.getItem(item.id);
        if (winCounterElement != undefined && winCount != null) {
            parseInt(winCount) < 10 ? winCounterElement.innerText = `:0${winCount}` : winCounterElement.innerText = `:${winCount}`;
        }
    });
    let rowNum = 0;
    for (let i = 0; i < size; i++) {
        const tr = document.createElement("tr");
        tr.classList.add("boardTr");
        const rowArr = [];
        const rowImageArr = [];
        for (let columnNum = 0; columnNum < size; columnNum++) {
            const td = document.createElement("td");
            td.classList.add("boardTd");
            const img = document.createElement("img");
            img.src = "./src/img/square.svg";
            img.setAttribute("symbol", "square");
            img.classList.add("canPlace");
            //Immediately Invoked Function Expression, creates a new scope for each iteration
            ((currentRowNum) => {
                td.addEventListener("click", () => {
                    playerTurn.placeOX(img);
                    rowArr[columnNum] = img.getAttribute("symbol");
                    rowImageArr[columnNum] = img;
                    playerTurn.winRowChech(gridArr, currentRowNum, imageArr);
                    playerTurn.winColumnChech(gridArr, columnNum, imageArr);
                    playerTurn.winDiagonalRightCheck(gridArr, columnNum, currentRowNum, imageArr);
                    playerTurn.winDiagonalLeftCheck(gridArr, columnNum, currentRowNum, imageArr);
                });
            })(rowNum);
            img.classList.add("boardImg");
            td.appendChild(img);
            tr.appendChild(td);
        }
        gridArr.push(rowArr);
        imageArr.push(rowImageArr);
        board === null || board === void 0 ? void 0 : board.appendChild(tr);
        rowNum++;
    }
    shouldResetScore();
}
startGame();
