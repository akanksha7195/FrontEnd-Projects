// JavaScript source code

let counter = 0;

//Function increment a number
/*function counterIncrement() {
    //Every click increment a number
    counter += 1;
    console.log(counter);
}
*/


//get heading element
const headingEl = document.querySelector('#headingTotal');

//get the reference of desc element
const inputDescEl = document.querySelector('#inputDesc');

//read value from input
const inputElement = document.querySelector('#inputAmount');


const expenseTableEl = document.querySelector('#expenseTable');
//init value of expense at 0
let totalExpense = 0;

//set the heading element to totalExpense
headingEl.textContent = totalExpense;
let allExpenses = [];

//onButtonClick add inputAmount to totalExpense
function addExpenseToTotal() {

    const expenseItem = {};

    const textAmount = inputElement.value;
    
    //read desc from input
    const textDesc = inputDescEl.value;
    
    //convert it to number
    const expense = parseInt(textAmount, 10);

    //putting it in object
    if (textDesc !== "" && !isNaN(expense) && expense > 0) {
        expenseItem.desc = textDesc;
        expenseItem.amount = expense;
        expenseItem.moment = new Date();


        totalExpense += expense;
        updateTotal();
        allExpenses.push(expenseItem);

        //show table
        /*  const data1 = allExpenses[0];
          const data2 = allExpenses[1];
      
          const data1Text = `${data1.amount} ::${data1.desc}`;
          const data2Text = `${data2.amount} ::${data2.desc}`;
      
          const tableText = `
              <div>${data1Text}</div>
              <div>${data2Text}</div>
          `;
          */
        /*
           const allExpenseHTML = allExpenses.map(expense => createListItem(expense));
       
           const joinedAllExpenseHTML = allExpenseHTML.join("");
       
           console.log(joinedAllExpenseHTML);
       
           expenseTableEl.innerHTML = joinedAllExpenseHTML;
           */
        renderList(allExpenses);
        inputElement.value = "";
        inputDescEl.value = "";
    }
}
//Get the btn element
const element = document.querySelector("#btnAddExpense");

//Listen to click event
element.addEventListener("click", addExpenseToTotal, false);
document.addEventListener("Keypress", function (event) {
    if (event.keycode === 13 || event.which === 13) {
        addExpenseToTotal();
    }
});
//Controller function
function getDateString(momento) {
     return momento.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

function updateTotal() {
    let someText = `Total: ${totalExpense}`;
    headingEl.textContent = someText;
}

//Delete items
function deleteItem(dateValue, amount) {
   // console.log("Delete called", dateValue);
    /*const newArr = [];

    for (let i = 0; i < allExpenses.length; i++) {
        if (allExpenses[i].moment.valueOf() !== dateValue) {
            newArr.push(allExpenses[i]);
           // console.log(allExpenses[i].moment.valueOf());
        }
    }
    
    const newArr = allExpenses.filter((expense) => {
        if (expense.moment.valueOf() !== dateValue) {
            return expense;
        }
    });

*/
    const newArr = allExpenses.filter(expense => expense.moment.valueOf() !== dateValue);
    renderList(newArr);
    totalExpense -= amount;
    updateTotal();
}

//View Layer
function renderList(arrOfList) {
    const allExpenseHTML = arrOfList.map(expense => createListItem(expense));
    const joinedAllExpenseHTML = allExpenseHTML.join("");
    expenseTableEl.innerHTML = joinedAllExpenseHTML;
    allExpenses = arrOfList;
}

function createListItem({ desc, amount, moment }) {
    return `
             <li class="list-group-item d-flex justify-content-between">
							<div class="d-flex flex-column">
								${desc}
								<small class="text-muted">${getDateString(moment)}</small>
							</div>
							<div>
								<span class="px-5">
								${amount}
								</span>
								<button type="button" class="btn btn-outline-danger btn-sm" onClick="deleteItem(${moment.valueOf()}, ${amount})">
									<i class="fas fa-trash-alt"></i>
								</button>
							</div>
        </li>
        `;
}