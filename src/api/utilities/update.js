/**
 * 
 * @param {string} table Name of the table
 * @param {Partial<{ [key: string]: string }>} elements Elements that need to be update
 * @param {Partial<{ [key: string]: string }>} conditions Conditions for the update
 * @param db Database
 * @param {Response} res Response of the request 
 */
const update = (table, elements, conditions, db, res) => {
    let updateAttributes = '';
    let conditionValues = ' WHERE ';
    let newValues = [];

    if (Object.keys(elements).length === 0) {
        res.status(400).send('Elements must not be empty');
        return;
    }

    updateAttributes = Object.entries(elements)
    .map(([key, value], index) => {
        newValues.push(value);
        return `${key} = $${index + 1}`;
    })
    .join(', ');

    if (conditions) {
        conditionValues = Object.entries(conditions)
        .map(([key, value], index) => {
            newValues.push(value);
            return `${key} = $${index + 1}`;
        })
        .join(' AND ');
    }

    const query = `UPDATE "${table}" SET ${updateAttributes} ${conditions ? conditionValues : ''}`

    db.query(query, [...newValues], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error occurred while querying the database');
        } else {
            res.status(200).send({
                message: `Updated ${result.rowCount || 0}`,
                code: 200
            });
        }
    });

}

module.exports = update;