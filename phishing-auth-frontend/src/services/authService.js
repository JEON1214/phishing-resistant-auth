import api from './api';

export const getCsrfCookie = () => {
    return api.get('/sanctum/csrf-cookie');
};

export const register = async (userData) => {
    await getCsrfCookie();
    return api.post('/api/register', userData);
};

export const login = async (credentials) => {
    await getCsrfCookie();
    return api.post('/api/login', credentials);
};

export const getUser = () => {
    return api.get('/api/user');
};

export const logout = async () => {
    await getCsrfCookie();
    return api.post('/api/logout');
};