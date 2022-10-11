import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { Fade } from 'react-awesome-reveal';
import { getPositions, postNewUser } from '../../api/api';
import { Loader } from '../Loader';
import { SuccessfullRegistration } from '../SuccessfullRegistration';

export const PostRequest = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  // #region positions
  const [positions, setPositions] = useState([]);
  const [userPosition, setUserPosition] = useState('');
  const loadingPositions = () => {
    getPositions().then(result => {
      setPositions(result.positions);
    });
  };
  // #endregion

  const [photoAdded, setPhotoAdded] = useState('Upload your photo');
  const [photo, setPhoto] = useState('');
  const [registration, setRegistration] = useState(false);

  const addUser = () => {
    if (positions.length > 0 && userPosition) {
      let positionId = 0;

      for (let i = 0; i < positions.length; i++) {
        if (positions[i].name === userPosition) {
          positionId = positions[i].id;
        }
      }

      const newUser = {
        name: getValues('name'),
        email: getValues('email'),
        phone: getValues('phone'),
        position: userPosition,
        position_id: positionId,
        id: +new Date(),
        photo,
      };

      postNewUser(newUser);

      reset();
      setPhotoAdded('Upload your photo');
      setRegistration(true);

      setTimeout(() => {
        setRegistration(false);
      }, 4000);
    }
  };

  const onSubmit = () => {
    addUser();
  };

  const onChange = (e) => {
    const file = e.target.files[0];

    setPhotoAdded(file.name);
    const obFile = new FileReader();

    obFile.readAsDataURL(file);
    obFile.onload = (ev) => {
      const formData = ev.target.result;

      setPhoto(formData);
    };
  };

  useEffect(() => {
    loadingPositions();
  }, []);

  useEffect(() => {
    for (let i = 0; i < positions.length; i++) {
      setUserPosition(positions[0].name);
    }
  }, [positions]);

  return (
    <div className="postRequest" id="postRequest">
      {!positions ? (
        <Loader />
      ) : (
        <>
          {!registration ? (
            <Fade>
              <h1 className="postRequest__title">Working with POST request</h1>
              <form className="postRequest__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="postRequest__formEl">
                  <label className="postRequest__label">
                    <input
                      type="text"
                      className="postRequest__input"
                      {...register('name', {
                        required: 'Field is mandatory',
                        minLength: {
                          value: 2,
                          message: 'The minimum number of characters in the name is 2',
                        },
                        pattern: {
                          value: /^^(?!.*(.)\1{3,})(?=.*[а-яА-ЯёЁa-zA-Z])[а-яА-ЯёЁa-zA-Z\d](\s*[а-яА-ЯёЁa-zA-Z\d])+$/,
                          message: 'Please enter valid name',
                        },
                      })}
                      placeholder="Your name"
                    />
                  </label>
                  <div className="postRequest__errorBlock">
                    {errors?.name && (
                      errors?.name.message
                    )}
                  </div>
                </div>

                <div className="postRequest__formEl">
                  <label className="postRequest__label">
                    <input
                      className="postRequest__input"
                      type="email"
                      placeholder="Email"
                      {...register('email', {
                        required: 'Field is mandatory',
                        pattern: {
                          value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                          message: 'Please enter valid email',
                        },
                      })}
                    />
                  </label>
                  <div className="postRequest__errorBlock">
                    {errors?.email && (
                      errors?.email.message
                    )}
                  </div>
                </div>

                <div className="postRequest__formEl">
                  <label className="postRequest__label">
                    <input
                      className="postRequest__input"
                      type="tel"
                      placeholder="Phone"
                      {...register('phone', {
                        required: 'Field is mandatory',
                        pattern: {
                          value: /^\+\d{2} \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                          message: 'Please enter valid phone',
                        },
                        minLength: {
                          value: 19,
                          message: 'Invalid recording format',
                        },
                      })}
                    />
                    <div className="postRequest__errorBlock">
                      {errors?.phone ? (
                        errors?.phone.message
                      ) : (
                        <p className="postRequest__comment">
                          +38 (XXX) XXX - XX - XX
                        </p>
                      )}
                    </div>
                  </label>
                </div>

                <div className="postRequest__select">
                  <p className="postRequest__selectTitle">Select your position</p>
                  {positions.map((position) => (
                    <li
                      className="postRequest__item"
                      key={position.id}
                    >
                      <label className="postRequest__radioButton">
                        <input
                          className="postRequest__radio"
                          type="radio"
                          name="position"
                          value={userPosition}
                          checked={userPosition === position.name}
                          onChange={() => {
                            setUserPosition(position.name);
                          }}
                        />
                        {position.name}
                      </label>
                    </li>
                  ))}
                </div>

                <div className="postRequest__formEl">
                  <div className="postRequest__upload">
                    <label className="postRequest__uploadLabel">
                      Upload
                      <input
                        className="postRequest__uploadInput"
                        type="file"
                        name="photo"
                        onChange={(e) => onChange(e)}
                      />
                    </label>
                    <span className={
                      classNames('postRequest__uploadUrl',
                        { 'postRequest__uploadUrl--photo': photoAdded !== 'Upload your photo' },
                      )
                    }
                    >
                      {photoAdded}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="postRequest__signUp"
                  disabled={!isValid}
                >
                  Sign up
                </button>
              </form>
            </Fade>
          ) : (
            <SuccessfullRegistration />
          )}
        </>
      )}
    </div>
  );
};
