'use strict'
const User = use('App/Models/User');
const Hash = use('Hash');
const jwt = require('jsonwebtoken');
const Env = use('Env');


class UserController {

  //recibir del front 'nombre', 'apellido', 'dni', 'celular', 'email', 'password', 'id_rol (numeros)' 
  //POST
  async registrar({ request, response }) {
    try {
      let userData = request.only(['nombre', 'apellido', 'dni', 'celular', 'email', 'password', 'id_rol']);

      const mailExist = await User.findBy('email', userData.email)
      const dniExist = await User.findBy('dni', userData.dni)

      if (mailExist != null) {
        const mensajeExist = 'el mail ya se encuentra registrado'
        return response.status(400).json({ message: mensajeExist });
      }

      if (dniExist != null) {
        const mensajeDniExist = 'el dni ya se encuentra registrado'
        return response.status(400).json({ message: mensajeDniExist });
      }

      // Hashear la contraseña antes de almacenarla
      userData.password = await Hash.make(userData.password);
      userData.id_rol = 3
      let usuario = await User.create(userData);

      const estado = true

      return response.status(201).json(usuario, estado);

    } catch (error) {
      console.error(error);
      return response.status(500).send('Error al registrar el usuario');
    }
  }

  //recibir del front email y password
  //POST
  async login({ request, response, auth }) {
    try {
      const { email, password } = request.all();

      if (!email || !password) {
        return response.status(400).send('Faltan datos');
      }

      // Buscar el usuario por email en la tabla de usuarios (aquí debes adaptarlo a tu lógica)
      let usuario = await User.findBy('email', email);

      if (!usuario) {
        return response.status(404).send({ message: 'Usuario no encontrado' });
      }

      // Verificar la contraseña hasheada
      const passwordVerified = await Hash.verify(password, usuario.password);

      if (!passwordVerified) {
        return response.status(404).json({ message: 'Contraseña incorrecta' });
      }


      // Autenticar al usuario y generar un nuevo token JWT
      const token = await auth.generate(usuario, true);

      // Retornar el usuario y el token, excluyendo la contraseña
      const usuarioSinPassword = {
        nombre: usuario.nombre,
        email: usuario.email,
        created_at: usuario.created_at,
        updated_at: usuario.updated_at,
        rol: usuario.rol, // Ajusta según tu modelo de usuario
      };

      // Agregar más información según el rol del usuario (si es necesario)
      if (usuario.rol === 'Tecnico') {
        usuarioSinPassword.permiso = 1;
      }


      return response.json({ usuario: usuarioSinPassword, token: token.token, refreshToken: token.refreshToken, success: true });
    } catch (error) {
      return response.status(500).send('Error al iniciar sesión');
    }
  }

  //recibir del front una peticion
  //GET
  async getUserLogin({ request, response, auth }) {
    try {
      const usuario = await auth.getUser();
      if (!usuario) {
        return response.status(404).send('No hay usuario logueado');
      }
      return response.json(usuario);
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error al obtener el usuario');
    }

  }

  //recibir del front 'nombre', 'apellido', 'celular', 'id_rol' 
  //PUT
  async editUser({ request, response, auth }) {
    try {
      const usuario = await auth.getUser();

      if (!usuario) {
        return response.status(404).send('No hay usuario logueado');
      }

      const userData = request.only(['nombre', 'apellido', 'celular', 'id_rol']);

      if (userData.nombre == null || userData.apellido == null || userData.celular == null || userData.id_rol == null) {
        console.log('Todos los campos son requeridos')
        return response.json({ userDataNull: 'Todos los campos son requeridos' });
      }

      // Verificar si se está intentando cambiar el email
      if (userData.email && userData.email !== usuario.email) {
        const mailExist = await User.findBy('email', userData.email);

        if (mailExist) {
          return response.json({ message: 'El email ya está en uso' });
        }
      }

      // Verificar si se está intentando cambiar el DNI
      if (userData.dni && userData.dni !== usuario.dni) {
        const dniExist = await User.findBy('dni', userData.dni);

        if (dniExist) {
          return response.json({ message: 'El DNI ya está en uso' });
        }
      }

      // Actualizar los datos del usuario
      usuario.merge(userData);
      await usuario.save();

      console.log('usuario actualizado')

      return response.json({ message: 'Usuario actualizado correctamente', usuario });
    } catch (error) {
      console.error('llegue al error', error);
      return response.status(500).send('Error al editar el usuario');
    }
  }

  //recibir del front una peticion
  //POST
  async deleteUser({ request, response, auth }) {
    try {
      const usuario = await auth.getUser();

      if (!usuario) {
        return response.status(404).send('no hay usuario logueado');
      }

      await usuario.delete();

      return response.json({ message: 'Usuario eliminado correctamente' })

    } catch {
      return response.status(500), send('Error al eliminar el usuario')
    }
  }

  //recibir del front currentPassword, newPassword
  //POST
  async changePassword({ request, response, auth }) {
    try {
      const { currentPassword, newPassword } = request.all();
      const usuario = await auth.getUser();

      if (!usuario) {
        return response.status(404).send('No hay usuario logueado');
      }

      const passwordVerified = await Hash.verify(currentPassword, usuario.password);

      if (!passwordVerified) {
        return response.status(400).json({ message: 'Contraseña actual incorrecta' });
      }

      usuario.password = await Hash.make(newPassword);
      await usuario.save();

      return response.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error al cambiar la contraseña');
    }
  }

}

module.exports = UserController
