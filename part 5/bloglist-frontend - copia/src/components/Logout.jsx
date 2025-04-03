import { useDispatch, useSelector } from 'react-redux';
import {
  createNotification,
  removeNotification,
} from '../reducers/notification';
import { removeActiveUser } from '../reducers/user';
import { useNavigate } from 'react-router-dom';

const Logout = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(
      createNotification({
        msg: `${user.name} logout`,
        color: 'red',
      })
    );

    setTimeout(() => {
      dispatch(removeNotification());
      dispatch(removeActiveUser());
    }, 1000);

    navigate('/login');
  };

  return (
    <span>
      {user.name} logged in
      <span> </span>
      <button type='button' onClick={logout}>
        logout
      </button>
    </span>
  );
};

export default Logout;
