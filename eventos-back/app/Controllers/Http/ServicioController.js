'use strict'

const User = use('App/Models/User');
const Servicio = use('App/Models/Servicio');
const { validate } = use('Validator');

class ServicioController {

  async crearServicio({ request, response, auth }) {
    try {
      const usuario = await auth.getUser();

      if (usuario.id_rol !== 1) { // Verifica si el usuario tiene el rol permitido
        return response.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }

      const rules = {
        descripcion: 'required|string'
      };

      const validation = await validate(request.all(), rules);

      if (validation.fails()) {
        return response.status(400).json({ message: validation.messages() });
      }

      const data = request.only(['descripcion']);
      const servicio = await Servicio.create(data);

      return response.status(201).json(servicio);
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error al crear el servicio');
    }
  }

  async editarServicio({ params, request, response, auth }) {
    try {
      const usuario = await auth.getUser();

      if (usuario.id_rol !== 1) { // Verifica si el usuario tiene el rol permitido
        return response.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }

      const servicio = await Servicio.find(params.id);

      if (!servicio) {
        return response.status(404).json({ message: 'Servicio no encontrado' });
      }

      const rules = {
        descripcion: 'string'
      };

      const validation = await validate(request.all(), rules);

      if (validation.fails()) {
        return response.status(400).json({ message: validation.messages() });
      }

      const data = request.only(['descripcion']);
      servicio.merge(data);
      await servicio.save();

      return response.json(servicio);
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error al actualizar el servicio');
    }
  }

  async eliminarServicio({ params, response, auth }) {
    try {
      const usuario = await auth.getUser();

      if (usuario.id_rol !== 1) { // Verifica si el usuario tiene el rol permitido
        return response.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }

      const servicio = await Servicio.find(params.id);

      if (!servicio) {
        return response.status(404).json({ message: 'Servicio no encontrado' });
      }

      await servicio.delete();

      return response.json({ message: 'Servicio eliminado correctamente' });
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error al eliminar el servicio');
    }
  }

  async listarServicio({ request, response, auth }) {
    try {
      const usuario = await auth.getUser();

      if (usuario.id_rol !== 1) { // Verifica si el usuario tiene el rol permitido
        return response.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }

      const { page = 1, limit = 10 } = request.get();
      const servicios = await Servicio.query().paginate(page, limit);

      return response.json(servicios);
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error al listar los servicios');
    }
  }

  async detalleServicio({ params, response, auth }) {
    try {
      const usuario = await auth.getUser();

      if (usuario.id_rol !== 1) { // Verifica si el usuario tiene el rol permitido
        return response.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }

      const servicio = await Servicio.find(params.id);

      if (!servicio) {
        return response.status(404).json({ message: 'Servicio no encontrado' });
      }

      return response.json(servicio);
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error al obtener los detalles del servicio');
    }
  }

  async buscarServicio({ request, response, auth }) {
    try {
      const usuario = await auth.getUser();

      if (usuario.id_rol !== 1) { // Verifica si el usuario tiene el rol permitido
        return response.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }

      const { descripcion } = request.get();
      const servicios = await Servicio.query()
        .where('descripcion', 'LIKE', `%${descripcion}%`)
        .fetch();

      return response.json(servicios);
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error al buscar los servicios');
    }
  }

}

module.exports = ServicioController;
