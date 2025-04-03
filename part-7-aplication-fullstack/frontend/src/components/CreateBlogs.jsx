import { useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  createNotification,
  removeNotification,
} from '../reducers/notification';
import { addBlog } from '../reducers/blog';
import {
  Input,
  Button,
  TitleInput,
  CreateBlogContainer,
} from '../styles/styledComponents';

const CreateBlogs = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();

    if (title === '' || author === '' || url === '') {
      dispatch(
        createNotification({
          msg: 'incomplete data',
          color: 'red',
        })
      );

      setTimeout(
        () => {
          dispatch(removeNotification());
        },

        5000
      );
      return;
    }

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
    <CreateBlogContainer>
      <h2 style={{ paddingBottom: '0.5rem' }}>Create new</h2>

      <form onSubmit={handleCreate}>
        <div>
          <TitleInput style={{ paddingRight: '1rem' }}>Title:</TitleInput>
          <Input
            data-testid='title'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TitleInput>Author: </TitleInput>
          <Input
            data-testid='author'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TitleInput style={{ paddingRight: '1.7rem' }}>Url:</TitleInput>
          <Input
            data-testid='url'
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button type='submit'>create</Button>
      </form>
    </CreateBlogContainer>
  );
};

export default CreateBlogs;
