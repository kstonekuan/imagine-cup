import React from 'react';
import { withRouter } from 'react-router';

import { ButtonFooter, TextDetail } from '../components';

function MentorDetail({
  mentor,
  handleExitMentor,
}) {

  return (
    <div className="card edit-detail">
      <header className="card-header">
        <p className="card-header-title">
          {mentor.name}
          &nbsp;
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          <TextDetail
            name="name"
            value={mentor.name}
          />
          <TextDetail
            name="email"
            value={mentor.email}
          />
          <TextDetail
            name="mobile"
            value={mentor.mobile}
          />
          <TextDetail
            name="summary"
            value={mentor.summary}
          />
          <TextDetail
            name="Social"
            value={mentor.social}
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

export default withRouter(MentorDetail);
