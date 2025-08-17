//Written by Teehee

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
	while(parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
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
	const container = document.getElementById("container");
	const cellsY = container.children;
	
	console.log(cellsY);
	console.log(cellsY.length);

	for(let i = 0; i < cellsY.length; i++) {
		const cellsX = cellsY[i].childNodes;
		for(let j = 0; j < cellsX.length; j++) {
			cellsX[j].addEventListener("mouseover", () => {
				cellsX[j].style.backgroundColor = "black";	
			})
		}
	}
}

//initialize grid
setGridSize(64);
playGrid();
