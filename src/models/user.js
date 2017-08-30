import Store from 'store2'
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

/**
 * 传入session或者local
 */
User.fromStorage = function (storageType, loginname) {
  let store = Store.namespace('user')
  return User.createUser(store[storageType](loginname))
}
User.update = function (storageType, loginname, data) {
  let store = Store[storageType].namespace('user')
  let old = store(loginname)
  if (!old) {
    old = User.createUser(data)
    old.loginname = loginname
  } else {
    Object.assign(old, data)
  }
  store(loginname, old)
}
/**
 * 传入session或者local
 */
User.prototype.save = function (storageType) {
  Store[storageType].namespace('user')(this)
}

export {
  User
}
