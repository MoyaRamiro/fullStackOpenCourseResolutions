import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlicer = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return null;
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlicer.actions;

export const setNotification = (msg, time) => {
  return async (dispatch) => {
    dispatch(addNotification(msg));
    setTimeout(() => {
      dispatch(removeNotification());
    }, time*100);
  };
};

export default notificationSlicer.reducer;
