'use strict';

const display = document.getElementById('display');
const calculator = document.getElementById('calculator');
const cancelBtn = document.getElementById('cancel');

let equation = [];
let currentValue = [];

function showValue() {
	const floatObj = currentValue.join('').match(/([09]){12,}/);

	if (floatObj) {
		currentValue.splice(floatObj.index);
		equation = [Number(currentValue.join(''))];
	}

	if (currentValue.length > 16) {
		currentValue.splice(17);
		equation = [Number(currentValue.join(''))];
	}

	display.textContent = currentValue.join('');
	console.log(currentValue, equation);
}

function toggleCancelBtn() {
	cancelBtn.textContent = 'C';
}

function cancel() {
	currentValue = [];
	equation = [];
	showValue();
	display.textContent = 0;
}

function operate() {
	let result;
	let operator = equation[1];

	const add = (a, b) => result = a + b;
	const subtract = (a, b) => result = a - b; 
	const multiply = (a, b) => result = a * b; 
	const divide = (a, b) => {
		if (b === 0) {
			result = 'nope, try again.';                           
		} else {
			result = a / b;
		}
	}

	if (currentValue.join('') !== equation.join('')) {
		equation.push(Number(currentValue.join('')));
	}

	if (equation.length === 3) {
		switch(operator) {
			case '+':
				add(equation[0], equation[2]);
				break;
			case '−':
				subtract(equation[0], equation[2]);
				break;
			case '×':
				multiply(equation[0], equation[2]);
				break;
			case '÷':
				divide(equation[0], equation[2]);
				break;
		}

		currentValue = String(result).split('');
		equation = [result];
	}
}

function equate() {
	operate();
	showValue();
}

function convertToPercent() {
	let num = currentValue.join('');
	currentValue = [num / 100];

	if (currentValue.join('') == equation.join('') / 100) {
		equation = [Number(currentValue.join(''))];
	}

	showValue();
}

function insertRadixPoint() {
	if (currentValue.includes('.')) return;
	if (currentValue.length === 0) currentValue.push(0);

	currentValue.push('.');
	showValue();
}

function toggleSign() {
	if (currentValue[0] === undefined) return;

	if (currentValue[0] === '-') {
		currentValue.shift();
	} else if (currentValue[0] !== '-') {
		currentValue.unshift('-');
	}

	if (equation.length === 1) equation = [Number(currentValue.join(''))];

	showValue();
}

// button interactivity

let clickedBtn;

function showActiveBtn(btn) {
	clickedBtn = btn;
	btn.classList.add('active-btn');
}

function removeActiveBtn() {
	clickedBtn.classList.remove('active-btn');
}

// event listeners

calculator.addEventListener('mousedown', function(e) {
	if (e.target.classList.contains('container')) return;
	if (e.target === display) return;

	showActiveBtn(e.target);

	const clickedValue = e.target.textContent;
	const operators = ['+','−','×','÷'];

	if (!isNaN(+clickedValue)) {
		currentValue.push(clickedValue);
		showValue();
	}

	if (operators.includes(clickedValue)) {
		operate();
		equation.push(clickedValue);
		showValue();
		currentValue = [];
	}
});

calculator.addEventListener('mouseup', function(e) {
	if (e.target.classList.contains('container')) return;
	if (e.target === display) return;

	removeActiveBtn();
});