const pwLength = document.getElementById('pwlength');
const showPw = document.getElementById('showPw');
const isUpperCase = document.getElementById('uppercase');
const isLowerCase = document.getElementById('lowercase');
const isNumber = document.getElementById('number');
const isSymbol = document.getElementById('symbol');
const generateUser = document.getElementById('generate-user');
const generateDev = document.getElementById('generate-dev');
const paste = document.getElementById('paste');
const lowerAlpha = 'abcdefghijklmnopqrstuvwxyz';
const upperAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '`~!@#$%^&*()_+-=[]{}|;",./<>?';

generateDev.addEventListener('click', getPasswordByDev);
generateUser.addEventListener('click', getPasswordByUser);
paste.addEventListener('click', ()=>{
    const textarea = document.createElement('textarea');
    const password = showPw.value;
    if(!password){return;}

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    alert('Password copied to clipboard');
});

function openAs(evt, choice) {

    //tab are closed after its switch another tab
    let tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    //select tab
    let tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(choice).style.display = "block";
    evt.currentTarget.className += " active";
}

function getPasswordByDev(){
    const radio = document.getElementsByName('complexity');
    const vokalLower = 'aiueo';
    let ans = '';
    for(let i = 0; i<radio.length; i++){
        if(radio[i].checked){
            if(radio[i].value === 'veryLow'){
                for(let i = 0; i<7; i++){
                    let vokal = Math.floor(Math.random()*vokalLower.length);
                    if(i<5){
                        ans+=((i===1||i===3)?vokalLower[vokal]:getLower());
                    }
                    else{
                        ans+=getNumber();
                    }
                }
            }
            else if(radio[i].value === 'low'){
                for(let i = 0; i<10; i++){
                    if(i<7){
                        ans+=getLower();
                    }
                    else{
                        ans+=getNumber();
                    }
                }
            }
            else if(radio[i].value === 'medium'){
                for(let i = 0; i<12; i++){
                    if(i<9){
                        let random = Math.floor(Math.random()*2);
                        if(random === 0){
                            ans+=getLower();
                        }
                        else if(random === 1){
                            ans+=getUpper();
                        }
                    }
                    else{
                        ans+=getNumber();
                    }
                }
            }
            else if(radio[i].value === 'high'){
                for(let i = 0; i<12; i++) {
                    let random = Math.floor(Math.random()*3);
                    if(random===0) {
                        ans += getLower();
                    }
                    else if(random===1) {
                        ans += getUpper();
                    }
                    else {
                        ans += getNumber();
                    }
                }
            }
            else if(radio[i].value === 'veryHigh'){
                for(let i = 0; i<15; i++) {
                    if(i<12){
                        let random = Math.floor(Math.random()*3);
                        if(random===0) {
                            ans += getLower();
                        }
                        else if(random===1) {
                            ans += getUpper();
                        }
                        else {
                            ans += getNumber();
                        }
                    }
                    else {
                        ans+= getSymbol();
                    }
                }
            }
            else if(radio[i].value === 'unhackable'){
                for(let i = 0; i<20; i++) {
                    let random = Math.floor(Math.random()*4);
                    if(random===0) {
                        ans += getLower();
                    }
                    else if(random ===1) {
                        ans += getUpper();
                    }
                    else if(random === 2) {
                        ans += getNumber();
                    }
                    else {
                        ans+= getSymbol();
                    }
                }
            }
            showPw.value = ans;
        }
    }
}

function getPasswordByUser(){

    //get random character
    let temp = '';
    for(let i = 0; i<pwLength.value; i++) {
        temp+=getCharacterByUser();
    }

    //this will syncing length of password that created with length of password that user want to
    let ans = '';
    for(let i = 0; i<pwLength.value; i++){
        ans+=temp[i];
    }
    showPw.value = ans;
}

function getCharacterByUser(){
    let ans = '';
    let random = Math.floor(Math.random()*4)

    //this will random all of every single character
    if(random === 0){
        if(isLowerCase.checked) {
            ans += getLower();
        }
        if(isUpperCase.checked) {
            ans += getUpper();
        }
        if(isNumber.checked) {
            ans += getNumber();
        }
        if(isSymbol.checked) {
            ans += getSymbol();
        }
    }
    else if(random === 1){
        if(isNumber.checked) {
            ans += getNumber();
        }
        if(isLowerCase.checked) {
            ans += getLower();
        }
        if(isSymbol.checked) {
            ans += getSymbol();
        }
        if(isUpperCase.checked) {
            ans += getUpper();
        }
    }
    else if(random === 2){
        if(isUpperCase.checked) {
            ans += getUpper();
        }
        if(isSymbol.checked) {
            ans += getSymbol();
        }
        if(isNumber.checked) {
            ans += getNumber();
        }
        if(isLowerCase.checked) {
            ans += getLower();
        }
    }
    else{
        if(isSymbol.checked) {
            ans += getSymbol();
        }
        if(isLowerCase.checked) {
            ans += getLower();
        }
        if(isUpperCase.checked) {
            ans += getUpper();
        }
        if(isNumber.checked) {
            ans += getNumber();
        }
    }
    if(!isLowerCase.checked && !isUpperCase.checked && !isNumber.checked && !isSymbol.checked){
        alert('set your password pattern');
        document.reset();
    }
    if(pwLength.value<Number(pwLength.min) || pwLength.value>Number(pwLength.max)){
        alert(`insert length between ${pwLength.min} and ${pwLength.max}`);
        document.reset();
    }
    return ans;
}

function getSymbol(){
    return symbols[Math.floor(Math.random()*symbols.length)];
}
function getUpper(){
    return upperAlpha[Math.floor(Math.random()*upperAlpha.length)];
}
function getLower(){
    return lowerAlpha[Math.floor(Math.random()*lowerAlpha.length)];
}
function getNumber(){
    return numbers[Math.floor(Math.random()*numbers.length)];
}

