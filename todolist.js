document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task-btn');

    
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    
    function renderTasks() {
        taskList.innerHTML = ''; 
        tasks.forEach((task, index) => addTask(task.text, task.completed, index));
    }

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            addTask(taskText, false, tasks.length - 1);
            taskInput.value = '';
        }
    });

    function addTask(text, completed, index) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task ${completed ? 'completed' : ''}">${text}</span>
            <div>
                <button class="edit-btn">Edit</button>
                <button class="complete-btn">Complete</button>
                <button class="delete-btn"></button>
            </div>
        `;
    
        const deleteButton = li.querySelector('.delete-btn');
        deleteButton.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#FF471A" width="20" height="20"><rect x="114.402" y="220.724" width="274.813" height="276.96"></rect><g><path d="M182.746,422.305c-7.905,0-14.313-6.409-14.313-14.313v-91.604c0-7.904,6.408-14.313,14.313-14.313s14.313,6.409,14.313,14.313v91.604C197.06,415.895,190.652,422.305,182.746,422.305z"></path><path d="M251.808,422.305c-7.905,0-14.313-6.409-14.313-14.313v-91.604c0-7.904,6.408-14.313,14.313-14.313s14.313,6.409,14.313,14.313v91.604C266.121,415.895,259.713,422.305,251.808,422.305z"></path><path d="M320.869,422.305c-7.905,0-14.313-6.409-14.313-14.313v-91.604c0-7.904,6.408-14.313,14.313-14.313s14.313,6.409,14.313,14.313v91.604C335.182,415.895,328.774,422.305,320.869,422.305z"></path></g><g><path d="M374.9,483.374H128.716V235.04H374.9V483.374z"></path></g><path d="M434.571,135.961c-8.435-13.251-21.524-22.423-36.856-25.828c-7.712-1.722-15.362,3.152-17.076,10.869c-1.713,7.718,3.153,15.361,10.869,17.076c7.869,1.749,14.585,6.455,18.913,13.255c4.328,6.8,5.75,14.879,4.002,22.748l-7.423,33.418L99.603,139.224l7.423-33.42c3.608-16.243,19.754-26.519,36.002-22.917l145.2,32.249c7.713,1.713,15.361-3.153,17.076-10.869c1.713-7.718-3.153-15.361-10.869-17.076l-82.44-18.309l8.327-37.493l122.96,27.308l-11.431,51.467c-1.713,7.718,3.153,15.361,10.869,17.076c1.045,0.232,2.088,0.344,3.116,0.344c6.563,0,12.478-4.542,13.96-11.213l14.534-65.44c0.823-3.706,0.14-7.587-1.898-10.789c-2.038-3.202-5.266-5.463-8.972-6.286L212.555,0.342c-7.713-1.709-15.362,3.152-17.076,10.869l-11.43,51.466l-34.815-7.732C117.579,47.909,86.11,67.948,79.079,99.6l-10.526,47.391c-1.713,7.718,3.153,15.361,10.869,17.076l190.666,42.347H114.402c-7.905,0-14.313,6.409-14.313,14.313v276.96c0,7.904,6.408,14.313,14.313,14.313h274.81c7.905,0,14.313-6.409,14.313-14.313V236.049l11.243,2.498c1.026,0.229,2.067,0.341,3.103,0.341c2.701,0,5.37-0.764,7.686-2.239c3.202-2.038,5.463-5.266,6.288-8.972l10.526-47.391C445.776,164.954,443.006,149.212,434.571,135.961z"></path></svg>`;

 

        li.querySelector('.complete-btn').addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            li.querySelector('.task').classList.toggle('completed');
        });

        li.querySelector('.edit-btn').addEventListener('click', () => {
            const newText = prompt('Edit your task', tasks[index].text);
            if (newText) {
                tasks[index].text = newText;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                li.querySelector('.task').textContent = newText;
            }
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            tasks.splice(index, 1); 
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(); 
        });

        taskList.appendChild(li);
    }

    renderTasks();
});
