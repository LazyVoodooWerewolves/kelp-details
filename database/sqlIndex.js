const pgp = require('pg-promise')();

module.exports = pgp('postgres://postgres:postgres@localhost:5432');