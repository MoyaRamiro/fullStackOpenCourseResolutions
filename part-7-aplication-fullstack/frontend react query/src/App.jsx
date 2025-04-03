import { useState, useEffect, useContext, useReducer } from "react";
import blogService from "./services/blogs";
import Login from "./components/Login";
import CreateBlogs from "./components/CreateBlogs";
import Message from "./components/Message";
import Togglable from "./components/Togglable";
import BlogsList from "./components/BlogsList";
import notificationReducer from "./reducers/Notification";
import UserContext from "./UserContext";

const App = () => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );
  const [user, dispatch] = useContext(UserContext);

  useEffect(() => {
    dispatch({ type: "GetLoggedUser" });
  }, [dispatch]);

  const logout = () => {
    dispatch({ type: "RemoveLoggedUser" });

    notificationDispatch({
      type: "ADD",
      payload: {
        msg: `${user.name} logout`,
        color: "red",
      },
    });

    setTimeout(() => {
      notificationDispatch({
        type: "REM",
      });
    }, 1000);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Message notification={notification} />

        <Login
          notificationDispatch={notificationDispatch}
          userDispatch={dispatch}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <Message notification={notification} />

      <BlogsList loggedUser={user} />

      <br />
      <br />
      <Togglable buttonLabel="create new blog">
        <CreateBlogs notificationDispatch={notificationDispatch} />
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
