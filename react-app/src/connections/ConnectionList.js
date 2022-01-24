import React from 'react';
import { withRouter } from 'react-router';

import { ButtonFooter, CardContent } from '../components';

function ConnectionList({
  handleDeleteMentor,
  handleSelectMentor,
  connections,
  history,
  errorMessage,
  isLoading,
  path,
}) {
  function selectMentor(e) {
    const mentor = getSelectedMentor(e);
    handleSelectMentor(mentor);
    history.push(`/${path}/${mentor.id}`);
  }

  function deleteMentor(e) {
    const mentor = getSelectedMentor(e);
    handleDeleteMentor(mentor);
  }

  function getSelectedMentor(e) {
    const index = +e.currentTarget.dataset.index;
    return connections[index];
  }

  return (
    <div>
      {errorMessage && <div>{errorMessage}</div>}
      {(!connections || isLoading) && !errorMessage && (
        <div>Loading data ...</div>
      )}
      {!isLoading && connections && !connections.length && (
        <div>No {path} yet</div>
      )}
      <ul className="list">
        {!isLoading && connections && connections.map((connection, index) => (
          <li key={connection.id} role="presentation">
            <div className="card">
              <CardContent
                name={connection.name}
                description={connection.summary}
              />
              <footer className="card-footer">
                <ButtonFooter
                  className="delete-item"
                  iconClasses="fas fa-trash"
                  onClick={deleteMentor}
                  label="Remove"
                  dataIndex={index}
                  dataId={connection.id}
                />
                <ButtonFooter
                  className="edit-item"
                  iconClasses="fas fa-edit"
                  onClick={selectMentor}
                  label="View"
                  dataIndex={index}
                  dataId={connection.id}
                />
              </footer>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withRouter(ConnectionList);
