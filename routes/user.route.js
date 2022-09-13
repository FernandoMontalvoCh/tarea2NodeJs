const express = require('express');

//Controllers
const { getAllUsers , createUser, updateUser, deleteUser } = require('../controllers/user.controller');

const usersRouter = express.Router();

const { userExist } = require('../middlewares/user.middlewares');

const { createUserValidators } = require('../middlewares/validator.middlewares');


usersRouter.get('/', getAllUsers );

usersRouter.post(
    '/', 
    createUserValidators,
    createUser );

usersRouter.patch('/:id', userExist, updateUser );

usersRouter.delete('/:id', userExist, deleteUser );

module.exports = { usersRouter }