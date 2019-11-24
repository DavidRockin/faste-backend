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

  async getUserInfo({ request, response, auth }) {
    response.implicitEnd = false

    try {
      return await auth.getUser()
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

  async updateUserInfo({ request, response, auth }) {
    response.implicitEnd = false

    try {
      const data = request.all()
      const user = await auth.getUser()
      user.email = data.email || user.email || null
      user.name = data.name || user.name || null
      if (data.password) user.password = data.password
      user.telephone = data.telephone || user.telephone || null
      user.save()
      return response.send({
        ...user,
        success: true
      })
    } catch (e) {
      console.log(e)
      return response.send({
        error: e
      })
    }
  }

}

module.exports = AuthController
