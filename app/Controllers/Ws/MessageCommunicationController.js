'use strict'

class MessageCommunicationController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = MessageCommunicationController
