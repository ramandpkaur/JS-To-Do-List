const title = document.getElementById('title');
const description = document.getElementById('description');
const form = document.querySelector('form');
const container = document.querySelector('.container');

const tasks = (localStorage.getItem('tasks')) 
? JSON.parse(localStorage.getItem('tasks')) 
: [];

displayTasks();

function displayTasks () {
  tasks.forEach((value, index) => {

    // Creating the main div for the Task
    const div = document.createElement("div");
    div.setAttribute('class', 'task');
    
    // Creating and appending inner div that will store title and description value
    const innerDiv = document.createElement('div');
    div.append(innerDiv);

    // Creating paragraph for title value
    const p = document.createElement('p');
    p.innerText = value.title;

    // Creating span for description value
    const span = document.createElement('span');
    span.innerText = value.description;

    // Append Title and Description to the innerDiv
    innerDiv.append(p);
    innerDiv.append(span);

    // Create and Append delete button to the main div
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'delete');
    deleteBtn.innerText='-';
    div.append(deleteBtn);

    // Adding delete functionality to deleteBtn
    deleteBtn.addEventListener('click', () => {
      removeTask();
      tasks.splice(index, 1);
      displayTasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    // Append the main div to the HTML Container class
    container.append(div);

  });
}

function removeTask() {
  tasks.forEach((value, index) => {
    const div = document.querySelector('.task');
    div.remove();
  });
}

form.addEventListener("submit", (e) => {
  
  // Prevent reload of page on submission of form
  e.preventDefault();

  // Empty Tasks displayed on the page
  removeTask();

  // Add new task to the Tasks array
  tasks.push({
    title: title.value,
    description: description.value,
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  
  // Render all the tasks to the page
  displayTasks();
  // console.log(tasks);

});