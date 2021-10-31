const toDoForm = document.getElementById("toDoForm");
const toDoInput = document.querySelector("#toDoForm input");
const toDoList = document.getElementById("toDoList");

//
//
//  1. make todos for each users
//
function handleUserToDos(userId) {
    const TODOS_KEY = `${userId}ToDos`; // make each user's todos
    let toDoArray = [];

    function saveToDos() {
        localStorage.setItem(TODOS_KEY, JSON.stringify(toDoArray));
    }

    function deleteToDos(event) {
        const deleteTarget = event.target.parentNode;
        toDoArray = toDoArray.filter((toDos) => toDos.id !== parseInt(deleteTarget.id));
        saveToDos();
        deleteTarget.remove();
    }

    function checkToDos(event) {
        event.target.previousElementSibling.classList.toggle("checked");
        event.target.classList.toggle("done");
    }

    function paintToDos(newTodoObj) {
        const checkBtn = document.createElement("button");
        checkBtn.classList.add("checkBtn");
        const li = document.createElement("li");
        li.id = newTodoObj.id;
        const div = document.createElement("div");
        div.classList.add("toDoText");
        div.innerText = newTodoObj.text;
        const cancelBtn = document.createElement("button");
        cancelBtn.classList.add("cancelBtn");
        li.appendChild(checkBtn);
        li.appendChild(div);
        li.appendChild(cancelBtn);
        toDoList.appendChild(li);
        div.addEventListener("click", checkToDos);
        cancelBtn.addEventListener("click", deleteToDos);
    }

    function handleToDoForm(event) {
        event.preventDefault();
        const newToDos = toDoInput.value;
        toDoInput.value = "";
        const newTodoObj = {
            text: newToDos,
            id: Date.now(),
        };
        toDoArray.push(newTodoObj);
        // paint to user
        paintToDos(newTodoObj);
        // save at localStorage
        saveToDos(newToDos);
    }

    toDoForm.addEventListener("submit", handleToDoForm);

    const savedToDos = localStorage.getItem(TODOS_KEY);

    if (savedToDos !== null) {
        // localStorage toDos update at array
        const parsedToDos = JSON.parse(savedToDos);
        toDoArray = parsedToDos;
        // paintToDos savedToDos
        parsedToDos.forEach((toDos) => {
            paintToDos(toDos);
        });
    }
}

//
//
// 0. after greeting, get user id for todos
//
function getSavedUserName(userName) {
    toDoList.innerHTML = ""; // reset todos
    const userdata = JSON.parse(localStorage.getItem("userData"));
    userdata.forEach((element) => {
        (function () {
            if (element.username === userName) {
                // find logged in username
                handleUserToDos(element.id); // send user id
            }
        })();
    });
}
