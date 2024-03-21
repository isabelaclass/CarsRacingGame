let car;
let selectedCarColor;
var winner = false;
var betValue = 0;
var balance = 100;

function init() {
    car = document.getElementsByClassName("car");
    betValue = parseFloat(document.getElementById("bet").value);
}

document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("balance").innerText = balance;
});


function selectedCar(color) {
    selectedCarColor = color;
}

function validateBet() {

    var input = document.getElementById('bet').value;
    betValue = parseFloat(document.getElementById("bet").value);

    if (input === '') {
        alert('Please type your bet');
        return false;
    } 

    if (betValue < 5) {
        alert("Please enter a number greater than or equal to 5");
        return false;
    }

    if (balance < betValue) {
        alert("Insufficient balance");
        return false;
    }

    if(selectedCarColor == null){
        alert("Please choose a car");
        return false;
    }
    else 
    {
        return true;
    }
}

function moveCar(){

    let carWinner;

    if(validateBet()) {

        var cars = document.getElementsByClassName("car");
        let leadingCarIndex = null;

        let posX = 0; 

        const myInterval = setInterval(() => {

           Array.from(cars).forEach((car, index) => {
                posX += Math.ceil(Math.random() * 5);
                car.style.transform = "translateX(" + posX + "px)";

                if (posX > (leadingCarIndex !== null ? cars[leadingCarIndex].style.transform.slice(11, -2) : 0)) {
                    leadingCarIndex = index;
                    carWinner = rgbToHex(cars[leadingCarIndex].style.backgroundColor);
                }
            });

                            
            if (posX >= 970) {
                if (carWinner === selectedCarColor) 
                {
                    alert("You win!");
                    balance = parseFloat(document.getElementById("balance").innerText);
                    balance = balance + (betValue*2);
                    document.getElementById("balance").innerText = balance.toFixed(2);
                    clearInterval(myInterval);
                    selectedCarColor = null; 
                } 
                else
                {
                    alert("You lost!");
                    balance = parseFloat(document.getElementById("balance").innerText);
                    balance -= betValue;
                    document.getElementById("balance").innerText = balance.toFixed(2);
                    clearInterval(myInterval);
                    selectedCarColor = null; 
                }
            }
            
        }, 50);
    }
}

function rgbToHex(rgb) {
     
    var r = parseInt(rgb.substring(4, rgb.indexOf(",")));
    var g = parseInt(rgb.substring(rgb.indexOf(",") + 2, rgb.lastIndexOf(",")));
    var b = parseInt(rgb.substring(rgb.lastIndexOf(",") + 2, rgb.length - 1));

    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}

