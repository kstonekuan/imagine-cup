const sql = require('mssql')
const providers = require('../shared/providers');

const AZURE_CONN_STRING = process.env["AzureSQLConnectionString"];

module.exports = async function (context, req) {
    try {
        const pool = await sql.connect(AZURE_CONN_STRING);

        let srcCol, dstCol;

        if (req.query.isMentor === 'true') {
            srcCol = "MentorId";
            dstCol = "MenteeId";
        } else if (req.query.isMentor === 'false') {
            srcCol = "MenteeId";
            dstCol = "MentorId";
        } else {
            context.res.status(400).send("Inavlid value in 'isMentor' query param.");
            return;
        };

        const res = await pool.query(`
            select *
            from Profiles as p
            join Connections as c
            on p.ProfileId=c.${dstCol}
            where c.${srcCol} = '${req.query.id}'
            and c.IsActive = 1;
        `);

        context.log(res);

        let resp = [];

        res.recordset.forEach(data => {
            resp.push({
                id: data[`${dstCol}`],
                name: data["Name"],
                email: data["Email"],
                mobile: data["Mobile"],
                social: data["Social"],
                summary: data["Summary"],
                connectionId: data["ConnectionId"]
            });
        });

        context.res.status(200).json(resp);
    } catch (error) {
        context.log(error);
        context.res.status(500).send(error);
    }
    
}
