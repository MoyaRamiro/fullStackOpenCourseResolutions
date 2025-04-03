import { useEffect, useState } from 'react';
import loginService from '../services/login';
import { Link, useMatch } from 'react-router-dom';
import {
  Page,
  StyledLink,
  StyledTable,
  TableData,
  TableHeader,
  TableRow,
  TableWrapper,
} from '../styles/styledComponents';

const Users = ({ users }) => {
  return (
    <Page className='users'>
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <TableHeader>
                {' '}
                <h1>Users</h1>
              </TableHeader>
              <TableHeader>Blogs created</TableHeader>
            </tr>
          </thead>

          <tbody align='left'>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableData>
                  <StyledLink to={`/users/${user.id}`}> {user.name}</StyledLink>{' '}
                  <br />
                </TableData>
                <td>
                  {user.blogs.length} <br />
                </td>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
        <br />
        <br />
      </TableWrapper>
    </Page>
  );
};

export default Users;
