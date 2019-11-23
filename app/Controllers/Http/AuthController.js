'use strict'

class AuthController {
  login({ request, response}) {
    response.implicitEnd = false
    return response.send({
      error: false,
      message: `....`
    })
  }

  register({ request, response}) {
    response.implicitEnd = false
    return response.send({
      error: false,
      message: `....`
    })
  }
}

module.exports = AuthController
