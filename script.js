// const form = document.querySelector("myform");
let text = document.getElementById("todo-input");
let todoCon = document.querySelector(".todo-items");
let todoItems = document.querySelectorAll(".todo-item");
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
    todoItems.classList.add("todocoll");
    let inputText = text.value;
    if(element) {
      inputText = element.text; 
    }
    if (inputText) {
    todoItems.innerHTML = `
    <div class="todo-item ${element && element.complete ? "checked":""}">
          <div class="check ${element && element.complete ? "checked":""}">
            <div class="check-mark ${element && element.complete ? "checked":""}">
              <img src="./images/icon-check.svg" alt="">
            </div>
          </div>
          <div class="todo-text ${element && element.complete ? "complete":""}">${inputText}</div>
        </div>
    `
    todoCon.appendChild(todoItems);
    updatels()}
    let check = todoItems.querySelector(".check-mark");
    let textcheck = todoItems.querySelector(".todo-text");
    check.addEventListener('click', () => {
      check.classList.add("checked");
      textcheck.classList.add("complete");
      updatels();
    })
    text.value = "";
    // window.location.reload();
}

let info = document.querySelectorAll(".items-statuses span");
let todolist = document.querySelectorAll(".todocoll");
info.forEach(element => {
  element.addEventListener("click", ()=>{
    if (element.innerText == "Active"){
      console.log(todolist)
      todolist.forEach(item => {
        if(item.children[0].classList.contains("checked")){
          // item.style.display = "flex";
          // item.classList.remove("checked")
          // updatels()
          console.log("yh");
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      })
    }else if (element.innerText == "Completed"){
      todolist.forEach(item => {
        if(!item.children[0].classList.contains("checked")){
          console.log("yh");
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      })
      console.log("hello")
    }else{
      console.log("max")
      todolist.forEach(item => {
        item.style.display = "block";
      })
    }
  })
})

let clear = document.querySelector(".clear");
clear.addEventListener("click", ()=>{
  // window.location.reload();
  todolist.forEach(item => {
    if(item.children[0].classList.contains("checked")){
      console.log("yh");
      item.remove();
      updatels();
    } 
  })
})

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

let remaining = document.querySelector(".items-left");
function itemNumber () {
  let activeTodo = document.querySelectorAll(".todo-item.checked");
  let num = todolist.length - activeTodo.length;
  remaining.innerText = `${num} items left`
  // console.log(activeTodo)
}
itemNumber()