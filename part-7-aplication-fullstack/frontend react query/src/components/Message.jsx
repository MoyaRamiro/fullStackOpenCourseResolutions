const Message = ({ notification }) => {
  if (!notification) return null;

  return (
    <h4
      style={{
        color: `${notification.color}`,
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
      }}
      className="msgCartel"
    >
      {notification.msg}
    </h4>
  );
};

export default Message;
