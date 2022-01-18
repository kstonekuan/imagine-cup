import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ListHeader, ModalYesNo, ModalInput } from '../components';
import MentorDetail from './MentorDetail';
import MentorList from './MentorList';
import { getMentors, addMentor, removeMentor } from './MentorsApi';

function Mentors(props) {
  const [mentorToDelete, setMentorToDelete] = useState(null);
  const [mentorToAdd, setMentorToAdd] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [mentors, setMentors] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    setMentors(await getMentors(props.profile));
    console.log(mentors);
    setIsLoading(false);
  }, []);

  async function handleExitMentor() {
    props.history.push('/mentors');
    setSelectedMentor(null);
    setMentorToDelete(null);
    setMentorToAdd(null);
    handleCloseModal();
    setMentors(await getMentors(props.profile));
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
    const res = await removeMentor(mentorToDelete);
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
    const res = await addMentor(mentorToAdd, props.profile);
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
        title="Mentors"
        handleAdd={handleAdd}
        handleRefresh={handleExitMentor}
        routePath="/mentors"
      />
      <div className="columns is-multiline is-variable">
        <div className="column is-8">
          <Switch>
            <Route
              exact
              path="/mentors"
              component={() => (
                <MentorList
                  errorMessage={null}
                  mentors={mentors}
                  selectedMentor={selectedMentor}
                  handleSelectMentor={handleSelectMentor}
                  handleDeleteMentor={handleDeleteMentor}
                  isLoading={isLoading}
                />
              )}
            />
            <Route
              exact
              path="/mentors/:id"
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
          message={`Would you like to remove ${mentorToDelete.name} as an active mentor?`}
          onNo={handleCloseModal}
          onYes={handleDeleteFromModal}
        />
      )}

      {showAddModal && (
        <ModalInput
          message={`Please enter the Id of your mentor below:`}
          handleInput={handleInputFromModal}
          onNo={handleCloseModal}
          onYes={handleAddFromModal}
        />
      )}
    </div>
  );
}

export default Mentors;
