import { Link } from 'react-router-dom';
import Logout from './Logout';
import { Navigation } from '../styles/styledComponents';

const Menu = ({ loggedUser }) => {
  const menuStyle = {
    backgroundColor: 'rgba(110, 27, 27, 0.2)',
    padding: '10px',
    fontSize: '18px',
  };
  return (
    <Navigation style={menuStyle}>
      <Link to='/users'>USERS</Link>
      <span> </span>
      <Link to={'/'}>BLOGS</Link>
      <span> </span>
      <Logout user={loggedUser} />
    </Navigation>
  );
};

export default Menu;
