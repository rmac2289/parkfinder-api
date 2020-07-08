const xss = require('xss')

const CommentsService = {

  getAllPosts(db) {
    return db
      .from('parkfinder_comments AS com')
      .select(
        'com.id',
        'com.date',
        'com.comment',
        'com.subject',
        'com.park_name',
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', usr.id,
              'user_name', usr.user_name,
              'full_name', usr.full_name,
              'date_created', usr.date_created,
              'date_modified', usr.date_modified
            )
          ) AS "user"`
        )
      )
      .leftJoin(
        'parkfinder_users AS usr',
        'com.user_id',
        'usr.id',
      )
      .groupBy('com.id', 'usr.id')
  },

  getById(db, id) {
    return CommentsService.getAllPosts(db)
      .where('com.id', id)
      .first()
  },
  insertCommentsPost(db, newCommentsPost) {
    return db
      .insert(newCommentsPost)
      .into('parkfinder_comments')
      .returning('*')
      .then(([comments]) => comments)
      .then(comments =>
        CommentsService.getById(db, comments.id)
      )
  },

  serializeComments(comments) {
    const { user } = comments
    return {
      id: comments.id,
      date: new Date(comments.date),
      comments: xss(comments.comment),
      subject: comments.subject,
      park_name: comments.park_name,
      user_id: user.id || {},
      user_name: user.user_name
    }
  }
}

module.exports = CommentsService