const express = require('express');
const { fetchAllTasks, fetchTaskById, createTask, updateTaskById, deleteTaskById } = require('../controller/taskcontroller');
const router = express.Router();
//get all tasks
router.get('/',fetchAllTasks)

//get by id
router.get('/:id',fetchTaskById);
//post task
router.post('/', createTask);
//put task update by id
router.put('/:id',updateTaskById);
//delete task by id
router.delete('/:id',deleteTaskById)

module.exports = router;