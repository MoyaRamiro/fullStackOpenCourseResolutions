import { useState } from 'react';
import loginService from '../services/login';
import blogsService from '../services/blogs';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  createNotification,
  removeNotification,
} from '../reducers/notification';
import { addActiveUser } from '../reducers/user';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      blogsService.setToken(user.token);
      dispatch(addActiveUser(user));

      dispatch(
        createNotification({
          msg: `loggin in with ${user.name}`,
          color: 'green',
        })
      );
      setTimeout(() => dispatch(removeNotification()), 3000);

      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(
        createNotification({ msg: 'wrong username or password', color: 'red' })
      );
      setTimeout(() => dispatch(removeNotification()), 3000);
      console.log(exception);
    }
    navigate('/');
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  );
};

export default Login;
