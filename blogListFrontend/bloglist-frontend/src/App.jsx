import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import CreateBlogs from "./components/CreateBlogs";
import Message from "./components/Message";
import Togglable from "./components/Togglable";
import blogsService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [newMsg, setNewMsg] = useState({});

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

    const loggedUser = window.localStorage.getItem("loggedUser");

    if (loggedUser) {
      const newUser = JSON.parse(loggedUser);
      setUser(newUser);
      blogService.setToken(newUser.token);
    }
  }, []);

  const createBlog = (blog) => {
    try {
      blogsService.create(blog);

      console.log(
        "CREATE A NEW BLOG WITH PARAMS:",
        blog.title,
        blog.author,
        blog.url
      );

      setNewMsg({
        msg: `a new blog ${blog.title} by ${blog.author} added`,
        color: "green",
      });
      setTimeout(
        () => {
          setNewMsg({ color: "", msg: "" });
          window.location.reload();
        },

        3000
      );
    } catch (exception) {
      console.log(exception);

      setNewMsg({
        msg: "ERROR TO CREATE",
        color: "red",
      });
      setTimeout(
        () => {
          setNewMsg({ color: "", msg: "" });
          window.location.reload();
        },

        3000
      );
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedUser");
    setNewMsg({
      msg: `${user.name} logout`,
      color: "red",
    });
    setTimeout(() => {
      setNewMsg({ color: "", msg: "" });
      setUser(null);
      window.location.reload();
    }, 1000);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        {newMsg.msg && <Message message={newMsg.msg} color={newMsg.color} />}

        <Login setUser={setUser} setNewMsg={setNewMsg} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      {newMsg.msg && <Message message={newMsg.msg} color={newMsg.color} />}

      <div className="blogs">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} loggedUser={user} />
          ))}
      </div>

      <br />
      <br />
      <Togglable buttonLabel="create new blog">
        <CreateBlogs createBlog={createBlog} />
      </Togglable>

      <br />
      <br />

      <>
        {user.name} logged in
        <button type="button" onClick={logout}>
          logout
        </button>
      </>
    </div>
  );
};

export default App;
