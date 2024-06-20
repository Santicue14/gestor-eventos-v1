'use strict'

const User = use('App/Models/User');
const TipoEvento = use('App/Models/TipoEvento');

class TipoEventoController {
    
  async crearTipoEvento({ request, response, auth }) {
    try {
      const usuario = await auth.getUser();
      if (usuario.id_rol !== 1) { // Verifica si el usuario tiene el rol permitido
        return response.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }

      const data = request.only(['descripcion']);
      const tipoEvento = await TipoEvento.create(data);

      return response.status(201).json(tipoEvento);
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error al crear el tipo de evento');
    }
  }

  async editarTipoEvento({ params, request, response, auth }) {
    try {
      const usuario = await auth.getUser();

      if (usuario.id_rol !== 1) { // Verifica si el usuario tiene el rol permitido
        return response.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }

      const tipoEvento = await TipoEvento.find(params.id);

      if (!tipoEvento) {
        return response.status(404).json({ message: 'Tipo de evento no encontrado' });
      }

      const data = request.only(['descripcion']);
      tipoEvento.merge(data);
      await tipoEvento.save();

      return response.json(tipoEvento);
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error al actualizar el tipo de evento');
    }
  }

  async eliminarTipoEvento({ params, response, auth }) {
    try {
      const usuario = await auth.getUser();

      if (usuario.id_rol !== 1) { // Verifica si el usuario tiene el rol permitido
        return response.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }

      const tipoEvento = await TipoEvento.find(params.id);

      if (!tipoEvento) {
        return response.status(404).json({ message: 'Tipo de evento no encontrado' });
      }

      await tipoEvento.delete();

      return response.json({ message: 'Tipo de evento eliminado correctamente' });
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error al eliminar el tipo de evento');
    }
  }

  async listarTipoEvento({ response, auth }) {
    try {
      const usuario = await auth.getUser();

      if (usuario.id_rol !== 1) { // Verifica si el usuario tiene el rol permitido
        return response.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }

      const tipoEventos = await TipoEvento.all();

      return response.json(tipoEventos);
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error al listar los tipos de eventos');
    }
  }

  async detalleTipoEvento({ params, response, auth }) {
    try {
      const usuario = await auth.getUser();

      if (usuario.id_rol !== 1) { // Verifica si el usuario tiene el rol permitido
        return response.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }

      const tipoEvento = await TipoEvento.find(params.id);

      if (!tipoEvento) {
        return response.status(404).json({ message: 'Tipo de evento no encontrado' });
      }

      return response.json(tipoEvento);
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error al obtener los detalles del tipo de evento');
    }
  }

}

module.exports = TipoEventoController;
