const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        console.log(chalk.green.bold(`MongoDB Connected: ${conn.connection.host}`));

        // Connection events
        mongoose.connection.on('connected', () => {
            console.log(chalk.green.bold('Mongoose connected to DB'));
        });

        mongoose.connection.on('error', (err) => {
            console.log(chalk.red.bold(`Mongoose connection error: ${err.message}`));
        });

        mongoose.connection.on('disconnected', () => {
            console.log(chalk.yellow.bold('Mongoose disconnected'));
        });

        // Close connection on process termination
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log(chalk.yellow.bold('Mongoose connection closed due to app termination'));
            process.exit(0);
        });
    } catch (err) {
        console.error(chalk.red.bold(`Database connection error: ${err.message}`));
        process.exit(1);
    }
};

module.exports = connectDB;

