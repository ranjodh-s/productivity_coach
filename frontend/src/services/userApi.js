import API from './api';

export const getUserInfo = () => API.get("/user/info");