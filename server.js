const db = require('./data/db');
const express = require('express');

const server = express();
server.use(express.json())

// sanity check 
server.get("/", (req, res) => {
    res.status(200).json({ api: "up..." });
  });

server.get('/api/posts', (req, res) => {
    db.find()
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((error) => {
        res.status(500).json( {message: 'There was an error getting the posts'} )
    })
})

module.exports = server;