const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit:'10mb', extended:true}));

var Blog = require('./models/blog');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/blogsite');
var db = mongoose.connection;



app.get('/blogs', (req, res) => {
	Blog.getBlogs((err, blogs) => {
		if(err){
			throw err;
		}
		res.json(blogs);
	});
});

app.get('/blogs/:_id', (req, res) => {
	Blog.getBlogById(req.params._id, (err, blog) => {
		if(err){
			throw err;
		}
		res.json(blog);
	});
});

app.post('/blogs', (req, res) => {
	var blog = req.body;
	Blog.addBlog(blog, (err, blog) => {
		if(err){
			throw err;
		}
		res.json(blog);
	});
});

app.put('/blogs/:_id', (req, res) => {
	var id = req.params._id;
	var blog = req.body;
	Blog.updateBlog(id, blog, {}, (err, blog) => {
		if(err){
			throw err;
		}
		res.json(blog);
	});
});

app.delete('/blogs/:_id', (req, res) => {
	var id = req.params._id;
	Blog.removeBlog(id, (err, blog) => {
		if(err){
			throw err;
		}
		res.json(blog);
	});
});

app.listen(3000);
console.log('Running on port 3000...');