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
// Sends back an id object
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


// Returns the post object with the specified id.
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then((response) => {
        if (response.length > 0){
            res.status(200).json(response)
        } else {
            res.status(400).json( {message: 'Post not found'} ) 
        }
    })
    .catch((error) => {
        res.status(500).json( {message: 'There was an error getting that post'} )
    })
})

// 	Updates the postwith the specified id using data from the request body.
//  Returns the modified document, NOT the original.
server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const updatedPost = req.body
    db.findById(id)
    .then((response) => {
        if (response.length == 0){
            res.status(400).json( {message: 'Post not found'} ) 
        }
        return response;
    })
    db.update(id, updatedPost)
    .then((response) => {
        res.status(201).json(updatedPost)
    })
    .catch((error) => {
        res.status(500).json( {message: 'There was an error updating the post'} )
    })
})


// Removes the post with the specified id and returns the deleted post object. 
// You may need to make additional calls to the database in order to satisfy this requirement.
server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then((response) => {
        if (response.length == 0){
            res.status(400).json( {message: 'Post not found'} ) 
        }
        return response;
    })
    .then((response) => {
        db.remove(id)
        .then(() => {
            res.status(200).json(response)
        })
        .catch((error) => {
            res.status(500).json( {message: 'There was an error while deleting that post'} )
        })
    })
    .catch((error) => {
        res.status(500).json( {message: 'There was an error getting that post'} )
    })
})

// Returns an array of all the comment objects associated with the post with the specified id.
server.get('/api/posts/:id/comments', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then((response) => {
        if (response.length == 0){
            res.status(400).json( {message: 'Post not found'} ) 
        }
        return response;
    })
    .then(
        db.findPostComments(id)
        .then((response) => {
            if (response.length > 0){
                res.status(200).json(response);
            } else {
                res.status(400).json({message: 'No comments found for this post'});
            }
        })
        .catch((error) => {
            res.status(500).json({message: 'There was an error getting the comments'})
        })
    )
})

// Creates a comment for the post with the specified id using information sent inside of the request body.
server.post('/api/posts/:id/comments', (req, res) => {
    const id = req.params.id;
    const newComment = req.body;
    db.findById(id)
    .then((response) => {
        if (response.length == 0){
            res.status(400).json( {message: 'Post not found'} ) 
        }
        return response;
    })
    .then(
        db.insertComment(newComment)
        .then((idObj) => {
            res.status(200).json(idObj);
        })
        .catch((error) => {
            res.status(404).json({message: 'Post not found'})
        })
    )
})

module.exports = server;