// Login.js
import { useState, useContext, useEffect } from 'react';
import AuthContext from './AuthProvider';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { auth, login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            navigate('/')
        }
    }, [auth, navigate])
    const handleSubmit = (event) => {
        event.preventDefault();
        login(email, password)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit} className='login-form shadow-2xl w-fit mt-12'>
            <h1>Gestor de eventos</h1>
            <label>
                <span className='label__email'>Email:</span>
                <input type="text" value={email} onChange={(e) => setemail(e.target.value)} placeholder=' ' />
            </label>
            <br />
            <label>
                <span className='label__password'>Password:</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=' ' />
            </label>
            <br />
            <div className="controls flex gap-4">
                <button type="submit">Login</button>
                <button onClick={(e) => { e.preventDefault(); navigate('/register') }}>Register</button>
            </div>
            {error && <p className='error p-1 mt-3 bg-red-400 border-2 overflow-hidden border-red-900 rounded font-semibold text-red-800 transition-all'>{error}</p>}
        </form>
    );
};
