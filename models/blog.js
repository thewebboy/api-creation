const mongoose = require('mongoose');

// Blog Schema
const blogSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	description:{
		type: String
	},
    content:{
		type: String
	},
	author:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const Blog = module.exports = mongoose.model('Blog', blogSchema);

// Get All Blogs
module.exports.getBlogs = (callback, limit) => {
	Blog.find(callback).limit(limit);
}

// Get A Perticular Blog
module.exports.getBlogById = (id, callback) => {
	Blog.findById(id, callback);
}

// Add A New Blog
module.exports.addBlog = (blog, callback) => {
	Blog.create(blog, callback);
}

// Edit A Blog
module.exports.updateBlog = (id, blog, options, callback) => {
	var query = {_id: id};
	var update = {
		title: blog.title,
		description: blog.description,
		content: blog.content,
        author: blog.author
		
	}
	Blog.findOneAndUpdate(query, update, options, callback);
}

// Delete A Blog
module.exports.removeBlog = (id, callback) => {
	var query = {_id: id};
	Blog.remove(query, callback);
}
