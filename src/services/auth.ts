import axios from 'axios';

axios.defaults.timeout = 10000;
const service = axios.create({
  headers: {
    // Authorization: 'Bearer',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

const baseUrl: string = 'https://api.portal.coopersystem.com.br/api/v1';

function signIn() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'jk12h3j21h3jk212h3jk12h3jkh12j3kh12k123hh21g3f12f3',
        name: 'Thiago',
        email: 'thiagomarinho@rockeseat.com.br',
      });
    }, 2000);
  });
}

async function login(data: {username: string; password: string}) {
  try {
    const res = await service.post<any>(`${baseUrl}/auth`, data);
    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

function handler(err: any) {
  let error = err;
  if (err.response && err.response.data.hasOwnProperty('message')) {
    error = err.response.data;
  } else if (!err.hasOwnProperty('message')) {
    error = err.toJSON();
  }
  return new Error(error.message);
}

export {signIn, login, handler};
