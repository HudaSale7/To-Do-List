let inputField = document.querySelector(".task");
let addTask = document.querySelector(".btn");
let list = document.querySelector(".my-list");
let myTask = document.querySelectorAll(".my-task");
let noTask = document.querySelector(".my-list p");
let arrayTasks = [];

//creating the element
function createTask() {
    noTask.style.display = "none";
    //creating the element
    let myDiv = document.createElement("div");
    myDiv.className = "my-task"
    let text = document.createElement("p");
    text.innerHTML = inputField.value;
    myDiv.appendChild(text);
    list.appendChild(myDiv);
    let mySpan = document.createElement("span");
    mySpan.className = "delete-task";
    mySpan.innerHTML = "Delete";
    myDiv.appendChild(mySpan);
    //delete task
    mySpan.addEventListener("click", (e) => {
        //take the index of span parent
        let index = Array.from(myDiv.parentNode.children).indexOf(e.currentTarget.parentNode);
        //delete from array
        arrayTasks.splice(index - 1, 1);
        //restoring the objects
        window.localStorage.setItem("tasks", JSON.stringify(arrayTasks));
        //delete the element from html
        mySpan.parentElement.remove();
        //return no task word if there is no task
        if ((list.children.length - 1) == 0) {
            noTask.style.display = "block";
        };
    });
}

//getting the tasks if it exist
if (window.localStorage.tasks) {
    arrayTasks = JSON.parse(localStorage.getItem("tasks"));
    arrayTasks.forEach(e => {
        inputField.value = e.title;
        createTask();
    });
    inputField.value = "";
};

addTask.onclick = function () {
    if (inputField.value !== "") {
        // call the function
        createTask();
        //creating the object of the task
        let objectTask = {
            title: inputField.value,
        };
        //push the object to the array
        arrayTasks.push(objectTask);
        //convert array to string & adding to localStorage
        window.localStorage.setItem("tasks", JSON.stringify(arrayTasks));
        inputField.value = "";
    }
}







