// initializeAdmin.js
const mongoose = require('mongoose');
const Admin = require('./adminModel'); // Adjust the path as necessary
const bcrypt = require('bcrypt');


mongoose.connect('mongodb://127.0.0.1:27017/new_database', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected');
        createAdmin();
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

const createAdmin = async () => {
    const username = 'admin';
    const password = 'admin123'; // Change as needed

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
        console.log('Admin user already exists');
        mongoose.connection.close();
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ username, password: hashedPassword });

    await newAdmin.save();
    console.log('Admin user created');
    mongoose.connection.close();
};
