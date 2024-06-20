// AuthContext.js
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(Cookies.get('token') || false);
    useEffect(() => {
        if (auth) {
            Cookies.set('token', auth, { expires: 1, secure: true })
        }
        else {
            Cookies.remove('token')
        }
    }, [auth])
    const login = async(email, password) => {
        return axios.post('http://127.0.0.1:3333/login', {
            email,
            password
        }).then(response => {
            setAuth(response.data.token);
            Cookies.set('token', auth, { expires: 1, secure: true })
        })
            .catch(error => {
                throw error.response.data
            })

    };
    const register = async(formData) =>{
        return axios.post('http://127.0.0.1:3333/crearUsuario', formData)
        .then( response =>{
            console.log(response.data);
        })
        .catch(error =>{
            throw error.response.data
        })
    }

    const logout = () => {
        setAuth(null);
        
        Cookies.remove('token');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
