import config from '../config'
  /**
   * 主题类
   */
let Topic = function () {
  this.id = ''
  this.article_id = ''
  this.author_id = ''
  this.author_name = ''
  this.avatar_url = ''
  this.tab = ''
  this.hideTab = false
  this.title = ''
  this.reply_count = 0
  this.visit_count = 0
  this.last_reply_at = ''
  this.good = false // 精华主题
  this.top = false // 置顶
}

Topic.createTopic = function (data) {
  let topic = new Topic()
  topic.id = data.id
  topic.article_id = data.id
  topic.author_id = data.author_id
  topic.author_name = data.author.loginname
  topic.avatar_url = data.author.avatar_url
  if (data.tab) {
    topic.tab = data.good ? config.topics.good.name : config.topics[data.tab].name
  } else { // 上古帖子没有tab
    topic.tab = config.topics.ask.name
  }
  topic.hideTab = false
  topic.title = data.title
  topic.reply_count = data.reply_count
  topic.visit_count = data.visit_count
  topic.last_reply_at = data.last_reply_at // edit
  topic.good = data.good
  topic.top = data.top
  return topic
}

export {
  Topic
}
