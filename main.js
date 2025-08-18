//Written by Teehee

//settings
const emptyCellColor = "white";
const takenCellColor = "black";

//get the grid size
const confirmGridBtn = document.querySelector("#bsize");

confirmGridBtn.addEventListener("click", () => {
	const fsize = document.querySelector("#fsize"); 
	const warning = document.querySelector(".warning");

	const size = parseInt(fsize.value);

	console.log(size);
	if(Number.isNaN(size) || size < 0 || size > 100)
		warning.textContent = `Error! Please input a number between 0-100!`;
	else {
		warning.textContent = `Grid Size: ${size}`;
		setGridSize(size);
		playGrid();
	}

	fsize.value = "";
});

//set up grid
function clearGrid(parent) {
	parent.innerHTML = "";
}

function clearGridDrawing(parent) {
	const cellsY = [...parent.childNodes];

	cellsY.forEach(cellsX => {
		cells = [...cellsX.childNodes];

		//remove all the class styles indicated
		cells.forEach(cell => {
			cell.style.backgroundColor = emptyCellColor;
			cell.style.removeProperty("opacity");
		});
	});
}

function setGridSize(size) {
	const container = document.querySelector("#container");

	clearGrid(container);

	for(let i = 0; i < size; i++) {
		const cellY = document.createElement("div");
		cellY.classList.add("cellsY")

		for(let j = 0; j < size; j++) {
			const cellX = document.createElement("div");
			cellX.classList.add("cellsX");
			cellY.appendChild(cellX);
		}

		container.appendChild(cellY);
	}
}

//event listeners for grid
function playGrid() {
	console.log("playing classic grid...");
	const container = document.getElementById("container");
	const cellsY = container.children;

	clearGridDrawing(container);

	//UNO////////////////////////////////////////////
	[...cellsY].forEach(cellsX => {
		[...cellsX.childNodes].forEach(cell => {
			cell.addEventListener("mouseover", () => {
				cell.style.backgroundColor = takenCellColor;
			})
		})
	});

	//DOS/////////////////////////////////////////////
	/*
	for(let i = 0; i < cellsY.length; i++) {
		const cellsX = cellsY[i].childNodes;
		for(let j = 0; j < cellsX.length; j++) {
			cellsX[j].addEventListener("mouseover", () => {
				cellsX[j].style.backgroundColor = "black";	
			});
		}
	}
	*/
}

function getRandomRgbColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);

	return `rgb(${r}, ${g}, ${b})`;
}

function playRgbGrid() {
	console.log("playing rgb grid...");
	const container = document.getElementById("container");
	const cellsY = container.children;

	clearGridDrawing(container);

	[...cellsY].forEach(cellsX => {
		[...cellsX.childNodes].forEach(cell => {
			cell.addEventListener("mouseover", () => {
				cell.style.backgroundColor = getRandomRgbColor();
			});
		});
	});
}

function playDarkeningGrid() {
	console.log("playing darkening grid...");
}

//settings
//gets the reference to all settings children and spreads it into an array
const settingsBtn = [...document.getElementById("settings").children];


settingsBtn.forEach((btn, index) => {
	console.log(btn.textContent);
	btn.addEventListener("click", () => {
		settingsBtn.forEach(btn => {
			btn.classList.remove("highlight");
		})
		btn.classList.add("highlight");

		switch(btn.textContent) {
			case "rgb mode": 
				playRgbGrid();
				break;
			case "classic":
				playGrid();
				break;
			case "darkening mode":
				playDarkeningGrid();
				break;
		}
	})
});

//DEFAULT GAME
settingsBtn[1].classList.add("highlight");
setGridSize(64);
playGrid();
