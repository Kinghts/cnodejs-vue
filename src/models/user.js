let User = function () {
  this.id = '' // 已登陆用户才有
  this.loginname = ''
  this.avatar_url = ''
  this.githubUsername = ''
  this.create_at = ''
  this.score = ''
  this.recent_topics = ''
  this.recent_replies = ''
  this.accesstoken = '' // 已登陆用户才有
}

User.createUser = function (data) {
  let user = new User()
  Object.assign(user, data)
  return user
}

export {
  User
}
