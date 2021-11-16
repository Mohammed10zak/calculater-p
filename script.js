class Calculater {
	constructor(previousOperandTextElemnt, currentOperandTextElemnt) {
		this.previousOperandTextElemnt = previousOperandTextElemnt;
		this.currentOperandTextElemnt = currentOperandTextElemnt;
		this.clear();
	}
	clear() {
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentOperand === '') return;
		if (this.previousOperand !== '') {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	compute() {
		let result;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);

		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case '+':
				result = prev + current;
				break;
			case '-':
				result = prev - current;
				break;
			case '*':
				result = prev * current;
				break;
			case '÷':
				result = prev / current;
				break;
			default:
				return;
		}

		this.currentOperand = result;
		this.operation = undefined;
		this.previousOperand = '';
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		const decimalDigits = stringNumber.split('.')[1];
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = '';
		} else {
			integerDisplay = integerDigits.toLocaleString('en', {
				maximumFractionDigits: 0
			});
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisblay() {
		this.currentOperandTextElemnt.innerText = this.getDisplayNumber(this.currentOperand);
		if (this.operation != null) {
			this.previousOperandTextElemnt.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this
				.operation}`;
		} else {
			this.previousOperandTextElemnt.innerText = '';
		}
	}
}

const numberButtons = document.querySelectorAll('[number]');
const operationButtons = document.querySelectorAll('[operation]');
const equalButton = document.querySelector('[equals]');
const deleteButton = document.querySelector('[delete]');
const allClearButton = document.querySelector('[all-clear]');
const previousOperandTextElemnt = document.querySelector('[previous-operand]');
const currentOperandTextElemnt = document.querySelector('[current-operand]');
const calculater = new Calculater(previousOperandTextElemnt, currentOperandTextElemnt);

numberButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculater.appendNumber(button.innerText);
		calculater.updateDisblay();
	});
});

operationButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculater.chooseOperation(button.innerText);
		calculater.updateDisblay();
	});
});

equalButton.addEventListener('click', (button) => {
	calculater.compute();
	calculater.updateDisblay();
});

allClearButton.addEventListener('click', () => {
	calculater.clear();
	calculater.updateDisblay();
});

deleteButton.addEventListener('click', (button) => {
	calculater.delete();
	calculater.updateDisblay();
});
