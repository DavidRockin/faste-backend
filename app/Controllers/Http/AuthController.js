'use strict'

const User = use('App/Models/User')

class AuthController {

  async login({ request, response, auth }) {
    response.implicitEnd = false

    try {
      const { email, password } = request.all()
      const token = await auth.attempt(email, password)
      return response.send({ token })
    } catch (e) {
      console.log(e)
      return response.send({
        error: e
      })
    }
  }

  async register({ request, response }) {
    response.implicitEnd = false

    try {
      const user = await User.create(request.all())
      return response.send({
        user
      })
    } catch (e) {
      return response.send({
        error: e.toString()
      })
    }
  }

}

module.exports = AuthController
