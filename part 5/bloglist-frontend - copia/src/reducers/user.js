import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addActiveUser(state, action) {
      window.localStorage.setItem('loggedUser', JSON.stringify(action.payload));
      return action.payload;
    },
    removeActiveUser(state, action) {
      window.localStorage.removeItem('loggedUser');
      return null;
    },
    getActiveUser(state, action) {
      const loggedUser = window.localStorage.getItem('loggedUser');
      if (loggedUser) {
        blogService.setToken(loggedUser.token);
        return JSON.parse(loggedUser);
      } else {
        return null;
      }
    },
  },
});

export const { addActiveUser, removeActiveUser, getActiveUser } =
  userSlice.actions;
export default userSlice.reducer;
