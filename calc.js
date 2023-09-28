let button = document.getElementById('button')
let output = document.getElementById('output')
let displayfunction = document.getElementById('function')

let displayValue = 0
let equation = ''
let operation = 'none'
let afterEqualBool = false
clear()

function updateFunction(input){
    if (equation == '0') equation = ''
    equation += input
    if (equation == '') equation = '0'
    displayfunction.innerHTML = equation
}

function displayBottom(){
    if (displayValue == Infinity || displayValue == -Infinity) output.innerHTML = 'ERROR'
    else output.innerHTML = displayValue
}

function addDigit(value){
    if (afterEqualBool) afterEqual('addDigit')
    displayValue = (displayValue * 10) + value;
    displayBottom()
}

function clear(){
    equation = '0'
    displayValue = 0
    afterEqualBool = false
    updateFunction('')
    displayBottom()
}

function operator(operation){
    if (afterEqualBool) {
        afterEqual() 
        displayValue ? updateFunction(operation) : updateFunction('0' + operation)
    }
    else updateFunction(displayValue + operation)
    displayValue = 0
    displayBottom()
}

function equal(){
    if (afterEqualBool) {
        displayValue = eval(equation)
        equation = displayValue.toString()
        updateFunction('')
    } else {
        updateFunction(displayValue)
        displayValue = eval(equation)
        displayBottom()
        afterEqualBool = true
    }
}

function afterEqual(type = null){
    if (displayValue == Infinity || displayValue == -Infinity) clear()
    equation = ''
    updateFunction(displayValue)
    if (type == 'addDigit') {
        displayValue = eval(equation)
        equation = '0'
    }
    afterEqualBool = false
}

function clickHandle(handle){
    switch(handle){
        case '1':
            addDigit(1)
            break;
        case '2':
            addDigit(2)
            break;
        case '3':
            addDigit(3)
            break;
        case '4':
            addDigit(4)
            break;
        case '5':
            addDigit(5)
            break;
        case '6':
            addDigit(6)
            break;
        case '7':
            addDigit(7)
            break;
        case '8':
            addDigit(8)
            break;
        case '9':
            addDigit(9)
            break;
        case '0':
            addDigit(0)
            break;
        case 'C':
            clear()
            break;
        case 'c':
            clear()
            break;
        case ' ':
            clear()
            break;
        case '+':
            operator('+')
            break;
        case '-':
            operator('-')
            break;
        case '*':
            operator('*')
            break;
        case '/':
            operator('/')
            break;
        case '=':
            equal()
            break;
        default:
            break;
    }
}

document.body.addEventListener('click', function(event) {
    if(event.target.classList.contains('button')) {
        clickHandle(event.target.innerText)
    }
})

window.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') clickHandle('=')
    else if (e.key == 'Backspace') clickHandle('c')
    else clickHandle(e.key)
})