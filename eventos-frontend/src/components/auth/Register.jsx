import { useContext, useState, useEffect } from "react";
import AuthContext from './AuthProvider'
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [dni, setDni] = useState("");
    const [celular, setCelular] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { auth, register } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (auth) {
            navigate('/')
        }
    }, [auth, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("apellido", apellido);
        formData.append("dni", dni);
        formData.append("celular", celular);
        formData.append("email", email);
        formData.append("password", password);
        await register(formData)
            .then(setLoading(true))
            .then(() => {
                setLoading(false)
                navigate('/login')
            })
            .catch((err) => {
                setLoading(false)
                setError(err.message)
            })

    };
    if (loading)
        return (
            <div className="text-black flex flex-col mx-auto items-center text-center shadow-none">
                <iframe src="https://giphy.com/embed/KG4PMQ0jyimywxNt8i" width="480" height="480" className="giphy-embed" allowFullScreen></iframe>
                <p>Cargando</p>
            </div>)
    return (
        <form id="myForm" onSubmit={handleSubmit} className="mt-4 md:max-h-[80dvh] md:w-[1000px] md:grid md:grid-cols-3 md:gap-2">
            <h1 className="">Registrar usuario</h1>
            <label htmlFor="nombre">
                <span>Nombre:</span>
                <input type="text" id="nombre" required name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </label>
            <label htmlFor="apellido">
                <span>Apellido:</span>
                <input type="text" id="apellido" required name="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            </label>
            <label htmlFor="dni">
                <span>DNI:</span>
                <input type="number" id="dni" required name="dni" maxLength="9" value={dni} onChange={(e) => setDni(e.target.value)} />
            </label>
            <label htmlFor="celular">
                <span>Celular:</span>
                <input type="text" id="celular" required name="celular" value={celular} onChange={(e) => setCelular(e.target.value)} />
            </label>
            <label htmlFor="email">
                <span>Email:</span>
                <input type="email" id="email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label htmlFor="password">
                <span>Contraseña:</span>
                <input type="password" id="password" required name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Registrarse</button>
            {
                error != '' &&
                <div className="error bg-red-300 p-1 border border-red-900 rounded-md">
                    <p>{error}</p>
                </div>
            }
        </form>
    );
};
