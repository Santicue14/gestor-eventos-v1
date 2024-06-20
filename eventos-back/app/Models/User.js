'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static get table() {
    return 'dbo.usuarios';
  }

  static get primaryKey() {
    return 'id';
  }

  static get createdAtColumn() {
    return 'created_at';
  }

  static get updatedAtColumn() {
    return 'updated_at';
  }
}

module.exports = User
