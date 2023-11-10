require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const db = require("./db");
const port = process.env.PORT || 3000; // Port number (default: 3000)

app.use(cors()); 
// Middleware to parse JSON data in requests
app.use(express.json());

app.get("/api/tasks/:userid", (req, res) => {
    const {userid} = req.params;
    db.query(
        'SELECT t_id AS id, t_title AS title, t_note AS note, t_priority AS priority, t_status AS status FROM pm_task WHERE t_fk_user_id = $1',
        [userid],
        (error, result) => {
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).send('Error occurred while querying the database');
            } else {
                res.send(result.rows);
            }
        }
        )
})

app.post("/api/add/task/:userid", (req, res) => {
    const {userid} = req.params;
    const {title} = req.body;
    
    db.query('INSERT INTO pm_task (t_title, t_fk_user_id) VALUES ($1, $2)', [title, userid], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error occurred while querying the database');
        } else {
            res.status(200).send('Task added');
        }
    });
    
});

app.put("/api/remove/task/:userid/:taskid", (req, res) => {
    const {userid, taskid} = req.params;
    
    db.query('DELETE FROM pm_task WHERE t_fk_user_id = $1 AND t_id = $2', [userid, taskid], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error occurred while querying the database');
        } else {
            res.status(200).send('Task deleted');
        }
    });
    
});

app.put("/api/update/task/:userid/:taskid", (req, res) => {
    const {userid, taskid} = req.params;
    const { status } = req.body;
    
    db.query('UPDATE pm_task SET t_status = $1 WHERE t_fk_user_id = $2 AND t_id = $3', [parseInt(status), userid, taskid], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error occurred while querying the database');
        } else {
            res.status(200).send('Task deleted');
        }
    });
    
});

// Get user informations
app.get("/api/user/:userid", (req, res) => {
    const {userid} = req.params
    if(userid){
    db.query('SELECT u_email AS email, u_username AS username, u_created_at AS createdAt FROM pm_user WHERE u_user_id = $1', [userid], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error occurred while querying the database');
        } else {
            res.send(result.rows);
        }
    });
}
    
});

//Add new user 
app.post("/api/add/user", (req, res) => {
    console.log(req.body);
    const { username, email, user_id } = req.body;
    if(username && email && user_id) {
        db.query('INSERT INTO pm_user (u_user_id, u_email,u_username,u_created_at) VALUES ($1, $2, $3, NOW())', [user_id, email, username], (error) => {
            if(error){
                console.error('Error executing query:', error);
                res.status(500).send('Error occurred while querying the database');
            }else{
                res.status(200).send('User add');
            }
        });
    }
})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
