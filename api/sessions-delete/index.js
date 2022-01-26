const sql = require('mssql')

const AZURE_CONN_STRING = process.env["AzureSQLConnectionString"];

module.exports = async function (context, req) {    
    try {
        const pool = await sql.connect(AZURE_CONN_STRING);

        const res = await pool.query(`
            delet from Sessions
            where SessionId = ${parseInt(req.params.id, 10)};
        `);

        context.log(res);

        context.res.status(200);
    }  catch (error) {
        context.res.status(500).send(error);
    }
}
