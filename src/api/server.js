require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const db = require("./db");
const update = require("./utilities/update");
const select = require("./utilities/select");
const remove = require("./utilities/remove");
const insert = require("./utilities/insert");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//Get
app.get("/api/user/:userid", (req, res) => {
    const { userid } = req.params
    const elements = {
        u_email: 'email',
        u_username: 'username',
        u_created_at: 'createdAt'
    }

    select('pm_user', elements, { u_user_id: userid });
});


app.get("/api/tasks/:userid", (req, res) => {
    const { userid } = req.params;
    const elements = {
        t_id: 'id',
        t_title: 'title',
        t_note: 'note',
        t_priority: 'priority',
        t_status: 'status'
    }

    select('pm_task', elements, { t_fk_user_id: userid }, db, res);
})

app.get("/api/category/:userid", (req, res) => {
    const { userid } = req.params;
    const elements = {
        c_id: 'id',
        c_title: 'title',
        c_color: 'color'
    }

    select('pm_category', elements, { c_fk_user_id: userid }, db, res);
})

app.get("/api/pomodoro/:userid/:categoryid", (req, res) => {
    const { userid, categoryid } = req.params;
    const elements = {
        p_id: 'id',
        p_work_time: 'work_time',
        p_short_break_time: 'short_break_time',
        p_long_break_time: 'long_break_time',
        p_session_goal: 'session_goal'
    }

    const conditions = {
        p_fk_user_id: userid,
        p_fk_category_id: categoryid
    }

    select('pm_pomodoro', elements, conditions, db, res);
})

//Updates
app.put("/api/update/task/:userid/:taskid", (req, res) => {
    const { userid, taskid } = req.params;
    const conditions = {
        t_fk_user_id: userid,
        t_id: taskid
    }

    update('pm_task', req.body, conditions, db, res);

});

app.put("/api/update/pomodoro/:userid/:categoryid", (req, res) => {
    const { userid, categoryid } = req.params;

    const conditions = {
        'p_fk_category_id': categoryid,
        'p_fk_user_id': userid
    }

    update('pm_pomodoro', req.body, conditions, db, res)
});



//Delete
app.delete("/api/delete/task/:userid/:taskid", (req, res) => {
    const { userid, taskid } = req.params;
    const conditions = {
        t_fk_user_id: userid,
        t_id: taskid
    }

    remove('pm_task', conditions, db, res);

});

app.delete("/api/delete/category/:userid/:categoryid", (req, res) => {
    const { userid, categoryid } = req.params;
    const conditions = {
        c_fk_user_id: userid,
        c_id: categoryid
    }

    remove('pm_category', conditions, db, res);
});


//Insert
app.post("/api/add/category/:userid", (req, res) => {
    const { userid } = req.params;
    const { title_category } = req.body;
    const elements = {
        c_title: title_category,
        c_fk_user_id: userid
    }

    if (title_category !== null)
        insert('pm_category', elements, db, res, { c_id: 'id' });
})

app.post("/api/add/pomodoro/:userid", (req, res) => {
    const { userid } = req.params;
    const { category_id } = req.body;
    const elements = {
        p_fk_category_id: category_id,
        p_fk_user_id: userid
    }

    insert('pm_pomodoro', elements, db, res);
})



app.post("/api/add/task/:userid", (req, res) => {
    const { userid } = req.params;
    const { title } = req.body;
    const elements = {
        t_title: title,
        t_fk_user_id: userid
    }

    insert('pm_task', elements, db, res);
});

//Add new user 
app.post("/api/add/user", (req, res) => {
    const { username, email, user_id } = req.body;

    if (username && email && user_id) {
        const elements = {
            u_user_id: user_id,
            u_email: email,
            u_username: username,
            u_created_at: NOW()
        };

        insert('pm_user', elements, db, res);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

});

module.exports = app;
