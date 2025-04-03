import React from 'react';
import {
  UserContainer,
  UserHeader,
  UserSubheading,
  BlogList,
  BlogListItem,
} from '../styles/styledComponents';

const User = ({ user }) => {
  if (!user) return null;

  return (
    <UserContainer>
      <UserHeader>{user.name}</UserHeader>
      <UserSubheading>Added Blogs</UserSubheading>

      <BlogList>
        {user.blogs.length !== 0 ? (
          user.blogs.map((blog) => (
            <BlogListItem key={blog.id}>{blog.title}</BlogListItem>
          ))
        ) : (
          <b style={{ color: 'white' }}>
            No existen blogs agregados por {user.name} ....
          </b>
        )}
      </BlogList>
    </UserContainer>
  );
};

export default User;
