import { createContext, useContext } from 'react';
import instance from '../middlewares/axios';

export const AuthContext = createContext(null);

export const useAuth = () => {
  const { setCurrentUser, setLoading } = useContext(AuthContext);

  const setUserContext = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('aggUser'));

      if (user && user.token) {
        const res = await instance(`/api/users/token?token=${user.token}`);

        setCurrentUser({ user: res.data.user, authed: true });
        setLoading(false);
      }
    } catch (e) {
      setCurrentUser({ user: {}, authed: false });
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await instance.post('/api/users/login', {
        email,
        password
      });

      localStorage.setItem(
        'aggUser',
        JSON.stringify({ ...res.data.data.user, token: res.data.token })
      );

      await setUserContext();
      // setCurrentUser({ user: res.data.data.user, authed: true });
      setLoading(false);

      return res;
    } catch (e) {
      await setUserContext();
      // setCurrentUser({ user: {}, authed: false });
      setLoading(false);

      return e.response;
    }
  };

  const logout = async () => {
    await instance('/api/users/logout');

    localStorage.removeItem('aggUser');
    await setUserContext();
    // setCurrentUser({ user: {}, authed: false });
  };

  const register = async (name, email, password, confirmPassword) => {
    try {
      const res = await instance.post('/api/users/signup', {
        name,
        email,
        password,
        confirmPassword
      });
      console.log('REGISTER', res.data);
      localStorage.setItem(
        'aggUser',
        JSON.stringify({ ...res.data.data.user, token: res.data.token })
      );

      await setUserContext();
      // setCurrentUser({ user: res.data.data.user, authed: true });
      setLoading(false);

      return res;
    } catch (e) {
      await setUserContext();
      // setCurrentUser({ user: {}, authed: false });
      setLoading(false);

      return e.response;
    }
  };

  return { login, logout, register };
};
