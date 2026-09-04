const display = document.getElementById('display');

let firstOperand = null;   // stored number before operator
let operator = null;       // stored operator (+, -, *, /, %)
let currentInput = '0';    // what's currently shown/typed
let justEvaluated = false;

function updateDisplay() {
  display.textContent = currentInput;
}

// Numbers and decimal point
document.querySelectorAll('.number, .point').forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value ?? btn.textContent;

    if (currentInput === '0' || justEvaluated) {
      currentInput = (value === '.') ? '0.' : value;
      justEvaluated = false;
    } else {
      currentInput += value;
    }
    updateDisplay();
  });
});

// Operators, including % as modulus
document.querySelectorAll('.operator, #percentage').forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value ?? btn.textContent;

    if (firstOperand === null) {
      // First operator pressed: store the number, clear display
      firstOperand = parseFloat(currentInput);
    } else if (!justEvaluated) {
      // Chaining operators: calculate the running result first
      firstOperand = calculate(firstOperand, parseFloat(currentInput), operator);
    }

    operator = value;
    currentInput = '0';       // clears the number from the screen
    justEvaluated = false;
    updateDisplay();
  });
});

// Delete last character
document.getElementById('delet').addEventListener('click', () => {
  currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
  updateDisplay();
});

// All Clear
document.getElementById('del-All').addEventListener('click', () => {
  firstOperand = null;
  operator = null;
  currentInput = '0';
  justEvaluated = false;
  updateDisplay();
});

// Equals
document.querySelector('.equal').addEventListener('click', () => {
  if (firstOperand === null || operator === null) return;

  const secondOperand = parseFloat(currentInput);
  const result = calculate(firstOperand, secondOperand, operator);

  currentInput = String(result);
  firstOperand = null;
  operator = null;
  justEvaluated = true;
  updateDisplay();
});

// Core math logic
function calculate(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b === 0 ? 'Error' : a / b;
    case '%': return a % b;
    default: return b;
  }
}

// Light and dark mode Codes 
document.addEventListener('DOMContentLoaded', () => {

  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Load saved theme on page load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    toggleBtn.textContent = '☀️';
  }

  // Toggle on click
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
      toggleBtn.textContent = '☀️';
      localStorage.setItem('theme', 'light');
    } else {
      toggleBtn.textContent = '🌙';
      localStorage.setItem('theme', 'dark');
    }
  });

});