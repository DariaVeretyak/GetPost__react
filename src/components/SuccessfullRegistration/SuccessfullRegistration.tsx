import React from 'react';
import { Slide } from 'react-awesome-reveal';

export const SuccessfullRegistration: React.FC = () => {
  return (
    <Slide cascade>
      <div className="successfullRegistration">
        <h1 className="successfullRegistration__title">
          User successfully registered
        </h1>
        <div className="successfullRegistration__img" />
      </div>
    </Slide>
  );
};
