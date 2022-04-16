import axios from 'axios';

const instance = axios.create({
  baseURL: `http${process.env.NODE_ENV === 'production' ? 's' : ''}://${
    process.env.REACT_APP_IP_ADDRESS
  }:3000`
});

export default instance;
