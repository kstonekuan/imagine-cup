const sql = require('mssql')
const providers = require('../shared/providers');

const AZURE_CONN_STRING = process.env["AzureSQLConnectionString"];

module.exports = async function (context, req) {
    try {
        const pool = await sql.connect(AZURE_CONN_STRING);

        const res = await pool.query(`
            select * from Profiles
            where ${providers.PROVIDERS_MAP[req.query.provider]} = '${req.query.providerId}';
        `);

        context.log(res);

        let resp = {
            doesExist: false
        };

        if (res.recordset.length > 0) {
            data = res.recordset[0];
            resp = {
                doesExist: true,
                id: data.ProfileId,
                name: data.Name,
                email: data.Email,
                mobile: data.Mobile,
                social: data.Social,
                summary: data.Summary
            };
        };

        context.res.status(200).json(resp);
    } catch (error) {
        context.log(error);
        context.res.status(500).send(error);
    }
    
}
