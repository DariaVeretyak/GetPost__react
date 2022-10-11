import React from 'react';
import { Fade } from 'react-awesome-reveal';

export const SignUp: React.FC = () => {
  return (
    <div className="signUp">
      <section className="signUp__conteiner">
        <Fade>
          <h1 className="signUp__title">
            Test assignment for front-end developer
          </h1>
          <p className="signUp__content">
            What defines a good front-end developer is one that has skilled knowledge of HTML,
            CSS, JS with a vast understanding of User design thinking as they'll be building web
            interfaces with accessibility in mind.
            They should also be excited to learn, as the world of Front-End Development
            keeps evolving.
          </p>
          <a
            href='#postRequest'
            className="signUp__button"
          >
            Sign up
          </a>
        </Fade>
      </section>
    </div>
  );
};
