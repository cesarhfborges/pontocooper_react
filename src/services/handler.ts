function handler(err: any) {
  let error = err;
  if (err.response && err.response.data.hasOwnProperty('message')) {
    error = err.response.data;
  } else if (!err.hasOwnProperty('message')) {
    error = err.toJSON();
  }
  return new Error(error.message);
}

export {handler};
