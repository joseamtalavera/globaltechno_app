// models/queries.js
require('dotenv').config(); // very important to have installed to communicate with .env file
const pool = require('./Db.js');

//const { Pool } = require('pg');
/* const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  }); */

const createEmail = async (emailData) => {
    const query = 'INSERT INTO emails(email) VALUES($1) RETURNING *';
    const values = [emailData.email];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getEmails = async () => {
    const query = 'SELECT * FROM emails';
    const result = await pool.query(query);
    return result.rows;
};

module.exports = {
    createEmail,
    getEmails
};