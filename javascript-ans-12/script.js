// Function to fetch blog data from API
async function fetchBlogs() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching blogs:', error);
      return [];
    }
  }
  
  // Function to display blogs on the UI
  function displayBlogs(blogs) {
    const blogList = document.getElementById('blog-list');
    blogList.innerHTML = '';
  
    blogs.forEach(blog => {
      const blogItem = document.createElement('div');
      blogItem.classList.add('blog-item');
      blogItem.innerHTML = `
      <div class="content">
      <h2>${blog.title}</h2>
      <p>${blog.body}</p>
  </div>
  <div class="button">
      <button class="delete-button" data-id="${blog.id}">Delete</button>
  </div>
      `;
      blogList.appendChild(blogItem);
    });
  
    // Add event listener to delete buttons
    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach(button => {
      button.addEventListener('click', deleteBlog);
    });
  }
  
  // Function to add a new blog
  async function addBlog(event) {
    event.preventDefault();
    
    const titleInput = document.getElementById('title-input');
    const contentInput = document.getElementById('content-input');
  
    const newBlog = {
      title: titleInput.value,
      body: contentInput.value,
    };
  
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newBlog),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const blog = await response.json();
  
      // Clear input fields and fetch updated blog list
      titleInput.value = '';
      contentInput.value = '';

      const blogList = document.getElementById('blog-list');

      const blogItem = document.createElement('div');
      blogItem.classList.add('blog-item');
      blogItem.innerHTML = `
         <div class="content">
            <h2>${blog.title}</h2>
            <p>${blog.body}</p>
        </div>
        <div class="button">
            <button class="delete-button" data-id="${blog.id}">Delete</button>
        </div>
      `;                    

      blogList.insertBefore(blogItem, blogList.firstChild);


    } catch (error) {
      console.log('Error adding blog:', error);
    }
  }
  
  // Function to delete a blog
  async function deleteBlog() {
    const blogId = this.dataset.id;

  
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`, {
        method: 'DELETE',
      });
      await response.json();

      const blog = document.querySelector(`[data-id='${blogId}']`);
      blog.parentElement.parentElement.remove();

    } catch (error) {
      console.log('Error deleting blog:', error);
    }
  }
  
  // Function to fetch and display blogs
  async function fetchAndDisplayBlogs() {
    const blogs = await fetchBlogs();
    displayBlogs(blogs);
  }
  
  // Event listener for form submission
  const addBlogForm = document.getElementById('add-blog-form');
  addBlogForm.addEventListener('submit', addBlog);
  
  // Fetch initial blog list
  fetchAndDisplayBlogs();
  