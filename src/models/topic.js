import config from '../config'
import { Reply } from './reply'
  /**
   * 主题类
   */
let Topic = function () {
  this.id = ''
  this.author_id = ''
  this.author_name = ''
  this.avatar_url = ''
  this.tab = 'share' // 由于获取主题数据是异步的，先设置一个防止vue渲染时报错
  this.hideTab = false
  this.title = ''
  this.reply_count = 0
  this.visit_count = 0
  this.last_reply_at = ''
  this.good = false // 精华主题
  this.top = false // 置顶
  this.replies = [] // 仅主题详情有
  this.is_collect = false // 是否被收藏，仅主题详情有
}

Topic.createTopic = function (data) {
  let topic = new Topic()
  Object.assign(topic, data)
  // 处理评论
  if (data.replies) {
    topic.replies = []
    data.replies.forEach(e => {
      topic.replies.push(Reply.createReply(e))
    })
  }
  delete topic.author
  topic.author_name = data.author.loginname
  topic.avatar_url = data.author.avatar_url
  if (data.tab) {
    topic.tab = data.good ? config.topics.good.name : config.topics[data.tab].name
  } else { // 上古帖子没有tab
    topic.tab = config.topics.ask.name
  }
  topic.hideTab = false
  return topic
}

export {
  Topic
}
