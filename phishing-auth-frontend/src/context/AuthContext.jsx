import { createContext, useContext, useEffect, useState } from 'react';

import {
    login as loginRequest,
    register as registerRequest,
    logout as logoutRequest,
    getUser,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await getUser();
                setUser(response.data.data ?? response.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuthentication();
    }, []);

    const login = async (credentials) => {
        const response = await loginRequest(credentials);
        setUser(response.data.user);
        return response;
    };

    const register = async (userData) => {
        return await registerRequest(userData);
    };

    const logout = async () => {
        await logoutRequest();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
