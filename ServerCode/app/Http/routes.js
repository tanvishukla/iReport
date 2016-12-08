'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.post('/registercomplaint','ComplaintController.register')
Route.get('/getcomplaints','ComplaintController.getComplaints')
Route.get('/getcomplaints/:id','ComplaintController.getSingleComplaint')
Route.post('/getcomplaints','ComplaintController.getComplaintsById')
Route.post('/user', 'ProfileController.newUser')
Route.post('/edituser', 'ProfileController.profileEdit')
Route.post('/getuser', 'ProfileController.getProfile')
Route.post('/changenotifications', 'ProfileController.changeNotificationSettings')
