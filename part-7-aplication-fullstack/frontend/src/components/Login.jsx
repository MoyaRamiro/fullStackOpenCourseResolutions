import { useState } from 'react';
import loginService from '../services/login';
import blogsService from '../services/blogs';
import { useDispatch } from 'react-redux';
import {
  createNotification,
  removeNotification,
} from '../reducers/notification';
import { addActiveUser } from '../reducers/user';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  InputField,
  LoginContainer,
  LoginForm,
} from '../styles/styledComponents';

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
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <h2>Log in to application</h2>
        <label> Username:</label>
        <Input
          data-testid='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
        <label> Password:</label>
        <Input
          data-testid='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type='submit'>login</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
