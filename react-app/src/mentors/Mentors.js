import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ListHeader, ModalYesNo, ModalInput } from '../components';
import MentorDetail from './MentorDetail';
import MentorList from './MentorList';

function Mentors(props) {
  const [mentorToDelete, setMentorToDelete] = useState(null);
  const [mentorToAdd, setMentorToAdd] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [mentors, setMentors] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    setMentors(await props.getMentors(props.profile));
    console.log(mentors);
    setIsLoading(false);
  }, []);

  async function handleExitMentor() {
    props.history.push(`/${props.path}`);
    handleCloseModal();
    setSelectedMentor(null);
    setMentorToDelete(null);
    setMentorToAdd(null);
    setMentors(await props.getMentors(props.profile));
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
        title={props.title}
        handleAdd={handleAdd}
        handleRefresh={handleExitMentor}
        routePath={`/${props.path}`}
      />
      <div className="columns is-multiline is-variable">
        <div className="column is-8">
          <Switch>
            <Route
              exact
              path={`/${props.path}`}
              component={() => (
                <MentorList
                  errorMessage={null}
                  mentors={mentors}
                  selectedMentor={selectedMentor}
                  handleSelectMentor={handleSelectMentor}
                  handleDeleteMentor={handleDeleteMentor}
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
                  <MentorDetail
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
          message={`Would you like to remove ${mentorToDelete.name} as an active ${props.connectionType}?`}
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

export default Mentors;
