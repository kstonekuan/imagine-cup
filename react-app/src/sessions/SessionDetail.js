import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import { ButtonFooter, InputDetail } from '../components';
import { getMentees } from '../connections/MenteesApi'

function SessionDetail({
  session: initSession,
  handleExitSession,
  handleSaveSession,
  profile,
  errorMessage,
  history
}) {
  const [session, setSession] = useState(Object.assign({}, initSession));
  const [mentees, setMentees] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      history.push('/sessions'); // no session, bail out of Details
    }
  }, [session, history]);

  useEffect(async () => {
    setMentees(await getMentees(profile));
    console.log(mentees);
    setIsLoading(false);
  }, [])

  function handleSave() {
    const chgSession = { ...session, id: session.id || null };
    handleSaveSession(chgSession);
  }

  function handleTimeslotChange(e) {
    setSession({ ...session, timeslot: e.target.value });
  }

  function handleLengthChange(e) {
    setSession({ ...session, lengthMinutes: e.target.value });
  }

  function handleLinkChange(e) {
    setSession({ ...session, link: e.target.value });
  }

  function handleMentorAgendaChange(e) {
    setSession({ ...session, mentorAgenda: e.target.value });
  }

  function handleMentorFeedbackChange(e) {
    setSession({ ...session, mentorFeedback: e.target.value });
  }

  function handleMenteeAgendaChange(e) {
    setSession({ ...session, menteeAgenda: e.target.value });
  }

  function handleMenteeFeedbackChange(e) {
    setSession({ ...session, menteeFeedback: e.target.value });
  }

  function handleConnectionIdChange(e) {
    setSession({ ...session, connectionId: e.target.value });
  }

  return (
    <div className="card edit-detail">
      <header className="card-header">
        <p className="card-header-title">
          Session with {session.id && session.isMentor ? session.mentee.name : session.mentor.name}
          &nbsp;
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          {!session.id && (!mentees || isLoading) && !errorMessage && (
            <div>Loading data ...</div>
          )}
          {!session.id && mentees (
            <select id="selectMentee" onBlur={handleConnectionIdChange}>
              <option value="">Select mentee</option>
              {mentees.map((mentee, i) => <option value={mentee.connectionId} key={i} >{mentee.name}</option>)}
            </select>
          )}
          <InputDetail
            name="timeslot"
            value={session.timeslot}
            readOnly={!session.isMentor}
            onChange={handleTimeslotChange}
          />
          <InputDetail
            name="length"
            value={`${session.lengthMinutes} min`}
            readOnly={!session.isMentor}
            onChange={handleLengthChange}
          />
          <InputDetail
            name="link"
            value={session.link}
            readOnly={!session.isMentor}
            onChange={handleLinkChange}
          />
          <InputDetail
            name="mentor agenda"
            value={session.mentor.agenda}
            readOnly={!session.isMentor}
            onChange={handleMentorAgendaChange}
          />
          <InputDetail
            name="mentor feedback"
            value={session.mentor.feedback}
            readOnly={!session.isMentor}
            onChange={handleMentorFeedbackChange}
          />
          <InputDetail
            name="mentee agenda"
            value={session.mentee.agenda}
            readOnly={session.isMentor}
            onChange={handleMenteeAgendaChange}
          />
          <InputDetail
            name="mentee feedback"
            value={session.mentee.feedback}
            readOnly={session.isMentor}
            onChange={handleMenteeFeedbackChange}
          />
        </div>
      </div>
      <footer className="card-footer ">
        <ButtonFooter
          className="cancel-button"
          iconClasses="fas fa-undo"
          onClick={handleExitSession}
          label="Cancel"
        />
        <ButtonFooter
          className="save-button"
          iconClasses="fas fa-save"
          onClick={handleSave}
          label="Save"
        />
      </footer>
    </div>
  );
}

export default withRouter(SessionDetail);
