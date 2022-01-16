const sql = require('mssql')

const AZURE_CONN_STRING = process.env["AzureSQLConnectionString"];

module.exports = async function (context, req) {    
    try {
        const pool = await sql.connect(AZURE_CONN_STRING);

        const res = await pool.query(`
            update Profiles
            set Name = '${req.body.name}', Email = '${req.body.email}', Mobile = '${req.body.mobile}', Social = '${req.body.social}', Summary = '${req.body.summary}'
            where ProfileId = ${parseInt(req.params.id, 10)};
        `);

        context.log(res);

        context.res.status(200);
    }  catch (error) {
        context.res.status(500).send(error);
    }
}
