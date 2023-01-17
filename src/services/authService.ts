import axios from 'axios';
import {enviroment} from './enviroment';
import {handler} from './handler';

axios.defaults.timeout = enviroment.timeout;
const service = axios.create({
  headers: {...enviroment.headers},
});

async function login(data: {username: string; password: string}) {
  try {
    const res = await service.post<any>(`${enviroment.baseUrl}/auth`, data);
    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

export {login};
