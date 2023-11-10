require('dotenv').config();
const express = require("express");
const app = express();
const { Pool } = require('pg');

// Configuration de la connexion à la base de données PostgreSQL
// const pool = new Pool({
//     connectionString: process.env.POSTGRES_URL+"?sslmode=require"
// });

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE
})

module.exports = pool;
