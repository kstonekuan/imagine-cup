const sql = require('mssql')
const providers = require('../shared/providers');

const AZURE_CONN_STRING = process.env["AzureSQLConnectionString"];

module.exports = async function (context, req) {
    try {
        const pool = await sql.connect(AZURE_CONN_STRING);

        const profileData = await pool.query(`
            select * from Profiles
            where ${providers.PROVIDERS_MAP[req.query.provider]} = '${req.query.providerId}';
        `);

        console.log(profileData);
    
        if (profileData.recordset.length === 1) {
            context.res = {        
                body: JSON.parse(profileData.recordset[0])
            };
        }
        else if (profileData.recordset.length === 0) {
            context.res = {
                status: 404
            }
        }
    } catch (error) {
        context.res.status(500).send(error);
    }
    
}
