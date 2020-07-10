const xss = require('xss')

const SuggestionsService = {

  getAllSuggestions(db) {
    return db
      .from('parkfinder_suggestions AS sug')
      .select(
        'sug.id',
        'sug.park_name',
        'sug.location',
        'sug.description',
      )
      .groupBy('sug.id')
  },

  getById(db, id) {
    return SuggestionsService.getAllSuggestions(db)
      .where('sug.id', id)
      .first()
  },
  insertSuggestions(db, newSuggestions) {
    return db
      .insert(newSuggestions)
      .into('parkfinder_suggestions')
      .returning('*')
      .then(([suggestions]) => suggestions)
      .then(suggestions =>
        SuggestionsService.getById(db, suggestions.id)
      )
  },

  serializeSuggestions(suggestions) {
    const { user } = suggestions
    return {
      id: suggestions.id,
      park_name: xss(suggestions.park_name),
      sugments: xss(suggestions.location),
      description: xss(suggestions.description)
    }
  }
}

module.exports = SuggestionsService