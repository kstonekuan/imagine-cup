import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ListHeader, ModalYesNo, ModalInput } from '../components';
import SessionDetail from './SessionDetail';
import SessionList from './SessionList';
import { getSessions } from './SessionsApi';

function Connections(props) {
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const [sessionToAdd, setSessionToAdd] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [mentorSessions, setMentorSessions] = useState(null);
  const [menteeSessions, setMenteeSessions] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadSessionsToStates() {
    const allSessions = await getSessions(props.profile);
    setMentorSessions(allSessions.filter(s => s.isMentor));
    setMenteeSessions(allSessions.filter(s => !s.isMentor));
    console.log(mentorSessions);
    console.log(menteeSessions);
  }

  useEffect(async () => {
    await loadSessionsToStates();
    setIsLoading(false);
  }, []);

  async function handleExitSession() {
    props.history.push(`/sessions`);
    handleCloseModal();
    setSelectedSession(null);
    setSessionToDelete(null);
    setSessionToAdd(null);
    await loadSessionsToStates();
  }

  function handleDeleteSession(session) {
    setSelectedSession(null);
    setSessionToDelete(session);
    setShowDeleteModal(true);
  }

  function handleCloseModal() {
    setShowDeleteModal(false);
    setShowAddModal(false);
  }

  async function handleDeleteFromModal() {
    const res = await props.removeSession(sessionToDelete);
    if (!res) {
      // Failure msg
    }
    handleExitSession();
  }

  function handleSelectSession(selected) {
    setSelectedSession(selected);
    console.log(`you selected ${selected.name}`);
  }

  function handleAdd() {
    setShowAddModal(true);
  }

  async function handleAddFromModal() {
    const res = await props.addSession(sessionToAdd, props.profile);
    if (!res) {
      // Failure msg
    }
    handleExitSession();
  }

  function handleInputFromModal(e) {
    setSessionToAdd({ id: e.target.value });
  }

  return (
    <div className="content-container">
      <ListHeader
        title="Sessions"
        handleAdd={handleAdd}
        handleRefresh={handleExitSession}
        routePath={`/sessions`}
      />
      <div className="columns is-multiline is-variable">
        <div className="column is-8">
          <Switch>
            <Route
              exact
              path={`/sessions`}
              component={() => {
                return (
                  <div className="columns">
                    <div className="column is-half">
                      <div className="name">To Mentor</div>
                      <SessionList
                        errorMessage={null}
                        sessions={mentorSessions}
                        handleSelectSession={handleSelectSession}
                        handleDeleteSession={handleDeleteSession}
                        isLoading={isLoading}
                      />
                    </div>
                    <div className="column is-half">
                      <div className="name">To Attend</div>
                      <SessionList
                        errorMessage={null}
                        sessions={menteeSessions}
                        handleSelectSession={handleSelectSession}
                        handleDeleteSession={handleDeleteSession}
                        isLoading={isLoading}
                      />
                    </div>
                  </div>
                );
              }}
            />
            <Route
              exact
              path={`/sessions/:id`}
              component={() => {
                return (
                  <SessionDetail
                    session={selectedSession}
                    handleExitSession={handleExitSession}
                  />
                );
              }}
            />
          </Switch>
        </div>
      </div>

      {showDeleteModal && (
        <ModalYesNo
          message={`Would you like to cancel this session?`}
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
