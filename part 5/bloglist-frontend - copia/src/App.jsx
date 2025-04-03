import { useEffect, useState } from 'react';
import loginService from './services/login';
import Login from './components/Login';
import CreateBlogs from './components/CreateBlogs';
import Message from './components/Message';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blog';
import BlogList from './components/BlogList';
import { getActiveUser } from './reducers/user';
import Users from './components/Users';
import Logout from './components/Logout';
import { Link, Route, Routes, useMatch } from 'react-router-dom';
import User from './components/User';
import Blog from './components/Blog';
import Menu from './components/Menu';

const App = () => {
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const loggedUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  async function fetchData() {
    const response = await loginService.getAllUsers();
    setUsers(response);
  }

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(getActiveUser());
    fetchData();
  }, [dispatch]);

  const matchForUser = useMatch('/users/:id');
  const userMatch = matchForUser
    ? users.find((user) => user.id === matchForUser.params.id)
    : null;

  if (loggedUser === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        {notification && (
          <Message message={notification.msg} color={notification.color} />
        )}

        <Login />
      </div>
    );
  }

  return (
    <div>
      <Menu loggedUser={loggedUser} />

      <h2>blogs</h2>

      {notification && (
        <Message message={notification.msg} color={notification.color} />
      )}

      <Togglable buttonLabel='create new blog'>
        <CreateBlogs />
      </Togglable>

      <Routes>
        <Route path={'/'} element={<BlogList blogs={blogs} />} />
        <Route path={'/blogs'} element={<BlogList blogs={blogs} />} />
        <Route path={'/blogs/:id'} element={<Blog loggedUser={loggedUser} />} />
        <Route path={'/users'} element={<Users users={users} />} />
        <Route
          path={'/users/:id'}
          element={<User user={userMatch} loggedUser={loggedUser} />}
        />
        <Route path={'/login'} element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
