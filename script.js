let numBtns = document.querySelectorAll("[data-num]")
let actBtns = document.querySelectorAll("[data-act]")
let ecualBtn = document.querySelector("[data-equal]")
let clearBtn = document.querySelector("[data-clear]")
let clearLastBtn = document.querySelector("[data-clearLast]");
let out = document.querySelector(".out")
let earlyOut = document.querySelector(".earlyOut")

let num1 = "";
let num2 = "";
let act = "";

// натискання клавіш
for(let i=0; i<numBtns.length;i++){
    numBtns[i].onclick = ()=>{ 
        pressNum(numBtns[i].dataset.num)
    } 
}
// натискання арифм дій
for(let i=0; i<actBtns.length;i++){
    actBtns[i].onclick = ()=>{
        pressAction(actBtns[i].dataset.act)
    } 
}
// натискання =
ecualBtn.onclick = ()=>{
    calculate()  
} 
// натискання clear
clearBtn.onclick = ()=>{
    clearAll()
}
clearLastBtn.onclick = ()=>{
    clearLast()
}

// ====== Функції ======
function pressNum(num){
    // console.log(num)
  if (act == "") {
    // вводимо перше число
    if (num === "," && !num1.includes(",")) {
      num1 += ",";
    } else if (num !== ",") {
      num1 += num;
    }
    out.innerHTML = num1;
  }else {
    // вводимо друге число
    if (num === "," && !num2.includes(",")) {
      num2 += ",";
    } else if (num !== ",") {
      num2 += num;
    }
    out.innerHTML = num1 + " " + act + " " + num2;
  }   
}
function pressAction(a){ 
    // якщо користувач натиснув "%", одразу обробляємо
    if (a === "%") {
        calculatePercent();
        return;
    } 
     act = a 
     out.innerHTML += act
}

function calculate(){  
  let result
  // замінюємо кому на крапку, бо JS розуміє лише крапку для десяткових чисел
  let n1 = parseFloat(num1.replace(",", "."));
  let n2 = parseFloat(num2.replace(",", "."));
       
    if(act === "+"){
       result = n1 + n2 
    }else if(act === "-"){
       result = n1 - n2 
    }else if(act === "*"){
       result = n1 * n2 
    }else if(act === "/"){
       result = n1 / n2 
    }

  //  Округлення до 4 знаків
  if (!Number.isInteger(result)) result = parseFloat(result.toFixed(4));

 //  замінюємо крапку на кому для виводу
  let formatted = String(result).replace(".", ",");
  out.innerHTML = formatted;
  earlyOut.innerHTML = formatted;

  // підготовка для наступного обчислення
  num1 = String(result).replace(".", ",");
  num2 = "";
  act = "";
}
function clearAll(){
    out.innerHTML = "0"
    earlyOut.innerHTML = ""
    num1 = ""
    num2 = ""
    act = ""
}

function clearLast(){
  if (act === "") {
    num1 = num1.slice(0, -1);
    out.innerHTML = num1 || "0";
  } else if (num2 !== "") {
    num2 = num2.slice(0, -1);
    out.innerHTML = num1 + " " + act + " " + num2;
  } else {
    act = "";
    out.innerHTML = num1;
  }
}
function calculatePercent() {
  if (num1 && act && num2) {
    let n1 = parseFloat(num1.replace(",", "."));
    let n2 = parseFloat(num2.replace(",", "."));

    // 🔹 Логіка як у калькуляторі iPhone:
    if (act === "+" || act === "-") {
      n2 = (n1 * n2) / 100;  // % від першого числа
    } else if (act === "*" || act === "/") {
      n2 = n2 / 100;         // просто частка
    }

    num2 = String(parseFloat(n2.toFixed(4))).replace(".", ",");
    out.innerHTML = num1 + " " + act + " " + num2;
  } else if (num1 && !num2 && !act) {
    // якщо просто натиснули % без дії
    let n1 = parseFloat(num1.replace(",", "."));
    num1 = String(parseFloat((n1 / 100).toFixed(4))).replace(".", ",");
    out.innerHTML = num1;
  }

}
