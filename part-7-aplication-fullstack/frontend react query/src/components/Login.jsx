import { useState } from "react";
import loginService from "../services/login";
import blogsService from "../services/blogs";
import PropTypes from "prop-types";

const Login = ({ userDispatch, notificationDispatch }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      blogsService.setToken(user.token);

      userDispatch({
        type: "SetLoggedUser",
        payload: user,
      });

      notificationDispatch({
        type: "ADD",
        payload: {
          msg: `loggin in with ${user.name}`,
          color: "green",
        },
      });
      setTimeout(() => notificationDispatch({ type: "REM" }), 3000);

      setUsername("");
      setPassword("");
    } catch (exception) {
      notificationDispatch({
        type: "ADD",
        payload: {
          msg: "wrong username or password",
          color: "red",
        },
      });

      setTimeout(() => notificationDispatch({ type: "REM" }), 3000);
      console.log(exception);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

Login.propTypes = {
  userDispatch: PropTypes.func.isRequired,
  notificationDispatch: PropTypes.func.isRequired,
};

export default Login;
