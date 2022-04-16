import { useState, useEffect } from 'react';
import instance from '../middlewares/axios';

export default function useFindUser() {
  const [currentUser, setCurrentUser] = useState({ user: {}, authed: false });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const findUser = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('aggUser'));

        if (user && user.token) {
          const res = await instance(`/api/users/token?token=${user.token}`);

          localStorage.setItem('aggUser', JSON.stringify({ ...res.data.user, token: user.token }));
          setCurrentUser({ user: res.data.user, authed: true });
        }
      } catch (e) {
        setCurrentUser({ user: {}, authed: false });
        setLoading(false);
      }

      setLoading(false);
    };

    findUser();
  }, []);

  return {
    currentUser,
    setCurrentUser,
    isLoading,
    setLoading
  };
}
