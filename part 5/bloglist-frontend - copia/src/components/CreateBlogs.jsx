import { useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  createNotification,
  removeNotification,
} from '../reducers/notification';
import { addBlog } from '../reducers/blog';

const CreateBlogs = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();

    const isBlogCreated = await dispatch(
      addBlog({ title: title, author: author, url: url })
    );

    if (isBlogCreated) {
      dispatch(
        createNotification({
          msg: `a new blog ${title} by ${author} added`,
          color: 'green',
        })
      );

      setTimeout(
        () => {
          dispatch(removeNotification());
        },

        5000
      );
    } else {
      dispatch(
        createNotification({
          msg: `ERROR TO CREATE`,
          color: 'red',
        })
      );

      setTimeout(
        () => {
          dispatch(removeNotification());
        },

        5000
      );
    }

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h2>create new</h2>

      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            data-testid='title'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            data-testid='author'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            data-testid='url'
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  );
};

export default CreateBlogs;
