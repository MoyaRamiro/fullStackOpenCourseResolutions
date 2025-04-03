import { useEffect, useState } from 'react';
import loginService from '../services/login';
import { Link, useMatch } from 'react-router-dom';

const Users = ({ users }) => {
  return (
    <div className='users'>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>

        <tbody align='left'>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}> {user.name}</Link> <br />
              </td>
              <td>
                {user.blogs.length} <br />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
    </div>
  );
};

export default Users;
