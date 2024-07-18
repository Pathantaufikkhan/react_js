const express = require('express');
require('mongoose');
const app = express();
require("./connection/connection");
const cors = require("cors");
const bodyParser = require('body-parser');

// Middleware
app.use(express.json()); // This is important for parsing JSON request bodies
app.use(cors());

// Routes
const bookRoutes = require('./routes/bookroutes'); // Adjust the path as needed
app.use('/book', bookRoutes);

app.use(bodyParser.json());
const userRoutes = require('./routes/userroutes'); // Adjust the path as needed
app.use('/user', userRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);
// Database Connection
// mongoose.connect('mongodb+srv://manish0jadav:manish123@cluster2.d7ypyu8.mongodb.net/PROJECT 0?retryWrites=true&w=majority&appName=Cluster2', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(1000, () => {
    console.log('Server is running on port 1000');
});
