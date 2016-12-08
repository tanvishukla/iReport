'use strict'

const User = use('App/Model/User')
const Database = use('Database')

class ProfileController {
	
	* newUser (request, response) {
		const inEmail = request.input('email')
		const inUserType = inEmail.includes('@gmail.com') ? 'official' : 'resident'
		const exists = yield Database.table('users').where('email',inEmail)
		let message = 'User exists'
		if(exists.length == 0){
			const user = new User()
			user.email = inEmail
			user.usertype = inUserType
			yield user.save()
			message = 'New profile created successfully!'
		}
		const newProfileCreationMessage = {
	      success: message
	    }
	    console.log(message)
	    response.send({ message: newProfileCreationMessage })
	}

	* profileEdit (request, response) {
		const inFirstName = request.input('fname')
		const inLastName = request.input('lname')
		const inScreenName = request.input('screenname')
		const inEmail = request.input('email')
		const inPhone = request.input('phone')
		const inApt = request.input('apt')
		const inStreet = request.input('street')
		const inCity = request.input('city')
		const inState = request.input('state')
		
		let message = 'Profile edit not successful!'
		if(inEmail){
			const user = yield Database.table('users').where('email', inEmail)
			.update({
				firstname: inFirstName,
				lastname: inLastName,
				phone: inPhone,
				apt: inApt,
				street: inStreet,
				city: inCity,
				state: inState,
				screenname: inScreenName
			})
			message = 'Profile edit successful!'
		}
		const profileEditMessage = {
	    	message: message 
	    }
	    console.log(message)
	    response.send({ message: profileEditMessage })
	}

	* getProfile (request, response) {
		const inEmail = request.input('email')
		const user = yield Database.select('*').table('users').where('email', inEmail)
		console.log('Profile retrieved by: ' + inEmail)
		response.send({ user: user[0] })
	}

	* changeNotificationSettings (request, response) {
		const inEmail = request.input('email')
		const inNotification = request.input('notification')
		const inEmailNotification = request.input('emailnotification')
		const inAnonymous = request.input('anonymous')
		let message = 'Notification settings not successful!'
		if(inEmail){
			const user = yield Database.table('users').where('email', inEmail)
			.update({
				notifications: inNotification,
				emailnotification: inEmailNotification,
				anonymous: inAnonymous
			})
			message = 'Notification settings changed!'
		}
		const profileEditMessage = {
			message: message
		}
		console.log(message)
		response.send({ message: profileEditMessage })
	}
}

module.exports = ProfileController
