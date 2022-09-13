const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");


const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [{ model: User, attributes: ["id", "name", "email", "status"] }],
    });

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getOneTask = async (req, res) => {
  try {
    const { status } = req.body;

    const allStatus = ["completed", "late", "cancelled", "active"];
    let allowed = false;

    allStatus.map((all) => {
        if(all === status){
            allowed = true;
            req.status = status;
        }
    });
    if(!allowed) {
        return res.status(404).json({
            status: 'error',
            message: 'Status not found'
        });
    }
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (req, res) => {
  try {
    const { title, userId, startDate, limitDate } = req.body;

    const newTask = await Task.create({ title, userId, startDate, limitDate });

    // 201 -> Success and a resource has been created
    res.status(201).json({
      status: "success",
      data: { newTask },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { finishDate } = req.body;
    const { task } = req;

    // Method 1 : Update by using the model
    // const updatedUser = await User.update({ name }, { where: { id } });
    await task.update({ finishDate });

    if(task.limitDate >= task.finishDate) {

        await task.update({ status: 'completed' });

    } else if(task.limitDate < task.finishDate) {

        await task.update({ status: 'late' });
    }

    // Method 2 : Update using a model's instance
    res.status(200).json({
      status: "success",
      data: { task },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { task } = req;

    // Method : Delete by using the model's instance
    // user.destroy();

    // If user exist, remove it from db "soft delete"
    await task.update({ status: "cancelled" });

    res.status(204).json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
};
