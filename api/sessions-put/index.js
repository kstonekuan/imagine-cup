const sql = require('mssql')

const AZURE_CONN_STRING = process.env["AzureSQLConnectionString"];

module.exports = async function (context, req) {    
    try {
        const pool = await sql.connect(AZURE_CONN_STRING);

        const res = await pool.query(`
            update Sessions
            set Link = '${req.body.link}', Timeslot = '${req.body.timeslot}', 
                LengthMinutes = '${req.body.lengthMinutes}', CompletionStatus = '${req.body.status}',
                MentorAgenda = '${req.body.mentor.agenda}', MentorFeedback = '${req.body.mentor.feedback}',
                MenteeAgenda = '${req.body.mentee.agenda}', MenteeFeedback = '${req.body.mentee.feedback}'
            where SessionId = ${parseInt(req.params.id, 10)};
        `);

        context.log(res);

        context.res.status(200);
    }  catch (error) {
        context.log(error)
        context.res.status(500).send(error);
    }
}
