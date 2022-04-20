import axios from 'axios';

const instance = axios.create({
  baseURL: `http${process.env.NODE_ENV === 'production' ? 's' : ''}://${
    process.env.REACT_APP_IP_ADDRESS
  }`
});

instance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('aggUser'));
  config.headers.Authorization = user && user.token ? `Bearer ${user.token}` : '';

  return config;
});

export default instance;
