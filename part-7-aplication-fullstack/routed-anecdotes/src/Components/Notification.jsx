const Notification = ({ msg }) => {
  const notificationStyle = {
    display: msg === "" ? "none" : "block",
  };

  return <div style={notificationStyle}>{msg}</div>;
};

export default Notification;
