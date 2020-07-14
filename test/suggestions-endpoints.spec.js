const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Suggestions Endpoints', function() {
  let db;

  const {
    testUsers,
    testSuggestions,
    
  } = helpers.makeSuggestionsFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /api/suggestions`, () => {
    beforeEach('insert suggestion', () =>
      helpers.seedSuggestions(
        db,
        testSuggestions
      )
    )

    it(`creates a suggestion, responding with 201 and the new post`, function() {
      this.retries(3)
      const testUser = testUsers[0]
      const newPost = {
        park_name: 'Test park name',
        location: 'test location',
        description: 'test description'
      }
      return supertest(app)
        .post('/api/suggestions')
        .send(newPost)
        .expect(201)
        .expect(res => {
          expect(res.body.park_name).to.eql(newPost.park_name)
          expect(res.body.location).to.eql(newPost.location)
          expect(res.body.description).to.eql(newPost.description)
          expect(res.body).to.have.property('id')
          expect(res.headers.location).to.eql(`/api/suggestions/${res.body.id}`)
        })
    })

    const requiredFields = ['park_name, location, description']

    requiredFields.forEach(field => {
      const newPost = {
        park_name: 'Test park name',
        location: 'test location',
        description: 'test description'
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        const emptyPost = {
            park_name: '',
            location: '',
            description: ''
        }
        return supertest(app)
          .post('/api/suggestions')
          .send(emptyPost)
          .expect(400, {
            error: `Missing park_name, location, or description in request body`,
          })
      })
    })
  })
});