const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
      email: 'test@test1.com'
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
      email: 'test@test2.com'
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
      email: 'test@test3.com'
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
      email: 'test@test4.com'
    },
  ]
}

function makeCommentsArray(users) {
  return [
    {
      id: 1,
      subject: 'teststate1',
      comment: 'test dept 1',
      park_name: 'testnature1',
      date: new Date('2029-01-22T00:00:00.000Z'),
      user_id: users[0].id,
    },
    {
      id: 2,
      subject: 'teststate2',
      comment: 'test dept 2',
      park_name: 'testnature2',
      date: new Date('2029-01-24T00:00:00.000Z'),
      user_id: users[1].id,
    },
    {
      id: 3,
      subject: 'teststate3',
      comment: 'test dept 3',
      park_name: 'testnature3',
      date: new Date('2029-01-20T00:00:00.000Z'),
      user_id: users[2].id,
    },
    {
      id: 4,
      subject: 'teststate4',
      comment: 'test dept 4',
      park_name: 'testnature4',
      date: new Date('2029-01-21T00:00:00.000Z'),
      user_id: users[3].id,
    },
    
  ]
}

function makeSuggestionsArray(users) {
  return [
    {
      id: 1,
      park_name: 'park name',
      location: 'test location',
      description: 'cool park',
    },
    {
      id: 2,
      park_name: 'park name two',
      location: 'test location two',
      description: 'cool park two',
    },
    {
      id: 3,
      park_name: 'park name three',
      location: 'test location three',
      description: 'cool park three',
    },
    {
      id: 4,
      park_name: 'park name four',
      location: 'test location four',
      description: 'cool park four',
    },
    {
      id: 5,
      park_name: 'park name five',
      location: 'test location five',
      description: 'cool park five',
    },
    {
      id: 6,
      park_name: 'park name six',
      location: 'test location six',
      description: 'cool park six',
    },
    {
      id: 7,
      park_name: 'park name seven',
      location: 'test location seven',
      description: 'cool park seven',
    },
    
  ];
}


function makeExpectedReview(users, comments) {
  const user = users
    .find(user => user.id === comments.user_id)

  return {
    id: comments.id,
    subject: comments.subject,
    comment: comments.comment,
    date: comments.date,
    park_name: comments.park_name,
    date: new Date(comments.review_date).toISOString(),
    user: user.id
  }
}


function makeCommentsFixtures() {
  const testUsers = makeUsersArray()
  const testComments = makeCommentsArray(testUsers)
  const testSuggestions = makeSuggestionsArray(testUsers)
  return { testUsers, testComments, testSuggestions }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
    `TRUNCATE
      parkfinder_users,
      parkfinder_comments,
      parkfinder_suggestions,`
  )
  .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE parkfinder_comments_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE parkfinder_users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE parkfinder_suggestions_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('parkfinder_comments_id_seq', 0)`),
        trx.raw(`SELECT setval('parkfinder_users_id_seq', 0)`),
        trx.raw(`SELECT setval('parkfinder_suggestions_id_seq', 0)`),
      ])
    )
  )
}

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('parkfinder_users').insert(preppedUsers)
      .then(() =>
        // update the auto sequence to stay in sync
        db.raw(
          `SELECT setval('parkfinder_users_id_seq', ?)`,
          [users[users.length - 1].id],
        )
      )
  }
  function seedSuggestions(db) {
    const preppedSuggestions = suggestions.map(suggestion => ({
      ...suggestion,
      park_name: suggestion.park_name,
      location: suggestion.location,
      description: suggestion.description
    }))
    return db.into('parkfinder_suggestions').insert(preppedSuggestions)
      .then(() => 
        db.raw(
          `SELECT setval('parkfinder_suggestions_id_seq', ?)`,
          [suggestions[suggestions.length - 1].id]
        ))
  }

  function seedCommentsTables(db, users, comments) {
    // use a transaction to group the queries and auto rollback on any failure
    return db.transaction(async trx => {
      await seedUsers(trx, users)
      await trx.into('parkfinder_comments').insert(comments)
      // update the auto sequence to match the forced id values
      await trx.raw(
        `SELECT setval('parkfinder_comments_id_seq', ?)`,
        [comments[comments.length - 1].id],
      )
    })
  }
    
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
         subject: user.user_name,
         algorithm: 'HS256',
       })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeCommentsArray,
  makeSuggestionsArray,
  makeAuthHeader,
  makeCommentsFixtures,
  makeExpectedReview,
  seedSuggestions,
  cleanTables,
  seedCommentsTables,
  seedUsers,
}