const express = require('express');


const { usersRouter } = require('./routes/user.route');
const { tasksRouter } = require('./routes/task.route');


// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json()); // Middleware

// Define endpoints
app.use('/api/v1/users', usersRouter );
app.use('/api/v1/tasks', tasksRouter );

// Catch non-existing endpoints
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `${req.method} ${req.url} does not exists in our server`,
	});
});

module.exports = { app };