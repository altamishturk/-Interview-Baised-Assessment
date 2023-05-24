# Express.js Posts API

This repository contains a simple Express.js server that provides an API to retrieve a list of posts.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install the dependencies: `npm install`
3. Start the server: `node index.js`
4. The server will be running on `http://localhost:3000`

## API Endpoints

The following API endpoint is available:

### Get Posts

- Endpoint: `/posts`
- Method: GET
- Description: Retrieves a list of posts.
- Response: JSON array containing the first 20 posts.

## Example Usage

To retrieve the list of posts, make a GET request to `http://localhost:3000/posts`.



The response will be a JSON array containing the first 20 posts.

```json
[  {    "id": 0,    "title": "Post 0",    "body": "This is the body of Post 0"  },  ...  {    "id": 19,    "title": "Post 19",    "body": "This is the body of Post 19"  }]
