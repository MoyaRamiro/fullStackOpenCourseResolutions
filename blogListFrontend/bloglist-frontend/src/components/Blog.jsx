import { useState } from "react";
import blogsService from "../services/blogs";

const Blog = ({ blog, loggedUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const removeButtonStyle = {
    backgroundColor: "#4682B4",
    border: "none",
    borderRadius: "8px",
    padding: "0.4rem 0.6rem",
    margin: "0.2rem",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  };

  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const increaseLikes = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);

    const newBlog = {
      author: blog.author,
      id: blog.id,
      likes: newLikes,
      title: blog.title,
      url: blog.url,
      user: blog.user,
    };

    blogsService.update(blog.id, newBlog);
  };

  const removeBlog = () => {
    const userConfirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );

    if (userConfirmed) {
      blogsService.remove(blog.id);
      window.location.reload();
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button type="button" onClick={toggleVisibility}>
          {visible ? "hide" : "view"}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {blog.url}
        <br />
        likes {likes}
        <button type="button" onClick={increaseLikes}>
          like
        </button>
        <br />
        {blog.user.name}
        <br />
        {loggedUser.username === blog.user.username && (
          <button type="button" style={removeButtonStyle} onClick={removeBlog}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
