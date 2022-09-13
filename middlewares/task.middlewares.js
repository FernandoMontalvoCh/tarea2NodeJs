const { Task } = require('../models/task.model');

const taskExist = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if the userexists before delete
        const task = await Task.findOne({ where: { id } });
    
        // If user doesn't exist, send error message
        if (!task) {
        return res.status(404).json({
            status: 'error',
            message: 'Task not found',
        });
        }
    
        //req.anyPropName = 'anyValue';
        req.user = task;
        next();
    } catch (error) {
        console.log(error);
    }

};

module.exports = {
    taskExist,
}