import React from 'react';
import { User } from '../../types/User';

type Props = {
  user: User;
};

export const Card: React.FC<Props> = ({ user }) => {
  return (
    <div className="card">
      <img
        src={user.photo}
        alt="user-photo"
        className="card__foto"
      />
      <p className="card__name">{user.name}</p>
      <div className="card__description">
        <p className="card__position">{user.position}</p>
        <a className="card__email" type="email" href={user.email}>{user.email}</a>
        <a className="card__phone" type="tel" href={user.phone}>{user.phone}</a>
      </div>
    </div>
  );
};
