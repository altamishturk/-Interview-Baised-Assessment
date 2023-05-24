const express = require('express');
const app = express();

// Define your posts data
const posts = new Array(30).fill(1).map((item,i) => {return { id: i, title: `Post ${i}}]`, body: `This is the body of Post ${i}` }});

// Endpoint to get 20 posts
app.get('/posts', (req, res) => {
  const twentyPosts = posts.slice(0, 20); // Get the first 20 posts
  res.json(twentyPosts);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});