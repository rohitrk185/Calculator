let exp = document.getElementById("exp");
let result = document.getElementById("result");
let buttons = document.getElementsByClassName("items");

let operand1 = 0, operand2, operator; 
let expression = "0";
let len = buttons.length;
let containsDecimal = false;
let lastOpIndex = -1;
let lastAns = 0;


function isOperator(value) {
    return (value=="+" || value=="-" || value=="*" || value=="/");
}

for(let i = 0; i < len; i++) {
    buttons[i].addEventListener("click", function () {
        document.getElementById("result").style.color = "#aaa";
        document.getElementById("result").style.fontSize = "1.2em";
        let value = this.getAttribute("data-value");
        let text = exp.textContent.trim().replace(/x/g, '*').replace(/÷/g, '/').replace(/--/g, "+");
        
        if(isOperator(value)) {
            lastOpIndex = text.length;
            let lastChar = text.charAt(text.length-1);
            if(isOperator(lastChar)) {
                if(value == '*') {
                    exp.textContent = text.replace(lastChar, 'x');    
                }else if(value == '/') {
                    exp.textContent = text.replace(lastChar, '÷');
                }else {
                    exp.textContent = text.replace(lastChar, value);
                }
            }else{
                if(value == '*') {
                    exp.textContent += 'x';    
                }else if(value == '/') {
                    exp.textContent += '÷';
                }else {
                    exp.textContent += value;
                }
                operand1 = parseFloat(text);
                operator = value;
            }
            containsDecimal = false;
        }else if(value == "ac") {
            exp.textContent = "0";
            operand1 = 0;
            result.textContent = "";
            containsDecimal = false;
            lastOpIndex = -1;
            return;
        }else if(value == "sign") {
            let temp = text.slice(lastOpIndex+1);
            operand1 = parseFloat(temp);
            operand1 *= -1;
            if(!operand1) {
                return;
            }
            exp.textContent = exp.textContent.slice(0, lastOpIndex+1) + operand1;
        }else if(value == ".") {
            if(!containsDecimal) {
                exp.textContent = text + value;
                containsDecimal = true;
            }
        } else if (value == "%") {
            operand1 = parseFloat(eval(text));
            operand1 = operand1 / 100;
            exp.textContent = operand1;
        }else if(value == "=") {
            let ans = eval(text);
            if(ans) {
                result.textContent = "=" + ans;
                exp.textContent = ans;
                operand1 = ans;
            }else {
                result.textContent = '=' + 0;
                exp.textContent = 0;
            }
            document.getElementById("result").style.color = "#eee";
            document.getElementById("result").style.fontSize = "1.5em";
            containsDecimal = false;
            lastOpIndex = -1;
            return;
        }else {
            if(exp.textContent === "0") {
                exp.textContent = value;
            }else {
                exp.textContent += value;
            }
        }
        let eqn = exp.textContent.trim().replace(/x/g, '*').replace(/÷/g, '/').replace(/--/g, '+');
        let ans = eval(eqn);
        if(ans) {
            result.textContent = '=' + ans;
            operand1 = ans;
        }else {
            result.textContent = '=' + 0;
        }
    });
}

function keyAppend(value) {
    if(exp.textContent === "0") {
        exp.textContent = value;
    }else {
        exp.textContent += value;
    }
}

document.onkeydown = function(event) {
    document.getElementById("result").style.color = "#aaa";
    document.getElementById("result").style.fontSize = "1.2em";
    let text = exp.textContent.trim().replace(/x/g, '*').replace(/÷/g, '/').replace(/"--"/g, "+");
    let key_char = event.key;
    let key_code = event.code;
    let lastChar = text.charAt(text.length-1);

    {if(key_char==1 && event.shiftKey == false) {
        keyAppend(key_char);
    }else if(key_char==2 && event.shiftKey == false) {
        keyAppend(2);
    }else if(key_char==3 && event.shiftKey == false) {
        keyAppend(3);
    }else if(key_char==4 && event.shiftKey == false) {
        keyAppend(4);
    }else if(key_char==5 && event.shiftKey == false) {
        keyAppend(5);
    }else if(key_char==6 && event.shiftKey == false) {
        keyAppend(6); 
    }else if(key_char==7 && event.shiftKey == false) {
        keyAppend(7);
    }else if(key_char==8 && event.shiftKey == false) {
        keyAppend(8); 
    }else if(key_char==9 && event.shiftKey == false) {
        keyAppend(9); 
    }else if(key_char == 0 && event.shiftKey == false && event.code != "Space") {
        keyAppend(0);
    }}

    if(isOperator(key_char)) {
        containsDecimal = false;
        lastOpIndex = text.length;
        if(isOperator(lastChar)) {
            if(key_char == '*') {
                exp.textContent = text.replace(lastChar, 'x');    
            }else if(key_char == '/') {
                exp.textContent = text.replace(lastChar, '÷');
            }else {
                exp.textContent = text.replace(lastChar, key_char);
            }
        }else{
            if(key_char == '*') {
                exp.textContent += 'x';    
            }else if(key_char == '/') {
                exp.textContent += '÷';
            }else {
                exp.textContent += key_char;
            }
            operand1 = parseFloat(text);
            operator = key_char;
        }
        operand1 = null;
    }else if(key_char == "." || key_code == "Period") {
        if(!containsDecimal) {
            exp.textContent = text + '.';
            containsDecimal = true;
        }
    }else if (key_char == "%") {
        operand1 = parseFloat(eval(text));
        operand1 /= 100;
        exp.textContent = operand1;
    }else if(key_char == "c" || key_char == "C" || key_char == "Escape") {
        exp.textContent = "0";
        operand1 = 0;
        result.textContent = "";
        containsDecimal = false;
        lastOpIndex = -1;
        return;
    }else if(key_char == "=" || key_char == "Enter") {
        let ans = eval(text);
        if(ans) {
            result.textContent = '=' + ans;
            operand1 = ans;
            exp.textContent = result.textContent.slice(1)
        }else {
            result.textContent = '=' + 0;
            exp.textContent = result.textContent.slice(1);
        }
        containsDecimal = false;
        lastOpIndex = -1;
        document.getElementById("result").style.color = "#eee";
        document.getElementById("result").style.fontSize = "1.5em";
        return;
    }else if(key_char == "Backspace" || key_code == "Backspace") {
        if(text != "0") {
            let newExp = exp.textContent.slice(0, exp.textContent.length-1);
            exp.textContent = newExp;
        }
        if(exp.textContent == "") {
            exp.textContent = "0";
            result.textContent = "";
        }
    }
    text = exp.textContent.trim().replace(/x/g, '*').replace(/÷/g, '/').replace(/'--'/g, '+');
    let ans = eval(text);
    if(ans) {
        result.textContent = ans;
        operand1 = ans;
    }else {
        result.textContent = 0;
    }
};



