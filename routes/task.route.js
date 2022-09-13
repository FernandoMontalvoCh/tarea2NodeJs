const express = require('express');

//Controllers
const { getAllTasks, getOneTask, createTask, updateTask, deleteTask } = require('../controllers/task.controller');

const tasksRouter = express.Router();

const { taskExist } = require('../middlewares/task.middlewares');

tasksRouter.post('/', createTask );

tasksRouter.get('/', getAllTasks);

tasksRouter.get('/:status', getOneTask );

tasksRouter.patch('/:id', taskExist, updateTask );

tasksRouter.delete('/:id', taskExist, deleteTask );

module.exports = { tasksRouter }