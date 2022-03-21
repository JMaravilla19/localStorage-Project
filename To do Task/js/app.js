//Variables
const formulario = document.querySelector('#formulario');
const listaTask = document.querySelector('#lista-to-do');
let tasks = [];

//EventListeners
eventListeners();

function eventListeners(){
    //When user adds a task
    formulario.addEventListener('submit', agregarTask);

    //When the document is ready
    document.addEventListener('DOMContentLoaded', ()=>{
        //This will either transform the tasks into an array from parse OR || Empty Array
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        console.log(tasks);

        crearHTML();
    });
}


//Functions
function agregarTask(e){
    e.preventDefault();

    //Text area where the user types the task
    const task = document.querySelector('#task').value;

    //Validation...
    if (task === ""){
        const errorMessage = 'A task cannot be empty!';

        const contenido = document.querySelector('#contenido').lastElementChild.textContent;

        if(!contenido.includes(errorMessage) ){
            mostrarError(errorMessage);
        }
        
        //This return only works inside the if when the if is inside a function.
        //When you reach this return it won't allow any other lines to execute.
        return;
    }

    const taskObj = {
        id: Date.now(),
        task
    }

    // Add Task to array of tasks
    tasks = [...tasks, taskObj];

    
    //Show the tasks list on HTML
    crearHTML();

    //Restart form
    formulario.reset();

}

function mostrarError(error){
    
    
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;

    mensajeError.classList.add('error');

    //Insert in the content
    const contenido = document.querySelector('#contenido');
    
    contenido.appendChild(mensajeError);

    setTimeout(() => {
       mensajeError.remove();
    }, 3000);
}

function crearHTML(){
    limpiarHTML();

    if (tasks.length > 0){
        tasks.forEach( task =>{
            //Add a button to delete tasks
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Delete the clicked item from the DOM
            btnEliminar.onclick = () =>{
                borrarTask(task.id);
            }
            //create HTML
            const li = document.createElement('li');

            //Add text
            li.innerText = task.task;
            li.appendChild(btnEliminar);

            //Insert into HTML
            listaTask.appendChild(li);
        });
    }

    sincronizarStorage();
}

//Add Tweets to localStorage
function sincronizarStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Delete a Task
function borrarTask(id){
    tasks = tasks.filter( task => task.id !== id);
    crearHTML();
}

//Clean HTML
function limpiarHTML(){
    while (listaTask.firstChild){
        listaTask.removeChild(listaTask.firstChild);
    }
}

