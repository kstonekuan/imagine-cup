const sql = require('mssql')
const providers = require('../shared/providers');

const AZURE_CONN_STRING = process.env["AzureSQLConnectionString"];

module.exports = async function (context, req) {
    try {
        const pool = await sql.connect(AZURE_CONN_STRING);

        const res = await pool.query(`
            select * from Sessions as s
            inner join Connections as c
            on s.ConnectionId = c.ConnectionId
            inner join (select ProfileId, Name as MenteeName from Profiles) as p1
            on c.MenteeId = p1.ProfileId
            inner join (select ProfileId, Name as MentorName from Profiles) as p2
            on c.MentorId = p2.ProfileId
            where c.MentorId = 3 or c.MentorId = 3;
        `);

        context.log(res);

        let resp = [];

        res.recordset.forEach(data => {
            resp.push({
                id: data["SessionId"],
                isMentor: data["MentorId"] == req.query.id,
                connectionId: data["ConnectionId"],
                status: data["CompletionStatus"],
                link: data["Link"],
                timeslot: data["TimeSlot"],
                lengthMinutes: data["LengthMinutes"],
                mentor: {
                    agenda: data["MentorAgenda"],
                    feedback: data["MentorFeedback"],
                    id: data["MentorId"],
                    name: data["MentorName"]
                },
                mentee: {
                    agenda: data["MenteeAgenda"],
                    feedback: data["MenteeFeedback"],
                    id: data["MenteeId"],
                    name: data["MenteeName"]
                }
            });
        });

        context.res.status(200).json(resp);
    } catch (error) {
        context.log(error);
        context.res.status(500).send(error);
    }
    
}
