const sql = require('mssql')
const providers = require('../shared/providers');

const AZURE_CONN_STRING = process.env["AzureSQLConnectionString"];

module.exports = async function (context, req) {    
    try {
        const pool = await sql.connect(AZURE_CONN_STRING);

        const res = await pool.query(`
            insert into Sessions (ConnectionId, Link, Timeslot, LengthMinutes, CompletionStatus, 
                MentorAgenda)
            values (${req.body.connectionId}, '${req.body.link}', 
                '${req.body.timeslot.toISOString().slice(0, 19).replace('T', ' ')}', ${req.body.lengthMinutes}, 
                'Incomplete', '${req.body.mentor.agenda}');
        `);

        context.log(res);

        context.res.status(201);
    }  catch (error) {
        context.res.status(500).send(error);
    }
}
