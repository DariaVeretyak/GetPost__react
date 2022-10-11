import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api/api';
import { Card } from '../Card';
import { User } from '../../types/User';
import { Loader } from '../Loader/Loader';
import { Fade } from 'react-awesome-reveal';

export const GetRequest: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [countOnPage, setCountOnPage] = useState(6);
  const [usersLength, setUsersLength] = useState(0);
  const loadingUsers = () => {
    getUsers(`?page=1&count=${countOnPage}`).then(result => {
      setUsers(result.users);
    });
  };

  const loadingAllUsers = () => {
    getUsers('?page=1&count=100').then(result => {
      setUsersLength(result.users.length);
    });
  };

  const loadingMoreUsers = () => {
    getUsers(`?page=1&count=${countOnPage + 6}`).then(result => {
      setUsers(result.users);
    });
  };

  useEffect(() => {
    loadingUsers();
    loadingAllUsers();
  }, []);

  return (
    <div className="getRequest">
      {!users ? (
        <Loader />
      ) : (
        <>
          <Fade>
            <h1 className="getRequest__title">Working with GET request</h1>
            <ul
              className="getRequest__list"
              id="users"
            >
              {users.map(user => (
                <li
                  className="getRequest__item"
                  key={user.id}
                >
                  <Card user={user}/>
                </li>
              ))}
            </ul>
            <button
              className="getRequest__showMore"
              type="button"
              onClick={() => {
                setCountOnPage(prevState => prevState + 6);
                loadingMoreUsers();
              }}
              disabled={users.length === usersLength}
            >
              Show more
            </button>
          </Fade>
        </>
      )}
    </div>
  );
};
