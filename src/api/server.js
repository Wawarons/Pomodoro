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
    const { userid } = req.params;
    db.query(
        `SELECT t_id AS id, t_title AS title, t_note AS note, t_priority AS priority, t_status AS status FROM pm_task WHERE t_fk_user_id = $1`,
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

app.get("/api/category/:userid", (req, res) => {
    const { userid } = req.params;
    db.query(
        `SELECT c_id AS id, c_title AS title, c_color AS color FROM pm_category WHERE c_fk_user_id = $1`,
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

app.post("/api/add/category/:userid", (req, res) => {
    const { userid } = req.params;
    const { title_category } = req.body;

    if(title_category !== null && title_category.length > 0){
        db.query(
            `INSERT INTO pm_category (c_title, c_fk_user_id) VALUES ($1, $2)`,
            [title_category, userid],
            (error, result) => {
                if (error) {
                    console.error('Error executing query:', error);
                    res.status(500).send('Error occurred while querying the database');
                } else {
                    res.send(result.rows);
                }
            }
        )
    }
})



app.post("/api/add/task/:userid", (req, res) => {
    const { userid } = req.params;
    const { title } = req.body;

    db.query(`INSERT INTO pm_task (t_title, t_fk_user_id) VALUES ($1, $2)`, [title, userid], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error occurred while querying the database');
        } else {
            res.status(200).send('Task added');
        }
    });

});

app.delete("/api/delete/task/:userid/:taskid", (req, res) => {
    const { userid, taskid } = req.params;

    db.query(`DELETE FROM pm_task WHERE t_fk_user_id = $1 AND t_id = $2`, [userid, taskid], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error occurred while querying the database');
        } else {
            res.status(200).send('Task deleted');
        }
    });

});

app.delete("/api/delete/category/:userid/:categoryid", (req, res) => {
    const { userid, categoryid } = req.params;

    db.query(`DELETE FROM pm_category WHERE c_fk_user_id = $1 AND c_id = $2`, [userid, categoryid], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error occurred while querying the database');
        } else {
            res.status(200).send('Task deleted');
        }
    });

});

app.put("/api/update/task/:userid/:taskid", (req, res) => {
    const { userid, taskid } = req.params;
    let newValues = [];
    let updateAttributes = '';

    for (const [key, value] of Object.entries(req.body)) {
        updateAttributes += ` "t_${key}" = $${newValues.length + 1}, `;
        newValues.push(value);
    }

    updateAttributes = updateAttributes.slice(0, -2);

    const query = `UPDATE pm_task SET ${updateAttributes} WHERE t_fk_user_id = $2 AND t_id = $3;`

    db.query(query, [...newValues, userid, taskid], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error occurred while querying the database');
        } else {
            res.status(200).send('Task update');
        }
    });

});

//Penser à la catégorie id en clé étrangère
app.post("/api/update/pomodoro_done/:userid/:category_id", (req, res) => {
    const { userid, category_id } = req.params;
    const { work_time, sessions_done } = req.body;
    let newValues = [];

    //Check if already exist
    db.query(`SELECT pd_title_category from pm_pomodoro_done WHERE pd_fk_category_id = $1 AND pd_fk_user_id = $2`, [category_id, userid], (err, result) => {

        //If exist
        if (result.rows.length > 0) {
            for (const [key, value] of Object.entries(req.body)) {
                updateAttributes += ` "pd_${key}" = $${newValues.length + 1}, `;
                newValues.push(value);
            }


            //Update
            const query = `UPDATE pm_pomodoro_done SET ${updateAttributes.slice(0, -2)} WHERE pd_fk_user_id = $2 AND pd_title_category = $3;`
        } else {

            for (const [key, value] of Object.entries(req.body)) {
                updateAttributes += `$${newValues.length + 1}, `;
                newValues.push(value);
            }


            // Add new item
            const query = `INSERT INTO pm_pomodoro_done (pd_title_category, pd_work_time, pd_session_done) VALUES ${updateAttributes.slice(0, -2)} WHERE pd_fk_user_id = $2 AND pd_fk_category_id = $3;`
        }

        db.query(query, [...newValues, userid, title_category], (error, result) => {
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).send('Error occurred while querying the database');
            } else {
                res.status(200).send('Time add');
            }
        });
    });

});




// Get user informations
app.get("/api/user/:userid", (req, res) => {
    const { userid } = req.params
    if (userid) {
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
    if (username && email && user_id) {
        db.query('INSERT INTO pm_user (u_user_id, u_email,u_username,u_created_at) VALUES ($1, $2, $3, NOW())', [user_id, email, username], (error) => {
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).send('Error occurred while querying the database');
            } else {
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
