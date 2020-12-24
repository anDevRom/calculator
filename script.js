class Calculator {
    constructor(previousNumberTextElement, currentNumberTextElement) {
        this.previousNumberTextElement = previousNumberTextElement;
        this.currentNumberTextElement = currentNumberTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) {return};
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") {return};
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    sqrt() {
        if (Number(this.currentOperand) < 0) {
            alert("Невозможно извлечь квадратный корень из отрицательного числа")
            this.clear()
        } else {
            this.currentOperand = Math.sqrt(parseFloat(this.currentOperand))
        }
    }
    
    changeSign() {
        if (this.currentOperand !== "") {
            if (Number(this.currentOperand) > 0) {
                this.currentOperand = String(0 - Number(this.currentOperand));
            } else if (Number(this.currentOperand) < 0) {
                this.currentOperand = String(Math.sqrt(Number(this.currentOperand) * Number(this.currentOperand)));
            }
        }
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) {return};
        switch(this.operation) {
            case "/":
                computation = prev / current
                break;
            case "*":
                computation = prev * current
                break;
            case "+":
                computation = prev + current
                break;
            case "-":
                computation = prev - current
                break;
            case "exp":
                computation = Math.pow(prev, current)
                break;
            default: 
                return; 
        }

        this.currentOperand = Number(computation.toFixed(10));
        this.previousOperand = "";
        this.operation = undefined;
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentNumberTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousNumberTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousNumberTextElement.innerText = "";
        }       
    }
}

const operationButtons = document.querySelectorAll("[data-operation]");
const sqrtOperationButton = document.querySelector("[data-operation-sqrt]");
const changeOperationButton = document.querySelector("[data-operation-change]");
const numberButtons = document.querySelectorAll("[data-number]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalButton = document.querySelector("[data-equal]");
const previousNumberTextElement = document.querySelector("[data-previous-number]");
const currentNumberTextElement = document.querySelector("[data-current-number]");

const calculator = new Calculator(previousNumberTextElement, currentNumberTextElement);
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
    
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

sqrtOperationButton.addEventListener("click", () => {
    calculator.sqrt();
    calculator.updateDisplay();
})

changeOperationButton.addEventListener("click", () => {
    calculator.changeSign();
    calculator.updateDisplay();
})

equalButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})