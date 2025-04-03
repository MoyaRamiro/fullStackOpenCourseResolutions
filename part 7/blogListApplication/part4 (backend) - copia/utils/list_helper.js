const Blog = require('../models/blog')

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs) {
    return blogs.reduce((acum, blog) => acum + blog.likes, 0);
  } else {
    return 0;
  }
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max));
};

const initialBlogs = [
  {
    title: "ciloe",
    author: "charles chaplin",
    url: "asad",
    likes: 5,
  },
  {
    title: "aaaaasd",
    author: "wea sean",
    url: "1231231aaa",
    likes: 1,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  initialBlogs,
  blogsInDb
};
