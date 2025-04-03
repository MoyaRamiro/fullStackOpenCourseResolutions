import { useState } from "react";
import loginService from "../services/login";
import blogsService from "../services/blogs";
import PropTypes from "prop-types";

const Login = ({ setUser, setNewMsg }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);

      blogsService.setToken(user.token);
      setNewMsg({ msg: `loggin in with ${user.name}`, color: "green" });
      setTimeout(() => setNewMsg({ color: "", msg: "" }), 3000);

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setUsername("");
      setPassword("");
    } catch (exception) {
      setNewMsg({ msg: "wrong username or password", color: "red" });
      setTimeout(() => setNewMsg({ color: "", msg: "" }), 3000);
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
  setUser: PropTypes.func.isRequired,
  setNewMsg: PropTypes.func.isRequired,
};

export default Login;
