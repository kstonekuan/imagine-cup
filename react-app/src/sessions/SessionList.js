import React from 'react';
import { withRouter } from 'react-router';

import { ButtonFooter, CardContent } from '../components';

function SessionList({
  handleDeleteSession,
  handleSelectSession,
  sessions,
  history,
  errorMessage,
  isLoading,
}) {
  function selectSession(e) {
    const session = getSelectedSession(e);
    handleSelectSession(session);
    history.push(`/sessions/${session.id}`);
  }

  function deleteSession(e) {
    const session = getSelectedSession(e);
    handleDeleteSession(session);
  }

  function getSelectedSession(e) {
    const index = +e.currentTarget.dataset.index;
    return sessions[index];
  }

  return (
    <div>
      {errorMessage && <div>{errorMessage}</div>}
      {(!sessions || isLoading) && !errorMessage && (
        <div>Loading data ...</div>
      )}
      {!isLoading && sessions && !sessions.length && (
        <div>No sessions yet</div>
      )}
      <ul className="list">
        {!isLoading && sessions && sessions.map((session, index) => (
          <li key={session.id} role="presentation">
            <div className="card">
              <CardContent
                name={session.isMentor ? session.mentee.name : session.mentor.name }
                description={session.timeslot}
              />
              <footer className="card-footer">
                <ButtonFooter
                  className="delete-item"
                  iconClasses="fas fa-trash"
                  onClick={deleteSession}
                  label="Remove"
                  dataIndex={index}
                  dataId={session.id}
                />
                <ButtonFooter
                  className="edit-item"
                  iconClasses="fas fa-edit"
                  onClick={selectSession}
                  label="View"
                  dataIndex={index}
                  dataId={session.id}
                />
              </footer>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withRouter(SessionList);
