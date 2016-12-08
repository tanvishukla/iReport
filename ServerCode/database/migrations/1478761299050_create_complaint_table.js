'use strict'

const Schema = use('Schema')

class ComplaintTableSchema extends Schema {

  up () {
    this.create('complaints', table => {
      table.increments()
      table.text('description', 500).notNullable()
      table.string('priority', 15).notNullable()
      table.string('status', 15).notNullable()
      table.string('label', 10)
      table.string('accesslevel', 10)
      table.string('size',10).notNullable()
      table.string('latitude', 60).notNullable()
      table.string('longitude', 60).notNullable()
      table.string('street', 500).notNullable()
      table.string('city', 100).notNullable()
      table.string('state', 60).notNullable()
      table.string('email', 60)
      table.string('images', 900000)
      table.string('reported_by', 60)

      table.timestamps()
    })
  }

  down () {
    this.drop('complaints')
  }

}

module.exports = ComplaintTableSchema
