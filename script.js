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
    out.innerHTML = num1 + "" + act + "" + num2;
  }   
}
function pressAction(a){ 
  // якщо ще не введено перше число — ігноруємо дію
  if (num1 === "") return;

  // якщо дія вже є, просто замінимо її на нову
  if (act !== "" && num2 === "") {
    act = a;
    out.innerHTML = num1 + "" + act; // оновлюємо відображення
    return;
  }

  // стандартна поведінка — додаємо дію вперше
  act = a;
  out.innerHTML = num1 + "" + act;
}

function calculate(){  
  let result
  // замінюємо кому на крапку, бо JS розуміє лише крапку для десяткових чисел
  let n1 = parseFloat(num1.replace(",", "."));
  let n2 = parseFloat(num2.replace(",", "."));

  if (act === "%") {
    if (n2 === 0 || num2 === "") {
      // якщо немає другого числа, просто обчислюємо відсоток від 1
      result = n1 / 100;
    } else {
      // якщо є друге число — рахуємо n1% від n2
      result = (n1 * n2) / 100;
    }
  }
     if(act === "+"){
       result = n1 + n2 
    }else if(act === "-"){
       result = n1 - n2 
    }else if(act === "*"){
       result = n1 * n2 
    }else if(act === "/"){
       result = n1 / n2 
    }

  // округлення результату
    result = parseFloat(result.toFixed(4));
  

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
    out.innerHTML = num1 + "" + act + "" + num2;
  } else {
    act = "";
    out.innerHTML = num1;
  }
}
