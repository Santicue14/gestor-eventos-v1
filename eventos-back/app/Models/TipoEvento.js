'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TipoEvento extends Model {
    static get table() {
        return 'dbo.tipoevento';
      }
    
}

module.exports = TipoEvento
