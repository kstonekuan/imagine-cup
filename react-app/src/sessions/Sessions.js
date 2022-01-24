import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ListHeader, ModalYesNo, ModalInput } from '../components';
import SessionDetail from './SessionDetail';
import SessionList from './SessionList';
import { getSessions } from './SessionsApi';

function Connections(props) {
  const [mentorToDelete, setMentorToDelete] = useState(null);
  const [mentorToAdd, setMentorToAdd] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [mentorSessions, setMentorSessions] = useState(null);
  const [menteeSessions, setMenteeSessions] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getSessionsInStates() {
    const allSessions = await getSessions(props.profile);
    setMentorSessions(allSessions.filter(s => s.isMentor));
    setMenteeSessions(allSessions.filter(s => !s.isMentor));
    console.log(mentorSessions);
    console.log(menteeSessions);
  }

  useEffect(async () => {
    await getSessionsInStates();
    setIsLoading(false);
  }, []);

  async function handleExitMentor() {
    props.history.push(`/${props.path}`);
    handleCloseModal();
    setSelectedMentor(null);
    setMentorToDelete(null);
    setMentorToAdd(null);
    await getSessionsInStates();
  }

  function handleDeleteMentor(mentor) {
    setSelectedMentor(null);
    setMentorToDelete(mentor);
    setShowDeleteModal(true);
  }

  function handleCloseModal() {
    setShowDeleteModal(false);
    setShowAddModal(false);
  }

  async function handleDeleteFromModal() {
    const res = await props.removeMentor(mentorToDelete);
    if (!res) {
      // Failure msg
    }
    handleExitMentor();
  }

  function handleSelectMentor(selected) {
    setSelectedMentor(selected);
    console.log(`you selected ${selected.name}`);
  }

  function handleAdd() {
    setShowAddModal(true);
  }

  async function handleAddFromModal() {
    const res = await props.addMentor(mentorToAdd, props.profile);
    if (!res) {
      // Failure msg
    }
    handleExitMentor();
  }

  function handleInputFromModal(e) {
    setMentorToAdd({ id: e.target.value });
  }

  return (
    <div className="content-container">
      <ListHeader
        title="Sessions"
        handleAdd={handleAdd}
        handleRefresh={handleExitMentor}
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
                        handleSelectMentor={handleSelectMentor}
                        handleDeleteMentor={handleDeleteMentor}
                        isLoading={isLoading}
                      />
                    </div>
                    <div className="column is-half">
                      <div className="name">Mentored by</div>
                      <SessionList
                        errorMessage={null}
                        sessions={menteeSessions}
                        handleSelectMentor={handleSelectMentor}
                        handleDeleteMentor={handleDeleteMentor}
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
                    mentor={selectedMentor}
                    handleExitMentor={handleExitMentor}
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
