
var getBarleyBreak = document.querySelector(".barleyBreak");
var stepsCount = document.querySelector(".stepsCount");
var countOfSteps = 0;
stepsCount.innerHTML = countOfSteps;


//проверка для формы ввода 
function formForChooseSize(){
	var rows = +document.querySelector("#rows").value;
	var columns = +document.querySelector("#columns").value;
	if(rows == "" || columns == ""){
		alert("Поля не могут быть пустыми");
		return;
	}

	if(isNaN(rows) || isNaN(columns)){
		alert("Поля не могут содержать строковые данные");
		return;
	}

	if((rows > 10 || rows < 3) || (columns > 10 || columns < 3)){
		alert("Введите числа от 3 до 10");
		return;
	}

	rows = Math.round(rows);
	columns = Math.round(columns);
	countOfSteps = 0;
	stepsCount.innerHTML = countOfSteps;
	addTable(rows,columns);
	clearTimer();
}

//формирование сетки для головоломки
function addTable(rows,columns){
	var countOfRow = rows;
	var countOfColumn = columns;
	var previousTable = document.querySelectorAll(".barleyBreak table");

	if(previousTable.length != 0){
		getBarleyBreak.removeChild(previousTable[0]);			
	}

	var arrOfRandomNumbers = _createArrayOfNumbers(countOfRow, countOfColumn);

	var newTable = document.createElement("table");				
	getBarleyBreak.appendChild(newTable);

	var countForArrNumbers = 0;
	for(var tr = 1; tr <= countOfRow; tr++){					
		var newTr = document.createElement("tr");
		newTable.appendChild(newTr);

		for(var td = 1; td <= countOfColumn; td++){			
			var newTd = document.createElement("td");
			newTd.innerHTML = arrOfRandomNumbers[countForArrNumbers];
			if(!newTd.innerHTML){
				newTd.setAttribute("id", "active");
			}
			newTd.setAttribute("data-col", td);
			newTd.setAttribute("data-row", tr);
			newTr.appendChild(newTd);
			countForArrNumbers++;
		}

	}
}


function _messageOnSuccess(){
	alert("Ура! Вы решили головоломку за " + countOfSteps + " ходов");
	countOfSteps = 0;
	stepsCount.innerHTML = countOfSteps;
	clearTimer();
}

//двигаем ячейки
function moveCells(event){
	var target = event.target;
	console.log(event);
	var targetCol = +target.getAttribute("data-col");
	var targetRow = +target.getAttribute("data-row");
	var activeAttr = document.querySelector("#active");
	var activeCol = +activeAttr.getAttribute("data-col");
	var activeRow = +activeAttr.getAttribute("data-row");

	if(target.tagName == "TD"){
		var indexCell = target.cellIndex;
		var resultOfCheck;
		startTimer();

		if(	((targetRow + 1 == activeRow) && (targetCol == activeCol)) ||	
			((targetRow - 1 == activeRow) && (targetCol == activeCol)) ||	
			((targetRow == activeRow) && (targetCol + 1 == activeCol)) ||	
			((targetRow == activeRow) && (targetCol - 1 == activeCol))){
				var inner = target.innerHTML;
				console.log(inner);
				target.innerHTML = '';
				activeAttr.removeAttribute("id");
				target.setAttribute("id", "active");
				activeAttr.innerHTML = inner;
				countOfSteps++;
				stepsCount.innerHTML = countOfSteps;
				resultOfCheck = _checkSuccess();
				if(resultOfCheck){
					_messageOnSuccess();
				}
		}
		return;
	}
	target = target.parentNode;
}

//проверка правильно ли собрана головоломка
function _checkSuccess(){
	var arrTd = document.querySelectorAll(".barleyBreak table td");
	var lenArrForCHeck = arrTd.length-1;
	var arrOfInner = [];
	var arrStart;

	if(arrTd[lenArrForCHeck].getAttribute("id") == "active"){
		for(var i = 0; i < lenArrForCHeck; i++){
			arrOfInner.push(arrTd[i].innerHTML);
		}
		var arrStart = arrOfInner.slice().join("");
		var arrFinish = arrOfInner.sort(_sortForCheckSuccsess).join("");
		return arrStart == arrFinish;
	}
}

function _sortForCheckSuccsess(a,b){
	return a - b;
}


//формируем массив чисел
function _createArrayOfNumbers(countOfRow, countOfColumn){
	var rows = countOfRow;
	var columns = countOfColumn;
	var amountOfNumbers = rows * columns;
	var arrNum = [];
	var range = 0;
	for(var i = 0; i < amountOfNumbers; i++){					
		arrNum.push(range);
		range++;
	}

	arrNum[0] = "";

	arrNum = _shuffleArrayOfNumbers(arrNum);

	return arrNum;
}

//перемешиваем массив чисел
function _shuffleArrayOfNumbers(array){				//got it from https://bost.ocks.org/mike/shuffle/
	var m = array.length, t, i;

  	while (m) {
    	i = Math.floor(Math.random() * m--);
   		t = array[m];
    	array[m] = array[i];
    	array[i] = t;
  	}

  return array;
}

addTable(4,4);
getBarleyBreak.addEventListener("click", moveCells);