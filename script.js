// const form = document.querySelector("myform");
let text = document.getElementById("todo-input");
let todoCon = document.querySelector(".todo-items");
let todoItems = document.querySelectorAll(".todo-item");
let todos = JSON.parse(localStorage.getItem("todos"));
let remaining = document.querySelector(".items-left");
let remaining_h = document.querySelector(".hiddenitems-left");
let darktheme = true;
let arr=[];

let form = document.querySelector("form");

form.addEventListener("submit", (e)=>{
  e.preventDefault();
  addItem();
})
// let textcheck = todoItems.querySelector(".todo-text");
// let item = todoItems.querySelector(".todo-item")
// textcheck.classList.add("complete");
        // item.classList.add("checked")


// let hremaining = document.querySelector(".hiddenitems-left");
// hremaining.innerText = `${num} items left`

if (todos) {
  todos.forEach(element => {
    addItem(element);
  })
}


//Create and Add todos to arrays and then stored in local storage
function addItem(element) {
    // event.preventDefault();
    let todoItems = document.createElement("div");
    todoItems.classList.add("todocoll")
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
    // itemNumber()
    // $("todo-items-wrapper").load(location.href+"todo-items-wrapper>*",""); 
    // $('todo-items-wrapper').load('todo-items-wrapper');
  }
    let check = todoItems.querySelector(".check-mark");
    let textcheck = todoItems.querySelector(".todo-text");
    let item = todoItems.querySelector(".todo-item")
    check.addEventListener('click', () => {
      if(!check.classList.contains("checked")) {
        check.classList.add("checked");
        textcheck.classList.add("complete");
        item.classList.add("checked")
        updatels();
        itemNumber()
      } else {
        check.classList.remove("checked");
        textcheck.classList.remove("complete");
        item.classList.remove("checked")
        updatels();
        itemNumber()
      }
    })
    text.value = "";
    // window.location.reload();
    itemNumber()
}

//Show completed, active and all Todos
let info = document.querySelectorAll(".items-statuses span");
let todolist = document.querySelectorAll(".todocoll");

function active () {
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
}

function completed () {
  todolist.forEach(item => {
    if(!item.children[0].classList.contains("checked")){
      console.log("yh");
      item.style.display = "none";
    } else {
      item.style.display = "block";
    }
  })
}

function all_items () {
  todolist.forEach(item => {
    item.style.display = "block";
  })
}

// info.forEach(element => {
//   element.addEventListener("click", ()=>{
//     // window.location.reload();
//     // console.log("Sup");
//     if (element.innerText == "Active"){
//       console.log(todolist)
//       todolist.forEach(item => {
//         if(item.children[0].classList.contains("checked")){
//           // item.style.display = "flex";
//           // item.classList.remove("checked")
//           // updatels()
//           item.style.display = "none";
//         } else {
//           item.style.display = "block";
//         }
//       })
//     }else if (element.innerText == "Completed"){
//       todolist.forEach(item => {
//         if(!item.children[0].classList.contains("checked")){
//           console.log("yh");
//           item.style.display = "none";
//         } else {
//           item.style.display = "block";
//         }
//       })
//     }else{
//       todolist.forEach(item => {
//         item.style.display = "block";
//       })
//     }
//   })
// })


// let clear = document.querySelector(".clear");
// clear.addEventListener("click", ()=>{
//   todolist.forEach(item => {
//     if(item.children[0].classList.contains("checked")){
//       item.remove();
//       updatels();
//     } 
//   })
// })

//Clear completed todos
function clearCompleted () {
  todolist.forEach(item => {
    if(item.children[0].classList.contains("checked")){
      item.remove();
      updatels();
    } 
  })
}

let remove = document.querySelectorAll(".remove");

let todocoll = document.querySelectorAll(".todocoll");
todocoll.forEach((col) => {
  console.log("dragging")
  col.setAttribute('draggable', true);
  console.log(col);
  col.addEventListener("dragstart", () =>{
    setTimeout(() => col.classList.add("dragging"), 0);
  })
  col.addEventListener("dragend", () => col.classList.remove("dragging"));
})

const initSortableItems = (e) => {
  e.preventDefault();
  const draggingItem = todoCon.querySelector(".dragging");
  const siblings = [...todoCon.querySelectorAll(".todocoll:not(.dragging)")];
  let nextSibling = siblings.find(sibling => {
    return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  })
  // console.log(nextSibling);
  todoCon.insertBefore(draggingItem, nextSibling);
  updatels();
}

todoCon.addEventListener("dragover", initSortableItems);

todolist.forEach(item => {
  let m = item.querySelector(".remove");
  m.addEventListener("click", ()=> {
    // item.remove;x
    console.log("yh")
    console.log(item);
    item.remove();
    updatels();
    itemNumber()
  })
})



//Update array stored in local Storage
function updatels() {
  let textTag = document.querySelectorAll(".todo-text")
  arr=[];
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


function itemNumber () {
  let activeTodo = document.querySelectorAll(".todo-item.checked");
  let num = arr.length - activeTodo.length;
  remaining.innerText = `${num} items left`
  remaining_h.innerText = `${num} items left`
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
    colors = ['./images/icon-moon.svg','white', 'hsl(0, 0%, 98%)', 'white', 'white', 'hsl(235, 19%, 35%)', 'hsl(233, 11%, 84%)', 'hsl(235, 24%, 19%)'];
    localStorage.setItem('colors', JSON.stringify(colors));
    // window.location.reload();
    document.documentElement.style.setProperty('--todo-item-bg', 'white');
    document.documentElement.style.setProperty('--todo-item-wrapper-bg', 'white');
    document.documentElement.style.setProperty('--bg-color', 'hsl(0, 0%, 98%)');
    document.documentElement.style.setProperty('--todo-input-bg', 'white');
    document.documentElement.style.setProperty('--text-color', 'hsl(235, 19%, 35%)');
    document.documentElement.style.setProperty('--border-color','hsl(233, 11%, 84%)');
    document.documentElement.style.setProperty('--input-text-color','hsl(235, 24%, 19%)');
    let bg = true;
    localStorage.setItem('bg',JSON.stringify(bg))
    console.log('yh')
  } else if (img.dataset.image == "light") {
  	img.src = "./images/icon-sun.svg";
    colors = ['./images/icon-sun.svg','hsl(235, 24%, 19%)', 'hsl(235, 24%, 19%)', 'hsl(235, 21%, 11%)', 'hsl(235, 24%, 19%)', 'hsl(234, 39%, 85%)', 'hsl(237, 14%, 26%)', 'hsl(234, 39%, 85%)'];
    localStorage.setItem('colors', JSON.stringify(colors));
    img.dataset.image = "dark";
    // window.location.reload();
    bg_img.src = "./images/bg-desktop-dark.jpg";
    document.documentElement.style.setProperty('--todo-item-bg', 'hsl(235, 24%, 19%)');
    document.documentElement.style.setProperty('--todo-item-wrapper-bg', 'hsl(235, 24%, 19%)');
    document.documentElement.style.setProperty('--bg-color', 'hsl(235, 21%, 11%)');
    document.documentElement.style.setProperty('--todo-input-bg', 'hsl(235, 24%, 19%)');
    document.documentElement.style.setProperty('--text-color', 'hsl(234, 39%, 85%)');
    document.documentElement.style.setProperty('--border-color','hsl(237, 14%, 26%)');
    document.documentElement.style.setProperty('--input-text-color','hsl(234, 39%, 85%)');
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
    document.documentElement.style.setProperty('--border-color', colors[6]);
    document.documentElement.style.setProperty('--input-text-color', colors[7]);
}