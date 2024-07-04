let result = 0;
let currentNumber = 0;
let lastOperation = "";
let lastNumber = 0;
let isNewNumber = false;
const maxDigits = 10;

$(document).ready(function(){
    // Обработчики для числовых кнопок
    $(".symbolButton").click(function(){
        let buttonValue = $(this).text();
        if (!isNaN(buttonValue)) {
            if (isNewNumber) {
                currentNumber = parseInt(buttonValue);
                isNewNumber = false;
            } else {
                // Проверка на количество цифр
                if (currentNumber.toString().length < maxDigits) {
                    currentNumber = currentNumber * 10 + parseInt(buttonValue);
                }
            }
            $("#resultScreen").val(currentNumber);
        }
    });

    // Обработчик для операций
    function handleOperation(operation) {
        if (lastOperation) {
            switch (lastOperation) {
                case "+":
                    result += currentNumber;
                    break;
                case "-":
                    result -= currentNumber;
                    break;
                case "*":
                    result *= currentNumber;
                    break;
                case "/":
                    if (currentNumber != 0) {
                        result /= currentNumber;
                    } else {
                        $("#resultScreen").val("NaN");
                        return;
                    }
                    break;
                default:
                    break;
            }
        } else {
            result = currentNumber;
        }
        lastNumber = currentNumber;  // Запоминаем последнее число
        currentNumber = 0;
        lastOperation = operation;
        isNewNumber = true;

        // Проверка на длину результата
        if (result.toString().length > maxDigits + 1) {
            $("#resultScreen").val("Error");
        } else {
            $("#resultScreen").val(result);
        }
    }

    $("#buttonDivide").click(function(){
        handleOperation("/");
    });

    $("#buttonMultiply").click(function(){
        handleOperation("*");
    });

    $("#buttonSubstract").click(function(){
        handleOperation("-");
    });

    $("#buttonAdd").click(function(){
        handleOperation("+");
    });

    $("#buttonEquals").click(function(){
        if (lastOperation) {
            switch (lastOperation) {
                case "+":
                    result += lastNumber;
                    break;
                case "-":
                    result -= lastNumber;
                    break;
                case "*":
                    result *= lastNumber;
                    break;
                case "/":
                    if (lastNumber != 0) {
                        result /= lastNumber;
                    } else {
                        $("#resultScreen").val("NaN");
                        return;
                    }
                    break;
                default:
                    break;
            }

            // Проверка на длину результата
            if (result.toString().length > maxDigits + 1) {
                $("#resultScreen").val("Error");
            } else {
                $("#resultScreen").val(result);
            }
        }
    });

    $("#buttonClear").click(function(){
        result = 0;
        currentNumber = 0;
        lastNumber = 0;
        lastOperation = "";
        isNewNumber = false;
        $("#resultScreen").val(result);
    });
});
