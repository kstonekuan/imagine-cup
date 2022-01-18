const sql = require('mssql')

const AZURE_CONN_STRING = process.env["AzureSQLConnectionString"];

module.exports = async function (context, req) {
    try {
        const pool = await sql.connect(AZURE_CONN_STRING);
        
        const res = await pool.query(`
            insert into Connections (MentorId, MenteeId, IsActive)
            values ('${req.body.mentorId}', '${req.body.menteeId}', 1);
        `);

        context.log(res);

        context.res.status(201);
    } catch (error) {
        context.log(error);
        context.res.status(500).send(error);
    }
    
}
