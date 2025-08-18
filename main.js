//Written by Teehee

//settings
const emptyCellColor = "white";
const takenCellColor = "black";
let currentMode = "classic";

//settings
function setMode(mode) {
	switch(mode) {
		case "classic": 
			playGrid();
			break;
		case "rgb mode":
			playRgbGrid();
			break;
		case "darkening mode":
			playDarkeningGrid();
			break;
	}
}

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
		setMode(currentMode);
	}

	fsize.value = "";
});

//set up grid
const container = document.getElementById("container");

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

function forEachCell(parent, callback) {
	row = [...parent.childNodes];
	
	row.forEach(colEntry => {
		col = [...colEntry.childNodes];

		col.forEach(cell => {
			callback(cell);
		});
	});
}

//event listeners for grid


function playGrid() {
	clearGridDrawing(container);
	forEachCell(container, cell => {
		cell.addEventListener("mouseover", () => {
			cell.style.backgroundColor = takenCellColor;
		});
	});
}

function getRandomRgbColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);

	return `rgb(${r}, ${g}, ${b})`;
}

function playRgbGrid() {
	clearGridDrawing(container);

	forEachCell(container, (cell) => {
		cell.addEventListener("mouseover", () => {
			cell.style.backgroundColor = getRandomRgbColor();
		});
	})
}

function playDarkeningGrid() {
	clearGridDrawing(container);

	const seenCells = [];
	let darkeningFunction;
	let cellReference;

	darkeningFunction = () => {
		cellReference.style.backgroundColor = takenCellColor;
		let opacity = parseFloat(cellReference.style.opacity);

		if(isNaN(opacity)) {
			opacity = 0.1;
			
			cellReference.style.opacity = opacity;
				
			if(seenCells.length == 10) { seenCells.shift(); }
			seenCells.push(cellReference);
		}

		for(let someCell of seenCells){
			let opacity = parseFloat(someCell.style.opacity);
			someCell.style.opacity = (opacity + 0.1);
		}
	}

	function addMyListener() {
		forEachCell(container, cell => {
			cell.addEventListener("mouseover", () => cellReference = cell);

			cell.addEventListener("mouseover", darkeningFunction);
		});
	}

	function removeListener() {
		forEachCell(container, cell => {
			cell.removeEventListener("mouseover", darkeningFunction);
		})
	}

	addMyListener();

	settingsBtn.forEach((btn, index) => {
		btn.addEventListener("click", removeListener);
		seenCells.length = 0;
	})
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

		let removeListener;
		currentMode = btn.textContent
		setMode(currentMode);
	})
});

//DEFAULT GAME
settingsBtn[1].classList.add("highlight");
setGridSize(64);
playGrid();
