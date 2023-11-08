require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const db = require("./db");
const port = process.env.PORT || 3000; // Port number (default: 3000)

app.use(cors()); 
// Middleware to parse JSON data in requests
app.use(express.json());

// Get user informations
app.get("/api/user/:userid", (req, res) => {
    db.query('SELECT u_email, u_username, u_created_at as (email, username, created_at) FROM pm_user WHERE u_user_id = $1', [req.params.userid], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error occurred while querying the database');
        } else {
            console.log('Query result:', result.rows);
            res.status(200).send(result.rows);
        }
    });
    
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
