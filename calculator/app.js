'use strict';

const display = document.getElementById('display');
const equationInput = document.getElementById('equationInput');
const calculator = document.getElementById('calculator');

let equation = [];
let displayValue = [];

function togglePlusMinus() {
	if (displayValue[0] !== '-') {
		displayValue.unshift('-');
		display.textContent = displayValue.join('');
	} else {
		displayValue.shift();
		display.textContent = displayValue.join('');
	}
}

function convertToPercent() {
	let result = display.textContent;

	if (result.length > 0) {
		result = [result / 100];
	}

	display.textContent = result;
	equation = [result];
}

calculator.addEventListener('mousedown', function(e) {
	const target = e.target;
	const operations = ['+', '−', '×', '÷'];
	const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

	if (target.classList.contains('button')) {
		target.classList.add('active-btn');
	}

	if (operations.includes(target.innerText)) {
		if (displayValue.length > 0) equation.push(displayValue.join(''));

		if (equation.length > 2) operate(equation);

		equation.push(target.innerText);
		displayValue = [];
	}

	if ((target.innerText === '=') && (equation.length > 1)) {
		equation.push(displayValue.join(''));
		operate(equation);
		displayValue = [];
	}

	if ((target.innerText === '=') && (equation.length === 1)) {
		display.textContent = equation.join('');
		displayValue = [];
	}

	if ((displayValue.includes('.')) && (target.innerText === '.')) return;

	if (numbers.includes(target.innerText)) {
		if ((target.innerText === '.') && (displayValue.length === 0)) {
			displayValue.unshift('0');
			console.log(true);
		}

		displayValue.push(target.innerText);
		display.textContent = displayValue.join('');
	}
});

calculator.addEventListener('mouseup', function(e) {
	if (e.target.classList.contains('button')) {
		e.target.classList.remove('active-btn');
	}
});

// operations

function operate(arr) {
	display.classList.remove('alert');

	let operator, num1, num2, result;

	arr = arr.map(item => {
		if (isNaN(item)) return item;

		return Number(item);
	});

	for (let i of arr) {
		if ((typeof i === 'number') && (num1 === undefined)) {
			num1 = i;
			continue;
		}

		if ((typeof i === 'number') && (num2 === undefined)) {
			num2 = i;
			continue;
		}

		if (typeof i === 'string') {
			operator = i;
		}
	}

	switch(operator) {
		case '+':
			result = num1 + num2;
			break;
		case '−':
			result = num1 - num2;
			break;
		case '×':
			result = num1 * num2;
			break;
		case '÷':
			result = num1 / num2;
			break;
	}

	if ((operator === '÷') && (num2 === 0)) {
		const messages = ['ahh, wtf did you do?!', `aaand you broke it.`, 'seriously, stop that.', 'game over, you lose.',]
		const random = Math.floor(Math.random() * messages.length);

		display.classList.add('alert');
		result = messages[random];
		equation = [];
		displayValue = [];
	}

	console.log(equation);
	equation = [result];
}

function clearAll() {
	display.classList.remove('alert');
	displayValue = [];
	equation = [];
	display.textContent = '0';
}

// add theme




























