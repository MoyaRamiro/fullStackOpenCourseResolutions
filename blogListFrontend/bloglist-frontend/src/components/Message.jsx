const Message = ({ message, color }) => (
  <h4
    style={{
      color: `${color}`,
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
    }}
    className="msgCartel"
  >
    {message}
  </h4>
)

export default Message
