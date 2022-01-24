import React from 'react';
import { withRouter } from 'react-router';

import { ButtonFooter, CardContent } from '../components';

function ConnectionList({
  handleDeleteMentor,
  handleSelectMentor,
  mentors,
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
    return mentors[index];
  }

  return (
    <div>
      {errorMessage && <div>{errorMessage}</div>}
      {(!mentors || isLoading) && !errorMessage && (
        <div>Loading data ...</div>
      )}
      {!isLoading && mentors && !mentors.length && (
        <div>No {path} yet</div>
      )}
      <ul className="list">
        {!isLoading && mentors && mentors.map((mentor, index) => (
          <li key={mentor.id} role="presentation">
            <div className="card">
              <CardContent
                name={mentor.name}
                description={mentor.summary}
              />
              <footer className="card-footer">
                <ButtonFooter
                  className="delete-item"
                  iconClasses="fas fa-trash"
                  onClick={deleteMentor}
                  label="Remove"
                  dataIndex={index}
                  dataId={mentor.id}
                />
                <ButtonFooter
                  className="edit-item"
                  iconClasses="fas fa-edit"
                  onClick={selectMentor}
                  label="View"
                  dataIndex={index}
                  dataId={mentor.id}
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
