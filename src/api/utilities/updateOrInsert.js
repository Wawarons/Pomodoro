export const updateOrInsert = (prefix) => {

let newValues = [];

    //Check if already exist
    db.query(`SELECT ${prefix}_id from pm_pomodoro WHERE ${prefix}_fk_category_id = $1 AND ${prefix}_fk_user_id = $2`, [category_id, userid], (err, result) => {

        //If exist
        if (result.rows.length > 0) {
            for (const [key, value] of Object.entries(req.body)) {
                updateAttributes += ` "${prefix}_${key}" = $${newValues.length + 1}, `;
                newValues.push(value);
            }


            //Update
            const query = `UPDATE pm_pomodoro SET ${updateAttributes.slice(0, -2)} WHERE p_fk_user_id = $${newValues.length + 1} AND ${prefix}_title_category = $${newValues.length + 2};`
        } else {

            for (const [key, value] of Object.entries(req.body)) {
                updateAttributes += `$${newValues.length + 1}, `;
                newValues.push(value);
            }


            // Add new item
            const query = `INSERT INTO pm_pomodoro (p_work_time, p_short_break_time, p_session_goal) VALUES ${updateAttributes.slice(0, -2)} WHERE p_fk_user_id = $2 AND pd_fk_category_id = $3;`
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
}