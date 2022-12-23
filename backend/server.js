require('dotenv').config();
const express = require('express')

/* create express app */
const app = express();

const hostname = 'localhost';
const port = process.env.PORT;

app.listen(port, hostname, () => {
  console.log(`Listening port: ${port}`);
})

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

app.get("/", (req, res) => {
  res.json({ message: 'Hello, world json'});
})
