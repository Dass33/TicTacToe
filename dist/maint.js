"use strict";
class PlayerTurns {
    constructor() {
        this.turnOf = 0;
    }
    placeOX(img) {
        if (img.classList.contains("cantPlace"))
            return;
        if (this.turnOf % 2 === 0) {
            img.src = "./img/cross.svg";
            img.classList.add("cantPlace");
            img.setAttribute("symbol", "cross");
        }
        else {
            img.src = "./img/circle.svg";
            img.classList.add("cantPlace");
            img.setAttribute("symbol", "circle");
        }
        console.log(gridArr);
        this.turnOf++;
    }
    winChech() {
    }
}
const board = document.getElementById("boardId");
const size = 8;
const playerTurn = new PlayerTurns();
const gridArr = [];
for (let i = 0; i < size; i++) {
    const tr = document.createElement("tr");
    tr.classList.add("boardTr");
    const rowArr = [];
    for (let i = 0; i < size; i++) {
        const td = document.createElement("td");
        td.classList.add("boardTd");
        const img = document.createElement("img");
        img.src = "./img/square.svg";
        td.addEventListener("click", () => {
            playerTurn.placeOX(img);
            rowArr[i] = (img.getAttribute("symbol"));
        });
        img.classList.add("boardImg");
        td.appendChild(img);
        tr.appendChild(td);
    }
    gridArr.push(rowArr);
    board === null || board === void 0 ? void 0 : board.appendChild(tr);
}
