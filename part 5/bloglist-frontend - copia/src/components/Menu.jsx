import { Link } from 'react-router-dom';
import Logout from './Logout';

const Menu = ({ loggedUser }) => {
  const menuStyle = {
    backgroundColor: 'rgba(110, 27, 27, 0.2)',
    padding: '10px',
    fontSize: '18px',
  };
  return (
    <div style={menuStyle}>
      <Link to='/users'>USERS</Link>
      <span> </span>
      <Link to={'/'}>BLOGS</Link>
      <span> </span>
      <Logout user={loggedUser} />
    </div>
  );
};

export default Menu;
