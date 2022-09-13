const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize({
	host: 'localhost',
	username: 'postgres',
	password: 'fernando1991',
	database: 'tarea2',
	port: 5432,
	dialect: 'postgres',
	logging: false,
});

module.exports = { db, DataTypes };