const grid = document.querySelector('.grid');
const colors = document.querySelector('.colors');
const rootEl = document.documentElement;
const rootStyles = window.getComputedStyle(rootEl);

const setGridDimenson = (val) => rootEl.style.setProperty('--grid_val', val);

function createGridSquares() {
	const gridDimension = rootStyles.getPropertyValue('--grid_val');

	for (let x = 1; x <= gridDimension; x++) {
		for (let y = 1; y <= gridDimension; y++) {
			let div = document.createElement('div');

			div.style.setProperty('grid-column', x);
			div.style.setProperty('grid-row', y);
			div.className = 'grid-square';

			if (x !== 1) {
				div.style.borderLeft = '1px solid #aaa';
			}

			if (y !== Number(gridDimension)) {
				div.style.borderBottom = '1px solid #aaa';
			}

			grid.appendChild(div);
		}
	}
}

function setNewGrid() {
	const val = prompt('How many squares per side would you like for your new grid?', 16);

	grid.innerHTML = '';
	setGridDimenson(val);
	createGridSquares();
}

createGridSquares();

grid.addEventListener('mouseover', function(e) {
	let random = () => Math.floor(Math.random() * 256);

	if (e.target === grid) return;

	e.target.style.backgroundColor = `rgb(${random()}, ${random()},${random()}`;
});