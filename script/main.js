let screenText = '0';
let elemScreen = document.querySelector('.screen');
var buffer = [];
var id = null;

let calculator = {
    '+' : function(a,b) {
        return a+b;
    },
    '-' : function(a,b) {
        return a-b;
    },
    '*' : function(a,b) {
        return a*b;
    },
    '/' : function(a,b) {
        if ( b != 0 ) {return a/b;}
        else {return ''}
        
    },
}

function takeSign(target) {
    let sign = target.textContent.replace(/\s/g,'');
    if ( sign == '×' ) sign = '*';
    if ( sign == '÷' ) sign = '/';
    if ( sign == '−' ) sign = '-';
    if ( sign == '+' ) sign = '+';
    return sign
}
function additionButtons(sign) {
    if ( sign == '=' ) {buffer.push(+elemScreen.textContent); doCalc()
    }else if ( sign == 'C' ) { buffer = []; elemScreen.textContent = '0'
    }else if ( sign == '←' ) {  elemScreen.textContent = '0' 
    }
};
function doCalc() {
    console.log(buffer)
    outer:
    while (buffer.length > 1) {
        for (let i = 0; i < buffer.length; i++){
            let elem = buffer[i]
            if ( elem == '*' || elem == '/' ) {
                let num1 = buffer[i-1];
                let num2 = buffer[i+1];
                let result = calculator[elem](num1, num2);
                buffer.splice(i - 1, 3, result);
                if ( typeof result == 'string' || isNaN(result) ) break outer;
                i = 0;
            }
        }
        for (let i = 0; i < buffer.length; i++){
            let elem = buffer[i]
            if ( elem == '+' || elem == '-' ){
                let num1 = buffer[i-1];
                let num2 = buffer[i+1];
                let result = calculator[elem](num1, num2);
                buffer.splice(i-1, 3, result);
                if ( typeof result == 'string' || isNaN(result) ) break outer;

                i = 0;
            }

        }
        elemScreen.textContent = +buffer[0].toFixed(3);
        buffer = [];
        return;
    };
    id = setTimeout( () => elemScreen.textContent = 'Error!' );
    setTimeout( () => { clearTimeout(id); elemScreen.textContent = '0'; id=null; },1000 );
    buffer = [];

}
function clickButton(event) {
    const target = event.target;
    let sign;
    if ( target.tagName != 'BUTTON' ) return;
    if ( !isNaN(+target.textContent)) {
        if ( +elemScreen.textContent === 0 ) {
            elemScreen.textContent = +target.textContent
        }else{
            elemScreen.textContent += +target.textContent;
        }
    }else {
        sign = takeSign(target);
        let number =  +elemScreen.textContent;
        if ( sign == 'C' || sign == '←' || sign == '=') {
            additionButtons(sign); 
        }else {
            if ( typeof buffer.slice(-1)[0] == 'string' && sign == '-'  ) {
                buffer.push( -number );
                elemScreen.textContent = '-';
                buffer.splice(buffer.indexOf(-number - 1,1));
            }else {
                buffer.push(number);
                buffer.push(sign);
                elemScreen.textContent = '0';
            }
            
        }
       
    }
}

document.querySelector('.calc-buttons').addEventListener('click',clickButton)