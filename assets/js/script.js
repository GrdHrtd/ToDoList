const nuevaTareaInput = document.getElementById('nueva-tarea');
const btnAgregar = document.getElementById('btn-agregar');
const listaTareas = document.getElementById('lista-tareas');
const totalTareasSpan = document.getElementById('total-tareas');
const tareasRealizadasSpan = document.getElementById('tareas-realizadas');

let tareas = [];

function actualizarResumen() {
    const totalTareas = tareas.length;
    const tareasRealizadas = tareas.filter(tarea => tarea.completada).length;

    totalTareasSpan.textContent = totalTareas;
    tareasRealizadasSpan.textContent = tareasRealizadas;
}

function agregarTarea() {
    const descripcion = nuevaTareaInput.value.trim();

    if (descripcion) {
        const nuevaTarea = {
            id: Math.random(),
            descripcion,
            completada: false
        };

        tareas.push(nuevaTarea);
        nuevaTareaInput.value = '';

        mostrarTareas();
        actualizarResumen();
    }
}

function mostrarTareas() {
    listaTareas.innerHTML = '';

    tareas.forEach(tarea => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarea.completada;
        checkbox.addEventListener('change', () => {
            tarea.completada = checkbox.checked;
            mostrarTareas();
            actualizarResumen();
        });

        const label = document.createElement('label');
        label.textContent = tarea.descripcion;
        label.classList.toggle('completada', tarea.completada);

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'X';
        btnEliminar.addEventListener('click', () => {
            const indiceTarea = tareas.indexOf(tarea);
            tareas.splice(indiceTarea, 1);
            mostrarTareas();
            actualizarResumen();
        });

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(btnEliminar);

        listaTareas.appendChild(li);
    });
}

btnAgregar.addEventListener('click', agregarTarea);

// Función para mostrar tareas al cargar la página (opcional)
mostrarTareas();
actualizarResumen();