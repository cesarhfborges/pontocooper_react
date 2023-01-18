import axios from 'axios';
import {enviroment} from './enviroment';
import {handler} from './handler';

axios.defaults.timeout = enviroment.timeout;
const service = axios.create({
  headers: {...enviroment.headers},
});

service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.log(error);
  },
);

async function login(data: {username: string; password: string}): Promise<any> {
  try {
    return await service.post<any>(`${enviroment.baseUrl}/auth`, data);
  } catch (e) {
    throw handler(e);
  }
}

export {login};
