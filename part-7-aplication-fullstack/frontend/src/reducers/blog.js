import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogsSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    replaceBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },
    filterBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
  },
});

export const { setBlogs, appendBlog, replaceBlog, filterBlog } =
  blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(appendBlog(newBlog));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.update(blog.id, blog);
    dispatch(replaceBlog(newBlog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(filterBlog(id));
  };
};

export const addComment = (comment, id) => {
  return async (dispatch) => {
    const newBlog = await blogService.addComment(comment, id);
    dispatch(replaceBlog(newBlog));
  };
};

export default blogsSlice.reducer;
