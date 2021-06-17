let nbrButton = document.querySelectorAll('button')
let resultArea = document.querySelector('#valeur')
let calcHistory = [];
let History = [];
let signArray = ["+","-","x","=","/"]
let calcDone = false;

for (let i = 0;i < nbrButton.length;i++){
    nbrButton[i].onclick = function (){
        if (signArray.find(e => e === this.innerText) === undefined){
            if (resultArea.value === "0" && this.innerText !== "+/-" && this.innerText !== "C"){
                if (this.innerText === "."){
                    resultArea.value = "0"+this.innerText;
                } else {
                    resultArea.value = this.innerText;
                }

            } else if (calcDone) {
                if (this.innerText !== "."){
                    resultArea.value = this.innerText
                } else {
                    resultArea.value = "0"+this.innerText
                }
                calcDone = false;
            }
            else if (this.innerText === "C"){
                resultArea.value = "0";
                calcHistory = [];
            } else if (this.innerText === "+/-"){
                console.log(resultArea.value.search("="))
                if (resultArea.value.search('-') === -1 && resultArea.value !== "0"){
                    resultArea.value = "-"+resultArea.value;
                }

            } else if (this.innerText === ".") {
                if (resultArea.value.search(/[.]/g) === -1){
                    resultArea.value = resultArea.value+this.innerText;
                }
            }  else {
                resultArea.value = resultArea.value+this.innerText;
            }
        } else {
            calcHistory.push(parseFloat(resultArea.value));
            if (this.innerText !== "=" && this.innerText !== "C" && this.innerText !== "+/-"){
                calcHistory.push(this.innerText);
            }
            resultArea.value = "";

            if (this.innerText === "="){
                calcDone = true;
                resultArea.value = calcul(calcHistory).result;
                History.push(calcul(calcHistory).history);
                writeHistory(History);
                calcHistory = [];
            }
        }
    }
}



/*
 * Créez la fonction calcul()
 */
function calcul(calcType){
    let result;
    let array = {result:null,history:null};
    let history = null;
    console.log(calcType)
    for (let i = 0;i<calcType.length;i++){
        history = history + calcType[i];
        if (!isNaN(calcType[i])){
            if (result === undefined){
                result = calcType[i];
            }
            if (calcType[i+1] !== undefined){
                switch (calcType[i+1]){
                    case "+":
                        result = result + calcType[i+2]
                        break
                    case "x":
                        result = result * calcType[i+2]
                        break
                    case "-":
                        result = result - calcType[i+2]
                        break
                    case "/":
                        result = result / calcType[i+2]
                        break
                }
            } function verifFormulaire() {
        }
    }
    array.result = result;      
    array.history = history+"="+result;
    return array;
}

/*
 * Créez ici la fonction writeHistory()
 */
function writeHistory(array){
    let historyContainer = document.querySelector('#historique')
    let noHistory = document.querySelector('#noHistory')
    if (noHistory !== null){
        noHistory.remove();
    }

    let li = document.createElement("li");
    li.append(array[array.length-1])
    historyContainer.prepend(li)
}