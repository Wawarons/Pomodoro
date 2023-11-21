/**
 * 
 * @param {string} table Name of the table
 * @param {Partial<{ [key: string]: string }> | Array<string> | string} elements Elements that need to be select
 * @param {Partial<{ [key: string]: string }>} conditions Conditions for the select
 * @param db Database
 * @param {Response} res Response of the request 
 */
const select = (table, elements, conditions, db, res) => {

    if (!elements) {
        res.status(400).send('Elements must not be empty');
        return;
    }

    let selectAttributes = null;

    if(typeof elements === 'object' && elements !== null) {
        selectAttributes = Object.entries(elements)
        .map(([key, value]) => `${key} AS ${value}`)
        .join(', ');
    }else{
        selectAttributes = Array.isArray(elements) ? elements.join(', '):elements;
    }

    let newValues = [];
    let conditionValues = '';

    if (conditions) {
        
        conditionValues = Object.entries(conditions)
        .map(([key, value], index) => {
            newValues.push(value);
            return `${key} = $${index + 1}`
        })
        .join(' AND ');
    }

    const query = `SELECT ${selectAttributes} FROM "${table}" ${conditionValues ? ' WHERE ' + conditionValues : ''}`

    db.query(query, [...newValues], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error occurred while querying the database');
        } else {
            res.status(200).send(result.rows);
        }
    });

}

module.exports = select;