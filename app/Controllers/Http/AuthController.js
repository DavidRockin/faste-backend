'use strict'

const User = use('App/Models/User')

class AuthController {
  login({ request, response}) {
    response.implicitEnd = false
    return response.send({
      error: false,
      message: `....`
    })
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
