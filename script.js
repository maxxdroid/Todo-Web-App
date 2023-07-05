// const form = document.querySelector("myform");
let text = document.getElementById("todo-input");
let todoCon = document.querySelector(".todo-items");

let todos = JSON.parse(localStorage.getItem("todos"));

let form = document.querySelector("form");

form.addEventListener("submit", (e)=>{
  e.preventDefault();
  addItem();
})

if (todos) {
  todos.forEach(element => {
    addItem(element);
  })
}

function addItem(element) {
    // event.preventDefault();
    let todoItems = document.createElement("div");
    let inputText = text.value;
    if(element) {
      inputText = element.text; 
    }
    if (inputText) {
    todoItems.innerHTML = `
    <div class="todo-item">
          <div class="check">
            <div class="check-mark ${element && element.complete ? "checked":""}">
              <img src="./images/icon-check.svg" alt="">
            </div>
          </div>
          <div class="todo-text ${element && element.complete ? "complete":""}">${inputText}</div>
        </div>
    `
    todoCon.appendChild(todoItems);
    updatels();}
    let check = todoItems.querySelector(".check-mark");
    let textcheck = todoItems.querySelector(".todo-text");
    check.addEventListener('click', () => {
      check.classList.add("checked");
      textcheck.classList.add("complete");
      updatels()
    })
}

function updatels() {
  let textTag = document.querySelectorAll(".todo-text")
  let arr=[];
  textTag.forEach(element => {
    arr.push({
      text: element.innerText,
      complete: element.classList.contains("complete")
    })
  })
  localStorage.setItem("todos", JSON.stringify(arr));
}

function createEventListeners() {
  let todoCheckMarkers = document.querySelectorAll(".todo-item .check-mark");
  todoCheckMarkers.forEach((checkMark) => {
    checkMark.addEventListener("click", ()=>{ markCompleted();})
  })
}

function markCompleted() {
  console.log("mark completed");
}