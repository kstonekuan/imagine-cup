import React from 'react';
import { withRouter } from 'react-router';

import { ButtonFooter, CardContent } from '../components';

function SessionList({
  handleDeleteMentor,
  handleSelectMentor,
  sessions,
  history,
  errorMessage,
  isLoading,
}) {
  function selectMentor(e) {
    const mentor = getSelectedMentor(e);
    handleSelectMentor(mentor);
    history.push(`/sessions/${mentor.id}`);
  }

  function deleteMentor(e) {
    const mentor = getSelectedMentor(e);
    handleDeleteMentor(mentor);
  }

  function getSelectedMentor(e) {
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
                  onClick={deleteMentor}
                  label="Remove"
                  dataIndex={index}
                  dataId={session.id}
                />
                <ButtonFooter
                  className="edit-item"
                  iconClasses="fas fa-edit"
                  onClick={selectMentor}
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
