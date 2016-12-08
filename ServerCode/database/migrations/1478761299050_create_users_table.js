'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', table => {
      table.increments()
      table.string('firstname', 80)
      table.string('lastname', 80)
      table.string('email', 254).notNullable().unique()
      table.string('screenname').unique()
      table.string('phone', 10)
      table.string('apt', 10)
      table.string('street', 100)
      table.string('city', 30)
      table.string('state', 30)
      table.string('usertype', 25).notNullable()
      table.boolean('notifications')
      table.boolean('emailnotification')
      table.boolean('anonymous')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
