const express = require('express');
const app = express();
const port = 3000;


// Middleware para permitir el análisis de JSON en las solicitudes
app.use(express.json());


// Lista de tareas (simulada en memoria)
let tasks = [];


// Obtener todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});


// Crear una nueva tarea
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = { id: tasks.length + 1, title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});


// Obtener una tarea por ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});


// Eliminar una tarea por ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
