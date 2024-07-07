import startGame from "./maint.js";
const modal = document.getElementById("modalSettings");
const btn = document.getElementsByClassName("fa-cog");
const refresh = document.getElementsByClassName("fa-refresh");
const sizeInputElement = document.getElementById("boardSizeInput");
const sizeShowElement = document.getElementById("boardSizeShow");
const toWinInputElement = document.getElementById("symbolsToWinInput");
const toWinShowElement = document.getElementById("symbolsToWinShow");

updateSize();
updateSymbolsToWin();

sizeInputElement?.addEventListener("input", updateSize);
toWinInputElement?.addEventListener("input", updateSymbolsToWin);

const arrBtn = Array.from(btn);
arrBtn.forEach(element => {
	element.addEventListener("click", () => {
		if (modal != null) {
			modal.style.display = "block";
		}
	});
});

refresh[0].addEventListener("click", () => restartGame());

window.onclick = function(event) {
	if ((event).target == modal) {
		if (modal != null) {
			modal.style.display = "none";
		}
	}
}

function updateSize() {
	if (sizeInputElement != undefined) {
		if (parseInt((sizeInputElement as HTMLInputElement).value) > 9) {
			(sizeShowElement as HTMLSpanElement).innerText = (sizeInputElement as HTMLInputElement).value;
		}
		else {
			(sizeShowElement as HTMLSpanElement).innerText = "0" + (sizeInputElement as HTMLInputElement).value;
		}
		localStorage.setItem("boardSize", (sizeInputElement as HTMLInputElement).value);
		restartGame();
	}
}

function updateSymbolsToWin() {
	if (toWinInputElement != undefined) {
		(toWinShowElement as HTMLSpanElement).innerText = "0" + (toWinInputElement as HTMLInputElement).value;
		localStorage.setItem("symbolsToWinInput", (toWinInputElement as HTMLInputElement).value);
	}
	restartGame();
}

function restartGame() {
	const boardDiv = document.getElementById("boardDiv");
	if (boardDiv?.firstChild) {
		boardDiv?.removeChild(boardDiv.firstChild);
		startGame();
	}
}

export default function resetScore() {
	const resetScoreElement = document.getElementById("resetScore");
	const winCounterElements = Array.from(document.getElementsByClassName("winCounterSpan"));
	resetScoreElement?.addEventListener("click", () => {
		winCounterElements.forEach(item => {
			localStorage.setItem(item.id, "0");
			(item as HTMLSpanElement).innerText = ":00";
		});
	});
}

