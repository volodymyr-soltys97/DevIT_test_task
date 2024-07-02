# Concurrency Limited Request System

This project demonstrates a client-server application that limits the number of concurrent HTTP requests and the request rate per second. It is built using React for the client-side and Express for the server-side.

## Features

- Input field to specify concurrency limit and requests per second.
- Sends 1000 asynchronous HTTP requests to a server's `/api` endpoint.
- Concurrency limit and request rate per second are adjustable.
- Server handles requests with a random delay between 1ms to 1000ms.
- Server returns a 429 status code if more than 50 requests are received per second.
- Results of server responses are displayed immediately after each response.

## Installation

1. Clone the repository:
   git clone https://github.com/volodymyr-soltys97/DevIT_test_task.git
   cd DevIT_test_task

2. Install the dependencies:
   npm install

3. Navigate to the client directory and install client dependencies:
  cd client
  npm install

4. Navigate to the server directory and install server dependencies:
  cd ../server
  npm install

Running the Project
  npm start

Usage
  Enter the concurrency limit in the first input field (required, type number, from 1 to 100).
  Enter the requests per second limit in the second input field (required, type number, from 1 to 100).
  Click the "Start" button to begin sending requests.
  The results of the server responses (request indexes) will be displayed in a list below the button.

Server Logic
  The server makes a random delay before sending a response: from 1ms to 1000ms.
  A successful response data includes the index from the request.
  The server returns a 429 status code error response if it receives more than 50 requests per second.

Client Logic
  The client limits the number of concurrent HTTP requests and ensures the request rate per second.
  The client sends a request index (1, 2, 3, ...) to the server.
  The client renders the results of server responses immediately after each response.

Dependencies
  Client
    React
    axios
    p-limit
    delay

  Server
    express
    cors
