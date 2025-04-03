import {
  BlogCard,
  Page,
  StyledLink,
  TruncatedText,
} from '../styles/styledComponents';

const BlogList = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <Page className='blogs'>
      <h2 style={{ margin: '1rem' }}>Blogs</h2>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <BlogCard key={blog.id} style={blogStyle}>
            <StyledLink to={`blogs/${blog.id}`}>
              <TruncatedText>{blog.title}</TruncatedText>
            </StyledLink>
          </BlogCard>

          //<Blog key={blog.id} blog={blog} loggedUser={user.user} />
        ))}
      <br />
      <br />
    </Page>
  );
};

export default BlogList;
