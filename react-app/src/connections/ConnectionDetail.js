import React from 'react';
import { withRouter } from 'react-router';

import { ButtonFooter, TextDetail } from '../components';

function ConnectionDetail({
  connection,
  handleExitConnection,
}) {

  return (
    <div className="card edit-detail">
      <header className="card-header">
        <p className="card-header-title">
          {connection.name}&apos;s details
          &nbsp;
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          <TextDetail
            name="email"
            value={connection.email}
          />
          <TextDetail
            name="mobile"
            value={connection.mobile}
          />
          <TextDetail
            name="summary"
            value={connection.summary}
          />
          <TextDetail
            name="Social"
            value={connection.social}
          />
        </div>
      </div>
      <footer className="card-footer ">
        <ButtonFooter
          className="cancel-button"
          iconClasses="fas fa-undo"
          onClick={handleExitConnection}
          label="Exit"
        />
      </footer>
    </div>
  );
}

export default withRouter(ConnectionDetail);
