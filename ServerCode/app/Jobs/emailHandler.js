'use strict'

const path = require('path')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const EmailTemplate = require('email-templates').EmailTemplate
const templatePath = path.join(path.dirname(require.main.filename), 'resources/views')
const template = new EmailTemplate(templatePath)
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ireport.sanjose@gmail.com',
        pass: 'qwertypoiuy'
    }
})

class emailHandler {

  static get concurrency () {
    return 1
  }

  static get key () {
    return 'ireport-email'
  }

  * handle (data) {
    const locals = {
      email: data.email,
      templateValues: data
    }
    template.render(locals, function (err, results) {
      if (err) {
        return console.error(err)
      }
      transport.sendMail({
        from: 'ireport.sanjose@gmail.com',
        to: data.email,
        subject: 'New complaint registered',
        html: results.html,
        text: results.text
      }, function (err, responseStatus) {
        if (err) {
          return console.error(err)
        }
      })
    })
  }
}

module.exports = emailHandler
