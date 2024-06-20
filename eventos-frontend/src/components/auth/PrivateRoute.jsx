// PrivateRoute.js
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthProvider';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element: Element, ...rest }) => {
    const { auth } = useContext(AuthContext);

    return auth ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
