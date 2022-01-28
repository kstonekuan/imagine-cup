import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ListHeader, ModalYesNo } from '../components';
import SessionDetail from './SessionDetail';
import SessionList from './SessionList';
import { getSessions, updateSession, addSession, removeSession } from './SessionsApi';

function Connections(props) {
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mentorSessions, setMentorSessions] = useState(null);
  const [menteeSessions, setMenteeSessions] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadSessionsToStates() {
    const allSessions = await getSessions(props.profile);
    if (allSessions) {
      setMentorSessions(allSessions.filter(s => s.isMentor));
      setMenteeSessions(allSessions.filter(s => !s.isMentor));
      console.log(mentorSessions);
      console.log(menteeSessions);
    }
    
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
    await loadSessionsToStates();
  }

  function handleDeleteSession(session) {
    setSelectedSession(null);
    setSessionToDelete(session);
    setShowDeleteModal(true);
  }

  function handleCloseModal() {
    setShowDeleteModal(false);
  }

  async function handleDeleteFromModal() {
    const res = await removeSession(sessionToDelete);
    if (!res) {
      // Failure msg
    }
    await handleExitSession();
  }

  function handleSelectSession(selected) {
    setSelectedSession(selected);
    console.log(`you selected ${selected.id}`);
  }

  function handleAdd() {
    setSelectedSession({ isMentor: true, mentor: props.profile });
    props.history.push('/sessions/0');
  }

  async function handleSaveSession(session) {
    if (selectedSession.id) {
      console.log(session);
      await updateSession(session);
    } else {
      await addSession(session);
    }
    await handleExitSession();
  }

  return (
    <div className="content-container">
      <ListHeader
        title="Sessions"
        handleAdd={handleAdd}
        handleRefresh={handleExitSession}
        routePath={`/sessions`}
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
                      handleSaveSession={handleSaveSession}
                      profile={props.profile}
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
          message={`Would you like to cancel this session?`}
          onNo={handleCloseModal}
          onYes={handleDeleteFromModal}
        />
      )}
    </div>
  );
}

export default Connections;
