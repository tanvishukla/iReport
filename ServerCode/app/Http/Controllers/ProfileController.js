'use strict'

const User = use('App/Model/User')
const Database = use('Database')

class ProfileController {
	
	* newUser (request, response) {
		const inEmail = request.input('email')
		const inUserType = inEmail.includes('@gmail.com') ? 'official' : 'resident'
		const exists = yield Database.table('users').where('email',inEmail)
		let message = 'User exists'
		console.log(exists.length)
		if(exists.length == 0){
			const user = new User()
			user.email = inEmail
			user.usertype = inUserType
			yield user.save()
			message: 'New profile created successfully!'
		}
		const newProfileCreationMessage = {
	      success: message
	    }

	    yield response.send({ message: newProfileCreationMessage })
	}

	* profileEdit (request, response) {
		const inFirstName = request.input('fname')
		const inLastName = request.input('lname')
		const inEmail = request.input('email')
		const inPhone = request.input('phone')
		const inApt = request.input('apt')
		const inStreet = request.input('street')
		const inCity = request.input('city')
		const inState = request.input('state')

		const user = yield Database.table('users').where('email', inEmail)
		.update({
			firstname: inFirstName,
			lastname: inLastName,
			phone: inPhone,
			apt: inApt,
			street: inStreet,
			city: inCity,
			state: inState
		})

	    const profileEditMessage = {
	      success: 'Profile edit successful!'
	    }

	    yield response.send({ message: profileEditMessage })
	}
}

module.exports = ProfileController
