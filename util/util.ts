import axios from 'axios';
import { getRefreshExpiryMs, getSessionExpiryMs, getSessionToken, isLoggedIn, login, logOut } from '../store/slice/auth';
import Router from 'next/router';
import { store } from '../store/store';

const client = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
});

const protectedRoutes = ['/user'];

class LoginError extends Error {
  constructor() {
    super('User not logged in');
  }
}

function refreshSession() {
  return client.get('/auth/refresh').then(res => {
    alert('refresh token');
    store.dispatch(login(res.data.payload));
  }).catch(err => {
    if (axios.isAxiosError(err)) {
      let code = err.response?.data.code;
      if (code === 'auth_refresh_failed') {
        throw new LoginError();
      }
    }
    throw err;
  });  
}

client.interceptors.request.use(async req => {
  try {
    if (!protectedRoutes.includes(req.url || '')) {
      return req;
    }
    let loggedIn = isLoggedIn(store.getState());
    if (loggedIn) {
      let sessionExpiry = getSessionExpiryMs(store.getState());
      let refreshExpiry = getRefreshExpiryMs(store.getState());
      let currentTime = Date.now();
      if (sessionExpiry < currentTime && currentTime < refreshExpiry) {
        await refreshSession();
      } else if (sessionExpiry < currentTime && refreshExpiry < currentTime) {
        throw new LoginError();
      }
      let sessionToken = getSessionToken(store.getState());
      req.headers = {'Authorization' : `Bearer ${sessionToken}`};
      return req;
    }
    throw new LoginError();
  } catch (err) {
    if (err instanceof LoginError) {
      alert('You are no longer logged in');
      store.dispatch(logOut());
      Router.push('/login');
      return {
        ...req,
        cancelToken: new axios.CancelToken(cancel => cancel('Request cancelled'))
      };
    }
    throw err;
  }
});

export { client } ;