// Server-side code for handling links and routing

// Required modules for the server
const http = require("http");
const fs = require("fs");

// Server creation
const server = http.createServer((req, res) => {
  // monitor what is going on with each request
  console.log(req.url, req.method);

  // Page handling
  let path = "./views/";
  switch (req.url) {
    case '/':
      path += "index.html";
      res.statusCode = 200;
      break;
    case '/about':
      path += "about.html";
      res.statusCode = 200;
      break;
    case '/login':
      path += "login.html";
      res.statusCode = 200;
      break;
    default:
      path += 'error404.html'
      res.statusCode = 404;
      break;
  }

  // Send an HTML file
  fs.readFile (path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  })
});

// Listen for port 3000 on localhost
// Port 3000 will be used for testing
// Can be changed later if necessary
server.listen(3000, 'localhost', () => {
  // listening message
  console.log("Listening for requests on Port 3000");
});
