import React, { useState } from 'react';
import classNames from 'classnames';
import { Header } from './components/Header';
import { SignUp } from './components/SignUp';
import { GetRequest } from './components/GetRequest';
import { PostRequest } from './components/PostRequest';

import './style/App.scss';

const App = () => {
  const [scrollBtnActive, setScrollBtnActive] = useState(false);

  const checkScrollTop = () => {
    if (!scrollBtnActive && window.pageYOffset > 400) {
      setScrollBtnActive(true);
    } else if (scrollBtnActive && window.pageYOffset <= 400) {
      setScrollBtnActive(false);
    }
  };

  window.addEventListener('scroll', checkScrollTop);

  return (
    <div className="app">
      <Header />
      <SignUp />
      <main className="app__content">
        <GetRequest />
        <PostRequest />
        <button
          type="button"
          className={classNames('app__scrollToTop', { 'app__scrollToTop--active': scrollBtnActive })}
          onClick={() => window.scrollTo(0, 0)}
        >
        </button>
      </main>
    </div>
  );
};

export default App;
