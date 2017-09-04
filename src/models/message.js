import { User } from './user'
import { Topic } from './topic'
import { Reply } from './reply'

let Message = function () {
  this.id = ''
  this.type = ''
  this.has_read = false
  this.author = new User()
  this.topic = new Topic()
  this.reply = new Reply()
}

Message.createMessage = function (data) {
  let message = new Message()
  Object.assign(message, data)
  message.author = User.createUser(data.author)
  message.topic = Topic.createTopic(data.topic)
  message.reply = Reply.createReply(data.reply)
  return message
}

export {
  Message
}
