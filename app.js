let previousOperandView = document.getElementById('previous-operand');
let currentOperandView = document.getElementById('current-operand');
let operatorBtn = document.querySelectorAll('.operator');
let numbersBtn = document.querySelectorAll('.numbers');
let resultBtn = document.getElementById('resultBtn');
let clearBtn = document.getElementById('clearBtn');

class Caculator {
    constructor(previousOperandView, currentOperandView) {
        this.previousOperandView = previousOperandView;
        this.currentOperandView = currentOperandView;
        this.clear();
    };
    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operator = "";
    }
    appendNumber(number) {
        if (number === "." && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperator(operator) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") this.compute();
        this.previousOperand = this.currentOperand;
        this.operator = operator;
        this.currentOperand = "";
    }
    compute() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.previousOperand = "";
        this.operator = "";
    }

    updateDisplay() {
        this.currentOperandView.innerText = this.currentOperand;
        if (this.operator != "") {  
            this.previousOperandView.innerText = `${this.previousOperand} ${this.operator}`;
        } else {
            this.previousOperandView.innerText = this.previousOperand;
        }
    }
}
const calculator = new Caculator(previousOperandView, currentOperandView);

numbersBtn.forEach(number => {
    number.addEventListener('click', () => { 
        calculator.appendNumber(number.innerText);
        calculator.updateDisplay();
    })
});

operatorBtn.forEach(operator => {
    operator.addEventListener('click', () => {
        calculator.chooseOperator(operator.innerText);
        calculator.updateDisplay();
    });
})
resultBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})
clearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})






