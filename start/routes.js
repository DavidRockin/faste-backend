'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/api/login', 'AuthController.login')
Route.post('/api/register', 'AuthController.register')

Route.get('/api/listing', 'ListingController.getListings')
Route.post('/api/listing/create', 'ListingController.createListing')

Route.get('/api/messages', 'MessageController.retrieveMessages')
Route.post('/api/message/send', 'MessageController.sendMessage')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(()=> {
  Route.get('ads', 'AdController.index')
  Route.get('ads/:id', 'AdController.show')
  Route.post('ad', 'AdController.store')
  Route.put('ad/:id', 'AdController.update')
  Route.delete('ad/:id', 'AdController.delete')
}).prefix('api')
