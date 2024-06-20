import axios from 'axios';
import { useContext, useState } from 'react';
import { CargarEventoModal } from './modals/CargarEventoModal';
import AuthContext from './auth/AuthProvider';
export const Eventos = () => {
    const { auth } = useContext(AuthContext)

    const [openModal, setOpenModal] = useState(false)
    const handleOpenModal = (e) => {
        e.preventDefault();
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const createTypeEvent = async (tipo) => {
        return axios.post('http://127.0.0.1:3333/crearTipoEvento', { descripcion: tipo },
            {
                headers: {
                    Authorization: `Bearer ${auth}`
                }
            }
        )
            .catch(error => {
                alert(error.response.data);
                throw error.response.data;
            });
    };

    return (
        <div>
            <button
                className="max-w-28 mt-4 mx-auto items-center flex font-bold bg-slate-200 absolute h-fit rounded-full p-4 right-12 bottom-12"
                onClick={handleOpenModal}
            >
                +
            </button>
            <table className="events-list">
                <thead>
                    <tr>
                        <th>Tipo Evento</th>
                        <th>Cliente</th>
                        <th>Servicios</th>
                        <th>Fecha inicio</th>
                        <th>Fecha fin</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Fiesta de 15</td>
                        <td>Maximo Paz</td>
                        <td>
                            <ul>
                                <li>Catering</li>
                                <li>Muñeco led</li>
                            </ul>
                        </td>
                        <td>15/03/2025 18:00</td>
                        <td>15/03/2025 23:00</td>
                    </tr>
                    <tr>
                        <td>Fiesta de 15</td>
                        <td>Maximo Paz</td>
                        <td>
                            <ul>
                                <li>Catering</li>
                                <li>Muñeco led</li>
                            </ul>
                        </td>
                        <td>15/03/2025 18:00</td>
                        <td>15/03/2025 23:00</td>
                    </tr>
                </tbody>
            </table>
            <CargarEventoModal isOpen={openModal} onClose={handleCloseModal} onCreate={createTypeEvent} />
        </div>
    );
};
