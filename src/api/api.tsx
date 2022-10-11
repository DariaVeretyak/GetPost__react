import { User } from '../types/User';

const BASE_URL
  = 'https://frontend-test-assignment-api.abz.agency/api/v1';

const request = (url: string) => fetch(`${BASE_URL}${url}`)
  .then(res => {
    if (!res.ok) {
      throw new Error('Something wrong...');
    }

    return res.json();
  });

export const getUsers = (url: string) => request(`/users${url}`);

export const getPositions = () => request('/positions');

export const postNewUser = async (user: User) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user,
    }),
  });

  return response.json();
};
