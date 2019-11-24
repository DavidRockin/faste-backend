'use strict'

const Message = use('App/Models/Message')
const User = use('App/Models/User')

class MessageController {
  /**
   * Controller for sending a message
   * @params .userId {string}
   */
  async sendMessage({ params, request, response}) {
    const messageInfo = await request.all();
    messageInfo['senderId'] = params.userId;
    messageInfo['unread'] = true;
    let sender = await User.find(messageInfo['senderId']);
    let receiver = await User.find(messageInfo['receiverId']);
    messageInfo['senderName'] = sender.name;
    messageInfo['receiverName'] = receiver.name;
    const message = await Message.create(messageInfo);
    return response.send({
      error: false,
      message
    });
  }

  /**
   * Controller for retrieving messages
   * @params .userId {string} userID for user querying messages
   * @querParms .specificUserId {string} userID to filter messages
   * @queryParms .unread {boolean} messages that have not been read by receiver
   */
  async retrieveMessages({ params, request, response}) {
    const queryParms = request.get();
    
    const messages = await Message.where(function() {
      // All messages for user calling API
      this.where({$or:[{senderId: params.userId}, {receiverId: params.userId}]});
      
      // Filtering by messages between user and another specificUser
      if(queryParms.specificUserId){
        this.where({$or:[{senderId: queryParms.specificUserId}, {receiverId: queryParms.specificUserId}]})
      }

      // Filtering by unread
      if(queryParms.unread){
        this.where({unread: {$exist: true}}).where({unread: true})
      }
    }).fetch()

    // If messges are queried for a specific conversation, update the unread flag
    if(queryParms.specificUserId){
      for(let i in messages.rows) {
        const message = messages.rows[i];
        message.unread = false;
      }
    }

    return response.send({
      error: false,
      messages
    })
  }

}

module.exports = MessageController
