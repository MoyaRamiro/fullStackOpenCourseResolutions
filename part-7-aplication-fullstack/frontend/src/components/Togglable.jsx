import { useState } from 'react';
import { Button, CancelButton } from '../styles/styledComponents';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={{ margin: '1rem' }}>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <br />
        <CancelButton onClick={toggleVisibility}>cancel</CancelButton>
      </div>
      <br />
    </div>
  );
};

Togglable.displayName = 'Togglable';

export default Togglable;
