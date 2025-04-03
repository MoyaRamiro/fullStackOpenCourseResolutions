/* eslint-disable indent */

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return action.payload;
    case "REM":
      return null;
  }
};

/*const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};*/

export default notificationReducer;
