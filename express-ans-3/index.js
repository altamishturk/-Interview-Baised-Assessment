const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Middleware to parse JSON data in the request body
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define the blog post schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

// Define the blog post model
const Post = mongoose.model('Post', postSchema);

// ...
// Rest of the routes and CRUD operations
// ...

// Get all blog posts
app.get('/posts', (req, res) => {
  Post.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving blog posts' });
    });
});


// Create a new blog post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;

  // Create a new post using the Post model
  const newPost = new Post({
    title,
    content,
  });

  // Save the new post to the database
  newPost
    .save()
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error creating blog post' });
    });
});

// Update a blog post
app.put('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  // Find the post by ID and update its title and content
  Post.findByIdAndUpdate(
    postId,
    { title, content },
    { new: true } // Return the updated post
  )
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error updating blog post' });
    });
});

// Delete a blog post
app.delete('/posts/:id', (req, res) => {
  const postId = req.params.id;

  // Find the post by ID and remove it
  Post.findByIdAndRemove(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ message: 'Post deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error deleting blog post' });
    });
});


// replace a blog post
app.post('/posts/replace/:id', (req, res) => {
  const postId = req.params.id;

  // Find the post by ID
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Create a new post using the Post model
      const newPost = new Post({
        title: post.title,
        content: post.content,
      });

      // Save the new post to the database
      newPost
        .save()
        .then((post) => {
          res.status(201).json(post);
        })
        .catch((error) => {
          res.status(500).json({ error: 'Error creating blog post' });
        });

    })
    .catch((error) => {
      res.status(500).json({ error: 'Error deleting blog post' });
    });
});



// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

