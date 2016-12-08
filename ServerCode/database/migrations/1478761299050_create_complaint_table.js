'use strict'

const Schema = use('Schema')

class ComplaintTableSchema extends Schema {

  up () {
    this.create('complaints', table => {
      table.increments()
      table.string('description', 500).notNullable()
      table.string('priority', 15).notNullable()
      table.string('status', 15).notNullable()
      table.string('Label', 10).notNullable()
      table.string('accesslevel', 10).notNullable()
      table.string('latitude', 60).notNullable()
      table.string('longitude', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = ComplaintTableSchema
