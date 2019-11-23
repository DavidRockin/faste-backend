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

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(()=> {
  Route.get('', 'AdController.index')
  Route.get('/:adId', 'AdController.show')
  Route.post('', 'AdController.store')
  Route.put('/:adId', 'AdController.update')
}).prefix('api/ads')

Route.group(()=> {
  Route.get('', 'MessageController.retrieveMessages')
  Route.post('', 'MessageController.sendMessage')
}).prefix('api/users/:userId/messages')

Route.group(()=> {
  Route.get('/search', 'FoodController.retrieveFoods')
  Route.get('/nutrients', 'FoodController.getFoodNutrients')
}).prefix('api/foods')
