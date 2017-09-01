let Reply = function () {
  this.id = ''
  this.author_name = '' // 回复者登录名
  this.avatar_url = '' // 回复者头像url
  this.content = '' // 回复的内容
  this.upsCount = 0 // 被点赞数
  this.create_at = '' // 回复创建时间
  this.reply_id = '' // 不为空说明是回复其他人的评论
  this.is_uped = false // 未知
}
Reply.createReply = function (data) {
  let reply = new Reply()
  Object.assign(data)
  delete reply.author
  delete reply.ups
  reply.author_name = data.author.loginname
  reply.avatar_url = data.author.avatar_url
  reply.upsCount = data.ups.length
}
export {
  Reply
}
