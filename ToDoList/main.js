//variables 

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-add-button');
const todoList = document.querySelector('.todo-list');
const audio = document.querySelector('.meow');
const title = document.querySelector('.title');
const microphone = document.querySelector('.todo-speech');



//Listeners 

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrCheck);



//Functions



//adding tasks function
function addTodo(event) {

    //prevent browser from refreshing when value is added
    event.preventDefault();

    //if statment that does not let User enter Null value 
    if (todoInput.value != "") {

        //create div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create list
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-content');
        todoDiv.appendChild(newTodo);

        //create check box
        const checkBoxButton = document.createElement('button');
        checkBoxButton.innerHTML = '<i class="fas fa-check"></i>';

        //add sound effect when button is clicked
        checkBoxButton.onclick = function () {
            audio.currentTime = 0;
            audio.play();
        };
        checkBoxButton.classList.add('checked-btn');
        todoDiv.appendChild(checkBoxButton);

        //create trash can 
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);

        //add task to list
        todoList.append(todoDiv);

        //delete Input for next task  
        todoInput.value = "";
    } else {
        alert("Please Enter Something New");
    }
}


//delete task or check them off function
function deleteOrCheck(event) {
    //taget the item 
    const item = event.target;

    //delete task with small animation on delete check 
    if (item.classList[0] === "delete-btn") {
        const todoTask = item.parentElement;
        todoTask.remove();
    }

    //if statement for when check mark is checked
    if (item.classList[0] === "checked-btn") {
        //strikethrough task text
        const todoTask = item.parentElement;
        //allow user to toggle check on or off
        todoTask.classList.toggle('completed');
    }
}

//Web Animations API

title.animate(
    [{
            transform: 'translate(-2em)',

        },
        {
            transform: 'translate(2em)'
        }
    ], {
        duration: 5000,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
    }
);

//Notifications API

function notifyMe() {

    //check to see if browser is supported
    if (!("Notification" in window)) {
        alert("This browser does not support notifications");
    }
    //check to see if permission is already granted
    else if (Notification.permission === "granted") {
        showNotification();
    }
    //if permission is not denied ask for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                showNotification();
            }
        });
    }
}

//notification 

function showNotification() {
    let notification = new Notification("New message from Andrew", {
        body: "Thank you for checking out my TODO List Application"
    });

    //send user to github if notification is clicked
    notification.onclick = function () {
        window.open("https://github.com/Clark-Code");
    };

    //Time out notification after 3sec
    setTimeout(notification.close.bind(notification), 3000);

}

notifyMe();


//Web Speech API

const recognition = new webkitSpeechRecognition();

//only listen to one command
recognition.continous = false;

//lang set to english
recognition.lang = "en-US";

//show most confident result
recognition.interimResults = false;

//only returns 1 alternative for each result
recognition.maxAlternatives = 1;

//onclick event for microphone button
microphone.addEventListener("click", () => {
    recognition.start();
});

//puts the result into the todo-input field
recognition.onresult = (e) => {
    todoInput.value = (e.results[0][0].transcript);
};


//Weather API

//get JSON Info from API
$.getJSON("https://api.openweathermap.org/data/2.5/weather?q=Barrie,ca&units=metric&APPID=ff16972709fc1002c18100e6fdc5a2db", function (data) {
    // console.log(data);

    //Grab Icon Image from API and assign it to icon class
    let icon = document.querySelector('.icon').src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

    //Grab Temp and assign it to temp class
    let temp = document.querySelector('.temp');

    temp.append((Math.round(data.main.temp)) + "C");

    //Grab Weather and assign it to weather calss
    let weather = document.querySelector('.weather');

    weather.append(data.weather[0].main);
});