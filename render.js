const { ipcRenderer } = require('electron');

let list = document.getElementById("list");
let newTask = document.getElementById("newTask");

document.getElementById("addTask").addEventListener('click', () => {
  addTask();
});

// Get the input field
var input = document.getElementById("newTask");
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.key === 'Enter') {
    // Cancel the default action, if needed
    event.preventDefault();
    addTask();
  }
});

function addTask(){
    // Inserting task directly to UI
    list.insertAdjacentHTML('beforeend', `<li class="list-group-item">${newTask.value}</li>`)
    // Passing the data to node process for further processing
    ipcRenderer.invoke('show-notification', newTask.value);
    newTask.value = '';
}

function deleteTask(){

}

ipcRenderer.on('store-data', (event, todos)=>{

  for (let value of Object.values(todos)) {
    // Inserting task directly to UI
    list.insertAdjacentHTML('beforeend', `<li class="list-group-item">${value}</li>`)  
  }
  
});
