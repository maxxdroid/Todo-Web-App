// const form = document.querySelector("myform");
let text = document.getElementById("todo-input");
let todoCon = document.querySelector(".todo-items");
let todoItems = document.querySelectorAll(".todo-item");
let todos = JSON.parse(localStorage.getItem("todos"));
let darktheme = true;

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
          <div class="remove"> <img src="./images/icon-cross.svg"> </div>
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
      window.location.reload();
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
    // window.location.reload();
    // console.log("Sup");
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

let remove = document.querySelectorAll(".remove");

todolist.forEach(item => {
  let m = item.querySelector(".remove");
  m.addEventListener("click", ()=> {
    // item.remove;
    console.log("yh")
    console.log(item);
    item.remove();
    updatels();
    window.location.reload();
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

colors=[]
//Function to change theme
let theme = document.querySelector(".theme");
const img = document.getElementById('img');
const bg_img = document.getElementById('bgimg');
const change_theme = function() {
  if (img.dataset.image == "dark") {
  	img.src = "./images/icon-moon.svg";
    img.dataset.image = "light";  
    bg_img.src = "./images/bg-desktop-light.jpg";
    colors = ['./images/icon-moon.svg','white', 'hsl(0, 0%, 98%)', 'white', 'white'];
    localStorage.setItem('colors', JSON.stringify(colors));
    // window.location.reload();
    document.documentElement.style.setProperty('--todo-item-bg', 'white');
    document.documentElement.style.setProperty('--todo-item-wrapper-bg', 'white');
    document.documentElement.style.setProperty('--bg-color', 'hsl(0, 0%, 98%)');
    document.documentElement.style.setProperty('--todo-input-bg', 'white');
    document.documentElement.style.setProperty('--text-color', 'hsl(235, 19%, 35%)');
    let bg = true;
    localStorage.setItem('bg',JSON.stringify(bg))
    console.log('yh')
  } else if (img.dataset.image == "light") {
  	img.src = "./images/icon-sun.svg";
    colors = ['./images/icon-sun.svg','hsl(235, 24%, 19%)', 'hsl(235, 24%, 19%)', 'hsl(235, 21%, 11%)', 'hsl(235, 24%, 19%)', 'hsl(234, 39%, 85%)'];
    localStorage.setItem('colors', JSON.stringify(colors));
    img.dataset.image = "dark";
    // window.location.reload();
    bg_img.src = "./images/bg-desktop-dark.jpg";
    document.documentElement.style.setProperty('--todo-item-bg', 'hsl(235, 24%, 19%)');
    document.documentElement.style.setProperty('--todo-item-wrapper-bg', 'hsl(235, 24%, 19%)');
    document.documentElement.style.setProperty('--bg-color', 'hsl(235, 21%, 11%)');
    document.documentElement.style.setProperty('--todo-input-bg', 'hsl(235, 24%, 19%)');
    document.documentElement.style.setProperty('--text-color', 'hsl(234, 39%, 85%)');
    let bg = false;
    localStorage.setItem('bg',JSON.stringify(bg))
  };
};

function keep () {
  // if (sessionStorage.getItem('colors')) {
    const colors = JSON.parse(localStorage.getItem('colors'));
    const bg = JSON.parse(localStorage.getItem('bg'));
    if(bg){
      document.getElementById("bgimg").src= './images/bg-desktop-light.jpg';
    } else{
      document.getElementById("bgimg").src = './images/bg-desktop-dark.jpg';
    }

    img.src = colors[0];

    document.documentElement.style.setProperty('--todo-item-bg', colors[1]);
    document.documentElement.style.setProperty('--todo-item-wrapper-bg', colors[2]);
    document.documentElement.style.setProperty('--bg-color', colors[3]);
    document.documentElement.style.setProperty('--todo-input-bg', colors[4]);
    document.documentElement.style.setProperty('--text-color', colors[5]);
    
  // } 
}