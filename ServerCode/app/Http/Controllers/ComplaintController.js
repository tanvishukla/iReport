'use strict'

const path = require('path')
const Complaint = use('App/Model/Complaint')
const Database = use('Database')
const kue = use('Kue')
const Job = require(path.join(path.dirname(require.main.filename), 'app/Jobs/emailHandler'))
const config = require('config').Configurations

class ComplaintController {

	* register (request, response){
		const inDescription = request.input('description')
		const inPriority = request.input('priority')
		const status = request.input('status') || 'Still there'
		const inLatitude = request.input('latitude')
		const inLongitude = request.input('longitude')
		const inSize = request.input('size')
		const inStreet = request.input('street')
		const inCity = request.input('city')
		const inState = request.input('state')
		const inEmail = request.input('email')
		const inReportedBy = request.input('reportedby')
		const inImages = request.input('image')
		const complaint = new Complaint()
		complaint.description = inDescription
		complaint.priority = inPriority
		complaint.status = status
		complaint.size = inSize
		complaint.latitude = inLatitude
		complaint.longitude = inLongitude
		complaint.street = inStreet
		complaint.city = inCity
		complaint.state = inState
		complaint.email = inEmail
		complaint.images = inImages
		complaint.reported_by = inReportedBy
		yield complaint.save()
		if(inEmail) {
			const newComplaint = yield Database
		    .table('complaints')
		    .where('email', inEmail)
		    .orderBy('id', 'desc')
		    .limit(1)

		    const user = yield Database
		    .table('users')
		    .where('email', inEmail)
		    .limit(1)

			if(user[0].emailnotification){
				const data = {
					email: user[0].email,
		        	firstname: user[0].firstname,
		        	lastname: user[0].lastname,
		        	complaintid: newComplaint[0].id,
		        	complaintstatus: newComplaint[0].status,
		        	description: newComplaint[0].description
		        }
		      	kue.dispatch(Job.key, data);
			}
		}
		const newRegisterationCreationMessage = {
	      success: 'Complaint Registered'
	    }
	    console.log('Complaint registered by :' + inEmail)
	    response.send({ message: newRegisterationCreationMessage })
	}

	* getComplaints (request, response){
		const complaints = yield Database.select('*').table('complaints')
		console.log('Get all complaints')
		response.send({ complaints: complaints })
	}

	* getSingleComplaint (request, response){
		const inId = request.param('id')
		const complaint = yield Database.table('complaints').select('*').where('id', inId)
		console.log('Get single complaint')
		response.send({ complaint: complaint })
	}

	* getComplaintsById (request, response){
		const inEmail = request.input('email')
		const complaint = yield Database.table('complaints').select('*').where('email', inEmail)
		console.log('Complaints requested by:' + inEmail)
		response.send({ complaints: complaint })
	}

	* updateStatus (request, response){
		const inId = request.input('id')
		const inStatus = request.input('status')
		let message = 'Id does not exist'
		if(inId){
			const complaint = yield Database.table('complaint').where('id', inId)
			.update({
				status: inStatus
			})
			message = 'Complaint status edited!'	    
		}
	    const newComplaint = yield Database
	    .table('complaints')
	    .where('id', inId)

	    const user = yield Database
	    .table('users')
	    .where('email', newComplaint[0].email)
	    .limit(1)


	    if(user[0].emailnotification){
			const data = {
				email: newComplaint[0].email,
	        	firstname: user[0].firstname,
	        	lastname: user[0].lastname,
	        	complaintid: newComplaint[0].id,
	        	complaintstatus: newComplaint[0].status,
	        	description: newComplaint[0].description
	        }
	        console.log('Email dispatched')
	      	kue.dispatch(Job.key, data);
		}
	}
}

module.exports = ComplaintController
