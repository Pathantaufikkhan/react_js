const express = require('express');
const router = express.Router();
const BookModel = require('../models/bookmodel');
const UserModel = require('../models/usermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get books
router.get("/getbooks", async (req, res) => {
    try {
        const books = await BookModel.find();
        res.status(200).json({ books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add user
router.post('/useradd', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Registration suceessfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding user', error });
    }
});

// Fetch all users
router.get('/adgetusers', async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get user by id
router.get("/adgetuser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//get user by username
// router.get("/getuser/:username", async (req, res) => {
//   try {
//     const username = req.params.username;
//     const user = await UserModel.findOne({ username: username });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.status(200).json({ user });
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Login via database
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If password matches, send a success message
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    next(error);
  }
});

//user delete by id
router.delete("/deleteuser/:id", async (req, res) => {
  const id = req.params.id;
  try {
      const user= await UserModel.findByIdAndDelete(id);
      if (!user) {
          return res.status(404).json({ message: "user not found" });
      }
      res.status(200).json({ message: "user deleted" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong", error });
  }
});

//new route
// routes/userRoutes.js



// GET all users
router.get('/getusers', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET user by ID
router.get('/getuser/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE user by ID
router.delete('/deleteuser/:id', async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// GET user by Username
router.get('/getuserbyusername/:username', async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Error fetching user by username:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET logged-in user's profile
router.get('/profile/:id', async (req, res) => {
  try {
    // Assuming req.user contains the logged-in user's information after authentication
    const user = await UserModel.findById(req.user.id); // Replace with your authentication method
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Error fetching logged-in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;




