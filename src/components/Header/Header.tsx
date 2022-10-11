import React from 'react';
import logo from '../../images/Logo.svg';

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header__conteiner">
        <img
          src={logo}
          alt="logo"
          className="header__logo"
        />
        <div className="header__buttons">
          <a
            href="#users"
            className="header__button"
          >
            Users
          </a>
          <a
            href="#postRequest"
            className="header__button"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};
