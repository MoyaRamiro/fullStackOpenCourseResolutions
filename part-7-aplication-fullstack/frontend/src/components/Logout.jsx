import { useDispatch, useSelector } from 'react-redux';
import {
  createNotification,
  removeNotification,
} from '../reducers/notification';
import { removeActiveUser } from '../reducers/user';
import { useNavigate } from 'react-router-dom';
import { CancelButton } from '../styles/styledComponents';

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
    <>
      <b style={{ margin: '1rem' }}>{user.name} logged in</b>
      <CancelButton type='button' onClick={logout}>
        logout
      </CancelButton>
    </>
  );
};

export default Logout;
