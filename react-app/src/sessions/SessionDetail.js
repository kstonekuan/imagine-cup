import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import { ButtonFooter, InputDetail, SelectDetail, DateTimeDetail } from '../components';
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
    console.log(e.target.value)
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
    const index = e.target.value
    setSession({ ...session, connectionId: mentees[index].connectionId, mentee: mentees[index] });
  }

  return (
    <div className="card edit-detail">
      <header className="card-header">
        <p className="card-header-title">
          {session.id && `Session with ${session.isMentor ? session.mentee.name : session.mentor.name}`}
          {!session.id && 'Create new session'}
          &nbsp;
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          {!session.id && (!mentees || isLoading) && !errorMessage && (
            <div>Loading data ...</div>
          )}
          {!session.id && mentees && !isLoading && (
            <SelectDetail
              name="mentee"
              placeholder="select mentee"
              options={mentees}
              propertyName="name"
              onChange={handleConnectionIdChange}
            />
          )}
          <DateTimeDetail
            name="timeslot"
            value={session.timeslot}
            readOnly={!session.isMentor}
            onChange={handleTimeslotChange}
          />
          <InputDetail
            name="length (minutes)"
            value={session.lengthMinutes}
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
            value={session.mentor && session.mentor.agenda}
            readOnly={!session.isMentor}
            onChange={handleMentorAgendaChange}
          />
          <InputDetail
            name="mentor feedback"
            value={session.mentor && session.mentor.feedback}
            readOnly={!session.isMentor}
            onChange={handleMentorFeedbackChange}
          />
          <InputDetail
            name="mentee agenda"
            value={session.mentee && session.mentee.agenda}
            readOnly={session.isMentor}
            onChange={handleMenteeAgendaChange}
          />
          <InputDetail
            name="mentee feedback"
            value={session.mentee && session.mentee.feedback}
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
