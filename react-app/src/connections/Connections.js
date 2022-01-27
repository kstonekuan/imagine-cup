import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ListHeader, ModalYesNo, ModalInput } from '../components';
import ConnectionDetail from './ConnectionDetail';
import ConnectionList from './ConnectionList';

function Connections(props) {
  const [connectionToDelete, setConnectionToDelete] = useState(null);
  const [connectionToAdd, setConnectionToAdd] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [connections, setConnections] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    setConnections(await props.getConnections(props.profile));
    console.log(connections);
    setIsLoading(false);
  }, []);

  async function handleExitConnection() {
    props.history.push(`/${props.path}`);
    handleCloseModal();
    setSelectedConnection(null);
    setConnectionToDelete(null);
    setConnectionToAdd(null);
    setConnections(await props.getConnections(props.profile));
  }

  function handleDeleteConnection(connection) {
    setSelectedConnection(null);
    setConnectionToDelete(connection);
    setShowDeleteModal(true);
  }

  function handleCloseModal() {
    setShowDeleteModal(false);
    setShowAddModal(false);
  }

  async function handleDeleteFromModal() {
    const res = await props.removeConnection(connectionToDelete);
    if (!res) {
      // Failure msg
    }
    await handleExitConnection();
  }

  function handleSelectConnection(selected) {
    setSelectedConnection(selected);
    console.log(`you selected ${selected.name}`);
  }

  function handleAdd() {
    setShowAddModal(true);
  }

  async function handleAddFromModal() {
    const res = await props.addConnection(connectionToAdd, props.profile);
    if (!res) {
      // Failure msg
    }
    await handleExitConnection();
  }

  function handleInputFromModal(e) {
    setConnectionToAdd({ id: e.target.value });
  }

  return (
    <div className="content-container">
      <ListHeader
        title={props.title}
        handleAdd={handleAdd}
        handleRefresh={handleExitConnection}
        routePath={`/${props.path}`}
      />
      {!props.profile && (
        <div>Please login first.</div>
      )}
      {props.profile && (
        <div className="columns is-multiline is-variable">
          <div className="column is-8">
            <Switch>
              <Route
                exact
                path={`/${props.path}`}
                component={() => (
                  <ConnectionList
                    errorMessage={null}
                    connections={connections}
                    handleSelectConnection={handleSelectConnection}
                    handleDeleteConnection={handleDeleteConnection}
                    isLoading={isLoading}
                    path={props.path}
                  />
                )}
              />
              <Route
                exact
                path={`/${props.path}/:id`}
                component={() => {
                  return (
                    <ConnectionDetail
                      connection={selectedConnection}
                      handleExitConnection={handleExitConnection}
                      path={props.path}
                    />
                  );
                }}
              />
            </Switch>
          </div>
        </div>
      )}
      
      {showDeleteModal && (
        <ModalYesNo
          message={`Would you like to remove ${connectionToDelete.name} as an active ${props.connectionType}?`}
          onNo={handleCloseModal}
          onYes={handleDeleteFromModal}
        />
      )}

      {showAddModal && (
        <ModalInput
          message={`Please enter the Id of your ${props.connectionType} below:`}
          handleInput={handleInputFromModal}
          onNo={handleCloseModal}
          onYes={handleAddFromModal}
        />
      )}
    </div>
  );
}

export default Connections;
