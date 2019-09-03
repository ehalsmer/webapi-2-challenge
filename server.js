const db = require('./data/db');
const express = require('express');

const server = express();
server.use(express.json())

// sanity check 
server.get("/", (req, res) => {
    res.status(200).json({ api: "up..." });
  });

// 	Returns an array of all the post objects contained in the database.
server.get('/api/posts', (req, res) => {
    db.find()
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((error) => {
        res.status(500).json( {message: 'There was an error getting the posts'} )
    })
})

// Creates a post using the information sent inside the request body.
server.post('/api/posts', (req, res) => {
    const newPost = req.body;
    db.insert(newPost)
    .then((idObj) => {
        res.status(201).json(idObj)
    })
    .catch((error) => {
        res.status(500).json( {message: 'There was an error creating this post'} )
    })
})

module.exports = server;