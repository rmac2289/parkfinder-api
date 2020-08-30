const express = require("express");
const path = require("path");
const SuggestionsService = require("./suggestions-service");

const SuggestionsRouter = express.Router();
const jsonBodyParser = express.json();

// routes for park suggestions //

SuggestionsRouter.route("/").post(jsonBodyParser, (req, res, next) => {
  const { location, park_name, description } = req.body;
  const newSuggestions = { location, park_name, description };

  for (const [key, value] of Object.entries(newSuggestions))
    if (value == null || value == "")
      return res.status(400).json({
        error: `Missing park_name, location, or description in request body`,
      });

  SuggestionsService.insertSuggestions(req.app.get("db"), newSuggestions)
    .then((suggestions) => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${suggestions.id}`))
        .json(SuggestionsService.serializeSuggestions(suggestions));
    })
    .catch(next);
});

module.exports = SuggestionsRouter;
