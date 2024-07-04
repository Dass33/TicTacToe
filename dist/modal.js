"use strict";
const modal = document.getElementById("modalSettings");
const btn = document.getElementsByClassName("fa-cog");
const refresh = document.getElementsByClassName("fa-refresh");
const sizeInputElement = document.getElementById("boardSizeInput");
const sizeShowElement = document.getElementById("boardSizeShow");
const toWinInputElement = document.getElementById("symbolsToWinInput");
const toWinShowElement = document.getElementById("symbolsToWinShow");
updateSize();
updateSymbolsToWin();
sizeInputElement === null || sizeInputElement === void 0 ? void 0 : sizeInputElement.addEventListener("input", updateSize);
toWinInputElement === null || toWinInputElement === void 0 ? void 0 : toWinInputElement.addEventListener("input", updateSymbolsToWin);
const arrBtn = Array.from(btn);
arrBtn.forEach(element => {
    element.addEventListener("click", () => {
        if (modal != null) {
            modal.style.display = "block";
        }
    });
});
refresh[0].addEventListener("click", () => location.reload());
window.onclick = function (event) {
    if ((event).target == modal) {
        if (modal != null) {
            modal.style.display = "none";
            location.reload();
        }
    }
};
function updateSize() {
    if (sizeInputElement != undefined) {
        if (parseInt(sizeInputElement.value) > 9) {
            sizeShowElement.innerText = sizeInputElement.value;
        }
        else {
            sizeShowElement.innerText = "0" + sizeInputElement.value;
        }
        localStorage.setItem("boardSize", sizeInputElement.value);
    }
}
function updateSymbolsToWin() {
    if (toWinInputElement != undefined) {
        toWinShowElement.innerText = "0" + toWinInputElement.value;
        localStorage.setItem("symbolsToWinInput", toWinInputElement.value);
    }
}
