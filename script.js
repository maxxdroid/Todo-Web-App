const form = document.querySelector("myform");
let text = document.getElementById("todo-input");
let todoCon = document.querySelector(".todo-items");
// form.addEventListener("submit", (e) => {
//     e.preventDefault;
//     addItem();
// })

function addItem(event) {
    event.preventDefault();
    let todoItems = document.createElement("div");
    let inputText = text.value;
    todoItems.innerHTML = `
    <div class="todo-item">
          <div class="check">
            <div class="check-mark">
              <img src="./images/icon-check.svg" alt="">
            </div>
          </div>
          <div class="todo-text">${inputText}</div>
        </div>
    `
    todoCon.appendChild(todoItems);
    // createEventListeners();

    let check = todoItems.querySelector(".check-mark");
    let textcheck = todoItems.querySelector(".todo-text");
    check.addEventListener('click', () => {
      check.classList.add("checked");
      textcheck.classList.add("checked");
      // console.log(todoItems.children[0]);
    })
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