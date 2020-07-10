const express = require('express')
const path = require('path')
const SuggestionsService = require('./suggestions-service')
const { requireAuth } = require('../middleware/jwt-auth')

const SuggestionsRouter = express.Router()
const jsonBodyParser = express.json()

// routes for suggestions //

SuggestionsRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { location, park_name, description } = req.body 
    const newSuggestions =  { location, park_name, description } 

    for (const [key, value] of Object.entries(newSuggestions))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    SuggestionsService.insertSuggestions(
      req.app.get('db'),
      newSuggestions
    )
      .then(suggestions => {
        res
          .status(201)
          .json(SuggestionsService.serializeSuggestions(suggestions))
      })
      .catch(error)
  })
  

module.exports = SuggestionsRouter