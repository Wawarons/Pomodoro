/**
 * 
 * @param {string} table Name of the table
 * @param {Partial<{ [key: string]: string }>} elements Elements that need to be insert
 * @param db Database
 * @param {Response} res Response of the request 
 * @param {Partial<{ [key: string]: string }>} returningElements Elements that need to be return
 */
const insert = (table, elements, db, res, returningElements = null) => {
    let insertAttributes = [];
    let insertValues = [];
    let newValues = [];
    let returningValues = [];

    if (Object.keys(elements).length === 0) {
        res.status(400).send('Elements must not be empty');
        return;
    }


    Object.entries(elements).forEach(([key, value]) => {
        insertAttributes.push(key);
        insertValues.push(value);
    });


    if (returningElements && Object.keys(returningElements).length > 0) {
        Object.entries(returningElements)
            .forEach(([key, value], index) => {
                returningValues.push(`"${key}" AS $${index}`);
                newValues.push(value);
            })
    }

    const query = `INSERT INTO "${table}" ${insertAttributes.join(', ')} VALUES ${insertValues.join(', ')} ${returningValues.length ? " RETURNING " + returningValues.join(', ') : ''}`

    db.query(query, newValues, (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error occurred while querying the database');
        } else {
            res.status(200).send({
                message: 'Inserted',
                code: 200,
                insertedData: returningValues.length ? result.rows[0] : []
            });
        }
    });

}

module.exports = insert;