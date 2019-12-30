
/* (function (){
    'use strict';
    var result;
    var currentNum;
    var prevResult;
    var history;
    var prevButton;
    var mathOp;
    var prevMathOp;
    var mathOPCount;
    var mathOpPress;
    var isInit;
    var mainDisplay=document.getElementById("mainDisplay");
    var historyDisplay=document.getElementById("historyDisplay");

    Array.prototype.forEach.call(document.querySelectorAll('button'), function(btn) {
        btn.addEventListener('click', function(e) {
            // `e.currentTarget` or `this`
            var btnClicked = e.currentTarget.getAttribute('data-value');
            input(btnClicked);
        });
    });

    function init(){
        result=null;
        currentNum=0;
        prevButton=null;
        mathOp=null;
        prevMathOp=null;
        mathOPCount=0;
        history='';
        isInit=true;
        mathOpPress=false;
        updateMainDisplay(0);
        updateHistoryDisplay(history);
    }

    function input(btn){
        if (!isNaN(prevButton)&& btn !=="=" && btn !=="C" && btn !=="CE" && btn !=="CS" && btn !=="."){
            prevMathOp=mathOp;
        }
    }

    switch(btn) {
        case "+": 
            mathOpPress=true; 
            mathOp=addition; 
            break;
        case "-": 
            mathOpPress=true; 
            mathOp=subtraction; 
            break;
        case "*": 
            mathOpPress=true; 
            mathOp=multiplication; 
            break;
        case "/": 
            mathOpPress=true; 
            mathOp=division; 
            break;
        case "C": 
            init(); 
            break;
    }
    handler(btn);

    function handler(btn){
        // return if C wasn't pressed when divide by zero was done
        if(btn!=="C" && result==="Result is undefined" || result ==="Cannot divide by zero"){
            return;
        }
        
        if(btn!=="=" && btn !=="C" && btn !=="CE" && btn !=="CS"){
            history = (isNaN(prevButton) && isNaN(btn)) ? history.slice(0,-1)+btn: history+btn;
        }
    }



    function updateMainDisplay(val) {

        val = String(val);

        if (val.length > 20) {
            val = Math.round(val * 10000000000000000) / 10000000000000000;
        }

        mainDisplay.value = val;
    }

    function updateHistoryDisplay(history) {
        historyDisplay.value = history;
    }

    function addition(val) {
        result += val;
    }

    function subtraction(val) {
        result -= val;
    }

    function division(val) {
        result /= val;
    }

    function multiplication(val) {
        result *= val;
})(); */

function getHistory(){
    return document.getElementById("historyDisplay").value;
}

function printHistory(num){
    document.getElementById("historyDisplay").value=num;
}

function getResult(){
    return document.getElementById("mainDisplay").value;
}

function printResult(num){
    if (num==""){
        document.getElementById("mainDisplay").value=num;
    }else{
        document.getElementById("mainDisplay").value=formattedNumber(num);
    }
}
function formattedNumber(num){
    if(num=="-"){
        return "";
    }
    var n=Number(num);
    var value=n.toLocaleString("en");
    console.log(value);
    return value;
}

function reversedNumber(num){
    return Number(num.replace(/,/g,""));
}

var operator = document.getElementsByClassName("operator");
for(i=0; i<operator.length;i++){
    operator[i].addEventListener('click',function(){
        if(this.id=="cScreen"){
            printHistory("");
            printResult("");
        }else if(this.id=="clearLast"){
            printResult("");
        }else if(this.id=="backSpace"){
            var result=reversedNumber(getResult()).toString();
            if (result){
                result=result.substr(0,result.length-1);
                printResult(result);
            }
        }else{
            var result=getResult();
            var history=getHistory();
            if (result!=""){
                result=reversedNumber(result);
                history+=result;
                if (this.id=="equals"){
                    var finalResult=eval(history);
                    printResult(finalResult);
                    printHistory("");
                }else{
                    history+=this.value;
                    printHistory(history);
                    printResult("");
                }
            }
        }
    })
}
var number = document.getElementsByClassName("number");
for(i=0; i<number.length;i++){
    number[i].addEventListener('click',function(){
        var result=reversedNumber(getResult());
        if (result!==NaN){
            result+=this.value;
            printResult(result);
        }
    })
}