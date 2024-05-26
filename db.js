"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
// const { getDatabaseUri } = require("./config");
require('dotenv').config({ path: require('path').resolve(__dirname, './.env') });

const dbName = process.env.NODE_ENV === "test"
  ? process.env.DB_TEST_NAME
  : process.env.DB_NAME;

const db = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: dbName
})

db.connect();

module.exports = db;