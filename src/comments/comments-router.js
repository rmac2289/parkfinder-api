const express = require('express')
const path = require('path')
const CommentsService = require('./Comments-service')
const { requireAuth } = require('../middleware/jwt-auth')

const CommentsRouter = express.Router()
const jsonBodyParser = express.json()

// routes for Comments //

CommentsRouter
  .route('/')
  .get((req, res, next) => {
    CommentsService.getAllPosts(req.app.get('db'))
      .then(comments => {
        res.json(comments.map(CommentsService.serializeComments))
      })
      .catch(next)
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { comments, subject } = req.body 
    const newCommentsPost =  { comments, subject } 

    for (const [key, value] of Object.entries(newCommentsPost))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

      newCommentsPost.user_id = req.user.id
    CommentsService.insertCommentsPost(
      req.app.get('db'),
      newCommentsPost
    )
      .then(comments => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${comments.id}`))
          .json(CommentsService.serializeComments(comments))
      })
      .catch(next)
  })

CommentsRouter
  .route('/:comments_id')
  .all(checkCommentsExists)
  .get((req, res) => {
    res.json(CommentsService.serializeComments(res.comments))
    .catch(next)
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const { comment, subject } = req.body 
    const postToUpdate =  { comment, subject } 
    CommentsService.updateLikes(
      req.app.get('db'),
      req.params.comments_id,
      postToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })


/* async/await syntax for promises */
async function checkCommentsExists(req, res, next) {
  try {
    const comments = await CommentsService.getById(
      req.app.get('db'),
      req.params.comments_id
    )

    if (!comments)
      return res.status(404).json({
        error: `Comments doesn't exist`
      })

    res.comments = comments
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = CommentsRouter