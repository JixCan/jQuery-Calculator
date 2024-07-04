let result = 0;
let currentNumber = 0;
let lastOperation = "";
let lastNumber = 0;
let isNewNumber = false;
const maxDigits = 10;

//TODO: "9999999999" + "+-" + "-" -> "Error"

$(document).ready(function(){
    $(".symbolButton").on({
        mouseenter: function(){
            $(this).fadeTo(200, 0.7);
        },
        mouseleave: function(){
            $(this).fadeTo(200, 1);
        },
        click: function(){
            let buttonValue = $(this).text();
            if (!isNaN(buttonValue)) {
                if (isNewNumber) {
                    // Сначала проверяем, была ли уже введена точка
                    if ($("#resultScreen").val().includes(".")) {
                        currentNumber = parseInt(buttonValue);
                        // Если точка была введена, просто добавляем цифру к текущему числу
                        //currentNumber = parseFloat(currentNumber);
                    } else {
                        // Иначе, просто парсим число
                        currentNumber = parseFloat(buttonValue);
                    }
                    isNewNumber = false;
                } else {
                    // Проверка на количество цифр
                    if ($("#resultScreen").val().includes(".") || currentNumber.toString().length < maxDigits) {
                        currentNumber = parseFloat($("#resultScreen").val() + buttonValue.toString());
                    }
                }
                $("#resultScreen").val(currentNumber);
                lastNumber = currentNumber;
            }
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
                        $("#resultScreen").val("Error");
                        disableButtons();
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
        if (result.toString().length > maxDigits) {
            $("#resultScreen").val("Error");
            disableButtons();
        } else {
            $("#resultScreen").val(result);
        }
    }

    function disableButtons() {
        $(".symbolButton").prop("disabled", true);
        $("#buttonClear").prop("disabled", false);  // Разрешаем только кнопку сброса
    }

    function enableButtons() {
        $(".symbolButton").prop("disabled", false);
    }

    function formatResult(result) {
        let resultStr = result.toFixed(maxDigits).toString();
        if (resultStr.includes(".")) {
            let [integerPart, fractionalPart] = resultStr.split(".");
            let maxFractionalLength = maxDigits - integerPart.length - 1; // -1 for the decimal point

            if (result < 0) {
                maxFractionalLength--; // Additional -1 for the negative sign
            }

            if (maxFractionalLength < 0) {
                return "Error"; // Too many digits in the integer part
            }

            fractionalPart = fractionalPart.substring(0, maxFractionalLength);
            resultStr = integerPart + "." + fractionalPart;
        }


        if (resultStr.length > maxDigits) {
            return "Error";
        }

        return resultStr;
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

    $("#buttonDot").click(function(){
        let currentInput = $("#resultScreen").val();
        // Проверка на наличие уже введенной точки
        if (!currentInput.includes(".")) {
            // Добавляем точку к текущему числу
            $("#resultScreen").val(currentInput + ".");
            // Обновляем текущее число
            currentNumber = parseFloat($("#resultScreen").val());
        }
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
                        $("#resultScreen").val("Error");
                        disableButtons();
                        return;
                    }
                    break;
                default:
                    break;
            }

            result = formatResult(result);
            result = parseFloat(result); // Ensure it's a float for formatting

            // Проверка на длину результата
            if (result.toString().length > maxDigits) {
                $("#resultScreen").val("Error");
                disableButtons();
            } else {
                $("#resultScreen").val(result);
            }

            isNewNumber = true;      // Устанавливаем флаг для ввода нового числа
        }
    });

    $("#buttonClear").click(function(){
        result = 0;
        currentNumber = 0;
        lastNumber = 0;
        lastOperation = "";
        isNewNumber = false;
        $("#resultScreen").val(result);
        enableButtons();  // Включаем все кнопки обратно
    });

    $("#buttonSign").click(function() {
        currentNumber = -currentNumber;
        lastNumber = -lastNumber;
        $("#resultScreen").val(currentNumber);
    });
});
