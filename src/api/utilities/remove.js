/**
 * 
 * @param {string} table Name of the table
 * @param {Partial<{ [key: string]: string }>} conditions Conditions for the delete
 * @param db Database
 * @param {Response} res Response of the request 
 */
const remove = (table, conditions, db, res) => {

    if (!conditions) {
        res.status(400).send('Conditions must not be empty');
        return;
    }

    let newValues = [];
    let conditionValues = '';

    conditionValues = Object.entries(conditions)
        .map(([key, value], index) => {
            newValues.push(value);
            return `${key} = $${index + 1}`
        })
        .join(' AND ');

    const query = `DELETE FROM "${table}" ${conditionValues ? ' WHERE ' + conditionValues : 'WHERE 1=0'}`

    db.query(query, [...newValues], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error occurred while querying the database');
        } else {
            res.status(200).send({
                message: 'Deleted',
                code: 200
            });
        }
    });

}

module.exports = remove;