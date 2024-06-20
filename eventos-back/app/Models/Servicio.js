'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Servicio extends Model {
    static get table() {
        return 'dbo.servicios';
      }
}

module.exports = Servicio
