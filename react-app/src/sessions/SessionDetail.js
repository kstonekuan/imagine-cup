import React from 'react';
import { withRouter } from 'react-router';

import { ButtonFooter, InputDetail } from '../components';

function SessionDetail({
  session,
  handleExitMentor,
}) {

  return (
    <div className="card edit-detail">
      <header className="card-header">
        <p className="card-header-title">
          Session with {session.isMentor ? session.mentee.name : session.mentor.name}
          &nbsp;
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          <InputDetail
            name="timeslot"
            value={session.timeslot}
            readOnly={!session.isMentor}
          />
          <InputDetail
            name="length"
            value={`${session.lengthMinutes} min`}
            readOnly={!session.isMentor}
          />
          <InputDetail
            name="link"
            value={session.link}
            readOnly={!session.isMentor}
          />
          <InputDetail
            name="mentor agenda"
            value={session.mentor.agenda}
            readOnly={!session.isMentor}
          />
          <InputDetail
            name="mentor feedback"
            value={session.mentor.feedback}
            readOnly={!session.isMentor}
          />
          <InputDetail
            name="mentee agenda"
            value={session.mentee.agenda}
            readOnly={session.isMentor}
          />
          <InputDetail
            name="mentor feedback"
            value={session.mentee.feedback}
            readOnly={session.isMentor}
          />
        </div>
      </div>
      <footer className="card-footer ">
        <ButtonFooter
          className="cancel-button"
          iconClasses="fas fa-undo"
          onClick={handleExitMentor}
          label="Exit"
        />
      </footer>
    </div>
  );
}

export default withRouter(SessionDetail);
