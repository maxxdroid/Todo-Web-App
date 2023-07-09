// const form = document.querySelector("myform");
let text = document.getElementById("todo-input");
let todoCon = document.querySelector(".todo-items");
let todoItems = document.querySelectorAll(".todo-item");
let todos = JSON.parse(localStorage.getItem("todos"));

let form = document.querySelector("form");

form.addEventListener("submit", (e)=>{
  // e.preventDefault();
  addItem();
})

if (todos) {
  todos.forEach(element => {
    addItem(element);
  })
}

//Create and Add todos to arrays and then stored in local storage
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
    updatels()
    // $("todo-items-wrapper").load(location.href+"todo-items-wrapper>*",""); 
    // $('todo-items-wrapper').load('todo-items-wrapper');
  }
    let check = todoItems.querySelector(".check-mark");
    let textcheck = todoItems.querySelector(".todo-text");
    check.addEventListener('click', () => {
      if(!check.classList.contains("checked")) {
        check.classList.add("checked");
        textcheck.classList.add("complete");
        updatels();
      } else {
        check.classList.remove("checked");
        textcheck.classList.remove("complete");
        updatels();
      }
    })
    text.value = "";
    // window.location.reload();
}

//Show completed, active and all Todos
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
    }else{
      todolist.forEach(item => {
        item.style.display = "block";
      })
    }
  })
})

//Clear completed todos
let clear = document.querySelector(".clear");
clear.addEventListener("click", ()=>{
  todolist.forEach(item => {
    if(item.children[0].classList.contains("checked")){
      item.remove();
      updatels();
    } 
  })
})

//Update array stored in local Storage
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

//Function to calculate remaining item Number
let remaining = document.querySelector(".items-left");
function itemNumber () {
  let activeTodo = document.querySelectorAll(".todo-item.checked");
  let num = todolist.length - activeTodo.length;
  remaining.innerText = `${num} items left`
}
itemNumber()

//Function to change theme
let theme = document.querySelector(".theme");
const img = document.getElementById('img');
const bg_img = document.getElementById('bgimg');
const change_theme = function() {
  if (img.dataset.image == "dark") {
  	img.src = "./images/icon-moon.svg";
    img.dataset.image = "light";
    bg_img.src = "./images/bg-desktop-light.jpg";
    document.documentElement.style.setProperty('--todo-item-bg', 'white');
    document.documentElement.style.setProperty('--todo-item-wrapper-bg', 'white');
    document.documentElement.style.setProperty('--bg-color', 'white');
    document.documentElement.style.setProperty('--todo-input-bg', 'white');
  } else if (img.dataset.image == "light") {
  	img.src = "./images/icon-sun.svg";
    img.dataset.image = "dark";
    window.location.reload();
  };
};