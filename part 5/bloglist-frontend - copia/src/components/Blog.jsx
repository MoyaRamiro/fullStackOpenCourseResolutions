import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, updateBlog, addComment } from '../reducers/blog';
import { useMatch, useNavigate } from 'react-router-dom';

const Blog = ({ loggedUser }) => {
  const blogs = useSelector((state) => state.blogs);

  const matchForBlog = useMatch('/blogs/:id');
  const blog = matchForBlog
    ? blogs.find((blog) => blog.id === matchForBlog.params.id)
    : null;

  const removeButtonStyle = {
    backgroundColor: '#4682B4',
    border: 'none',
    borderRadius: '8px',
    padding: '0.4rem 0.6rem',
    margin: '0.2rem',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  };

  const [likes, setLikes] = useState(blog ? blog.likes : 0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (blog) {
      setLikes(blog.likes);
    }
  }, [blog]);

  const increaseLikes = () => {
    if (!blog) return;

    const newLikes = likes + 1;
    setLikes(newLikes);

    const newBlog = {
      author: blog.author,
      id: blog.id,
      likes: newLikes,
      title: blog.title,
      url: blog.url,
      user: blog.user,
    };

    dispatch(updateBlog(newBlog));
  };

  const removeBlog = () => {
    const userConfirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );

    if (userConfirmed) {
      dispatch(deleteBlog(blog.id));
      navigate('/');
      window.location.reload();
    }
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    dispatch(addComment(comment, blog.id));
    setComment('');
  };

  /*console.log(`usuario del blog ${blog.title}`);
  console.log(blog.user);*/

  if (!blog) {
    return <p>Blog not found...</p>;
  }

  return (
    <div className='blog'>
      <h2>
        {blog.title} {blog.author} <br />
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      likes {blog ? likes : 'Loading...'}
      <button type='button' onClick={increaseLikes}>
        like
      </button>
      <br />
      {blog?.user?.name}
      <br />
      <div>
        {loggedUser.username === blog.user.username && (
          <button type='button' style={removeButtonStyle} onClick={removeBlog}>
            remove
          </button>
        )}
      </div>
      <div>
        <h2>comments</h2>
        <form onSubmit={handleCommentSubmit}>
          <input
            type='text'
            placeholder='comment...'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          ></input>
          <button type='submit'>add comment</button>
        </form>

        <ul>
          {blog?.comments?.map((comment) => (
            <li key={comment._id}>{comment.comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
