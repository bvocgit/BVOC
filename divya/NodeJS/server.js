var express = require("express");
var mongoose = require("mongoose");
var path = require("path");

var app = express();
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extented:true}))
app.set("view engine", "ejs" )

app.get('/' , function(req,res){
    res.render('home');
})

app.get('/show', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).send(err);
    }
});

// POST: Create a new post
app.post('/create', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).send(err);
    }
});

// PUT: Update a post by ID
app.put('/update/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPost);
    } catch (err) {
        res.status(400).send(err);
    }
});

// DELETE: Delete a post by ID
app.delete('/delete/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted successfully!' });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(8080);

