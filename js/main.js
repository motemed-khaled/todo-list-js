// variables need to make atask

let theInput = document.querySelector(".add-task input");
let buttonAdd = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".task-content");
let noTask = document.querySelector(".no-task");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".task-completed span");

//input focus
window.onload = () => {
    theInput.focus();
}

// show all tasks from localstorage 
if (window.localStorage.getItem("posts")) {
    let allPosts = JSON.parse(window.localStorage.getItem("posts"));
    //show number of tasks
    tasksCount.innerHTML = allPosts.length
    // show number of completed tasks
    if (allPosts.length > 0) {
        noTask.remove();
    } 
    for (const post in allPosts) {
        let mainSpan = document.createElement("span");
        let childSpan = document.createElement("span");
        let buttonDelete = document.createElement("span");
        let text = document.createTextNode(allPosts[post]);
        let deleteTxt = document.createTextNode("Delete");
        childSpan.appendChild(text);
        mainSpan.appendChild(childSpan);
        mainSpan.classList.add("task-box");
        mainSpan.style.cursor = "pointer";
        buttonDelete.appendChild(deleteTxt);
        buttonDelete.classList.add("delete");
        mainSpan.appendChild(buttonDelete);
        tasksContainer.prepend(mainSpan);
        theInput.value = "";
        theInput.focus();
        }
}
//show all complete tasks when page start from localstorage
if (tasksContainer.children.length > 1 && window.localStorage.getItem("complete")) {
    let alLCompleteTasks = JSON.parse(window.localStorage.getItem("complete"));
    let allTasks = document.querySelectorAll(".task-box");
    for (let i = 0; i < allTasks.length; i++) {
        for (let j = 0; j < alLCompleteTasks.length; j++) {
            if (alLCompleteTasks[j] === allTasks[i].firstChild.innerHTML) {
                        allTasks[i].classList.add("finished");
            }
        }
        
    }
    tasksCompleted.innerHTML = alLCompleteTasks.length;
} 

// add new task from input task
addFun:buttonAdd.onclick = () => {
    let newValue = theInput.value;
    if (newValue === "") {
        theInput.focus();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Write The Task ?',
          })
    } else {
        noTask.remove();
        // add new task in localstorage
        if (window.localStorage.getItem("posts") === null) {
            window.localStorage.setItem("posts", "[]");
        } 
        let oldvalue = JSON.parse(window.localStorage.getItem("posts"));
        // check if the new value has alredy exist or no
        for (const post in oldvalue) {
            if (newValue === oldvalue[post]) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'This Task Is Already Exist !',
                })
                return addFun;
            } 
        }
        oldvalue.push(newValue);
        window.localStorage.setItem("posts", JSON.stringify(oldvalue));
        // create html tags and append this in the page with new task
        let mainSpan = document.createElement("span");
        let childSpan = document.createElement("span");
        let buttonDelete = document.createElement("span");
        let text = document.createTextNode(newValue);
        let deleteTxt = document.createTextNode("Delete");
        childSpan.appendChild(text);
        mainSpan.appendChild(childSpan);
        mainSpan.classList.add("task-box");
        mainSpan.style.cursor = "pointer";
        buttonDelete.appendChild(deleteTxt);
        buttonDelete.classList.add("delete");
        mainSpan.appendChild(buttonDelete);
        tasksContainer.prepend(mainSpan);
        theInput.value = "";
        theInput.focus();
        // update number of tasks
        tasksCount.innerHTML = oldvalue.length
    }
}

//button delete action 
document.addEventListener("click", e => {
    if (e.target.classList.contains("delete")) {
        let posts = JSON.parse(window.localStorage.getItem("posts"));
        let deletePost = (e.target.parentNode.firstChild.innerHTML);
        let result = posts.filter((post) => post != deletePost);
        // update number of alltasks
        tasksCount.innerHTML = result.length;
        window.localStorage.setItem("posts", JSON.stringify(result));
        e.target.parentNode.remove();
        //update number of complete tasks on delete
        if (window.localStorage.getItem("complete")) {
            alLCompleteTasks = JSON.parse(window.localStorage.getItem("complete"));
            alLCompleteTasks = alLCompleteTasks.filter((task) => task != deletePost);
            window.localStorage.setItem("complete", JSON.stringify(alLCompleteTasks));
            tasksCompleted.innerHTML = alLCompleteTasks.length;
        }
        if (result.length === 0) {
            window.location.reload();
        }
    }
    
    if (e.target.classList.contains("task-box")) {
        e.target.classList.toggle("finished");
        countCompleteTasks(e);
    }

})

// count number of complete tasks 
function countCompleteTasks(e) {
    if (window.localStorage.getItem("complete") === null) {
        window.localStorage.setItem("complete", "[]");
    }
    if (e.target.classList.contains("finished")) {
        alLCompleteTasks = JSON.parse(window.localStorage.getItem("complete"));
        alLCompleteTasks.push(e.target.firstChild.innerHTML)
        window.localStorage.setItem("complete", JSON.stringify(alLCompleteTasks));
        tasksCompleted.innerHTML = alLCompleteTasks.length;
    } else {
        alLCompleteTasks = JSON.parse(window.localStorage.getItem("complete"));
        alLCompleteTasks = alLCompleteTasks.filter((task) => task != e.target.firstChild.innerHTML);
        window.localStorage.setItem("complete", JSON.stringify(alLCompleteTasks));
        tasksCompleted.innerHTML = alLCompleteTasks.length;
    }
}
