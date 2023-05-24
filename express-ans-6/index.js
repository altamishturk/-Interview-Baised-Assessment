const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// In-memory database (replace with your own database)
const users = [];

// Secret key for JWT
const secretKey = 'your-secret-key';

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    if (users.find((user) => user.username === username)) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = {
      username,
      password: hashedPassword,
    };

    // Store the user in the database
    users.push(user);

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find((user) => user.username === username);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Check if the password is correct
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT
    const token = jwt.sign({ username: user.username }, secretKey);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Protected route
app.get('/protected', (req, res) => {
  try {
    // Get the token from the request header
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    res.json({ message: `Hello, ${decoded.username}! This is a protected route.` });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
