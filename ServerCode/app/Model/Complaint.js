'use strict'

const Lucid = use('Lucid')

class Complaint extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/token')
  }

}

module.exports = Complaint
