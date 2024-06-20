'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//--------------Manejo de usuarios------------//
Route.group(() => {
    Route.post('/crearUsuario', 'UserController.registrar');
    Route.post('/login', 'UserController.login');
    Route.get('/getUserLogin', 'UserController.getUserLogin');
    Route.put('/editUser', 'UserController.editUser');
    Route.post('/deleteUser', 'UserController.deleteUser');
    Route.put('/changePassword', 'UserController.changePassword');
  });
  //--------------------------------------------//
  
//--------------Manejo de tipoEvento------------//
Route.group(() => {
  Route.post('/crearTipoEvento', 'TipoEventoController.crearTipoEvento');
  Route.put('/editarTipoEvento/:id', 'TipoEventoController.editarTipoEvento');
  Route.delete('/eliminarTipoEvento/:id', 'TipoEventoController.eliminarTipoEvento');
  Route.get('/listarTipoEvento', 'TipoEventoController.listarTipoEvento');
  Route.get('/detalleTipoEvento/:id', 'TipoEventoController.detalleTipoEvento');
});
//--------------------------------------------//

//--------------Manejo de Servicios------------//
Route.group(() => {
  Route.post('/crearServicio', 'ServicioController.crearServicio');
  Route.put('/editarServicio/:id', 'ServicioController.editarServicio');
  Route.delete('/eliminarServicio/:id', 'ServicioController.eliminarServicio');
  Route.get('/listarServicio', 'ServicioController.listarServicio');
  Route.get('/detalleServicio/:id', 'ServicioController.detalleServicio');
  Route.get('/buscarServicio', 'ServicioController.buscarServicio');
});
//--------------------------------------------//