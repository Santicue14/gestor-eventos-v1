// App.js
import { Header } from './components/Header';
import { Inicio } from './components/Inicio';
import { Login } from './components/auth/Login';
import { Eventos } from './components/Eventos';
import { Register } from './components/auth/Register';

import { AuthProvider } from './components/auth/AuthProvider';
import PrivateRoute from './components/auth/PrivateRoute';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
    
    return (
        <AuthProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    {/*LOGIN & REGISTER*/ }
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />

                    {/*COMPONENTES PRIVADOS*/}
                    <Route path='/' element={<PrivateRoute element={Inicio} />} />
                    <Route path='/eventos' element={<PrivateRoute element={Eventos} />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
