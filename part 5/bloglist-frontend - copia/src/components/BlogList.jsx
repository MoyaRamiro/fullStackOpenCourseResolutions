import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className='blogs'>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
          </div>

          //<Blog key={blog.id} blog={blog} loggedUser={user.user} />
        ))}
      <br />
      <br />
    </div>
  );
};

export default BlogList;
