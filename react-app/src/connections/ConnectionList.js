import React from 'react';
import { withRouter } from 'react-router';

import { ButtonFooter, CardContent } from '../components';

function ConnectionList({
  handleDeleteConnection,
  handleSelectConnection,
  connections,
  history,
  errorMessage,
  isLoading,
  path,
}) {
  function selectConnection(e) {
    const connection = getSelectedConnection(e);
    handleSelectConnection(connection);
    history.push(`/${path}/${connection.id}`);
  }

  function deleteConnection(e) {
    const connection = getSelectedConnection(e);
    handleDeleteConnection(connection);
  }

  function getSelectedConnection(e) {
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
                  onClick={deleteConnection}
                  label="Remove"
                  dataIndex={index}
                  dataId={connection.id}
                />
                <ButtonFooter
                  className="edit-item"
                  iconClasses="fas fa-edit"
                  onClick={selectConnection}
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
