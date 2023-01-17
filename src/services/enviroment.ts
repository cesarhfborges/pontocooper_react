interface Env {
  baseUrl: string;
  headers: any;
  timeout: number;
}

const enviroment: Env = {
  baseUrl: 'https://api.portal.coopersystem.com.br/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: 5000,
};

export {enviroment};
