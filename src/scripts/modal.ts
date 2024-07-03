const modal = document.getElementById("modalSettings");
const btn = document.getElementsByClassName("fa-cog");
const refresh = document.getElementsByClassName("fa-refresh");
const sizeInputElement = document.getElementById("boardSizeInput");
const symbolsToWinElement = document.getElementById("symbolsToWinInput");
sizeInputElement?.addEventListener("input", () => {
	//implement here updatning of span which shows selected num
	updateSize()
});

symbolsToWinElement?.addEventListener("input", () => {
	//implement here updatning of span which shows selected num
	updateSymbolsToWin();
});

const arrBtn = Array.from(btn);
arrBtn.forEach(element => {
	element.addEventListener("click", () => {
		if (modal != null) {
			modal.style.display = "block";
		}
	});
});

refresh[0].addEventListener("click", () => location.reload());

window.onclick = function(event) {
	if ((event).target == modal) {
		if (modal != null) {
			modal.style.display = "none";
			location.reload();
		}
	}
}

function updateSize() {
	if (sizeInputElement != undefined) {
		localStorage.setItem("boardSize", (sizeInputElement as HTMLInputElement).value);
	}
}

function updateSymbolsToWin() {
	if (symbolsToWinElement != undefined) {
		localStorage.setItem("symbolsToWinInput", (symbolsToWinElement as HTMLInputElement).value);
	}
}
