const sql = require('mssql')
const providers = require('../shared/providers');

const AZURE_CONN_STRING = process.env["AzureSQLConnectionString"];

module.exports = async function (context, req) {    
    try {
        const pool = await sql.connect(AZURE_CONN_STRING);

        const res = await pool.query(`
            insert into Profiles (${providers.PROVIDERS_MAP[req.body.provider]})
            values ('${req.body.providerId}');
        `);

        context.log(res);

        context.res.status(201);
    }  catch (error) {
        context.res.status(500).send(error);
    }
}
