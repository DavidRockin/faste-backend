'use strict'

class MessageController {
  sendMessage({ request, response}) {
    response.implicitEnd = false
    return response.send({
      error: false,
      message: `....`
    })
  }

  retrieveMessages({ request, response}) {
    response.implicitEnd = false
    return response.send({
      error: false,
      message: `....`
    })
  }

}

module.exports = MessageController
