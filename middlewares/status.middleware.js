const { Task } = require('../models/task.model');

const validateStatusTask = async (req, res, next) => {
    try {
        const { status } = req.params;
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
        console.log(error)
    }
    next();
};

module.exports= { validateStatusTask }