var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

var app = express();

// MongoDB Atlas connection string
var mongoURI = "mongodb+srv://Divya:Divya@meradb.z2dszqk.mongodb.net/";

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Your routes (CRUD operations for posts)
var Post = require('./models/dbConnect');  // Assuming this is where your model is defined

app.get('/', (req, res) => {
    res.render('home.ejs', {
        'text' : ""
    })
})
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/api/posts', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.put('/api/posts/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPost);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.delete('/api/posts/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted successfully!' });
    } catch (err) {
        res.status(500).send(err);
    }
});


// Start server
app.listen(8080, () => {
    console.log('Server running on http://localhost:3000');
});


// var express = require("express");
// var mongoose = require("mongoose");
// var path = require("path");
// var {MongoClient} = require('mongodb');

// var uri = "mongodb+srv://Divya:Divya@meradb.z2dszqk.mongodb.net/";

// var app = express();
// app.use(express.json())

// app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.urlencoded({extented:true}))
// app.set("view engine", "ejs" )

// app.get('/' , function(req,res){
//     res.render('home');
// })

// app.get('/show', async (req, res) => {
//     try {
//         const posts = await Post.find();
//         res.json(posts);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

// // POST: Create a new post
// app.post('/create', async (req, res) => {
//     const newPost = new Post(req.body);
//     try {
//         const savedPost = await newPost.save();
//         res.status(201).json(savedPost);
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });

// // PUT: Update a post by ID
// app.put('/update/:id', async (req, res) => {
//     try {
//         const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedPost);
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });

// // DELETE: Delete a post by ID
// app.delete('/delete/:id', async (req, res) => {
//     try {
//         await Post.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Post deleted successfully!' });
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

// app.listen(8080);

