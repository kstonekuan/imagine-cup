import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ListHeader, ModalYesNo, ModalInput } from '../components';
import MentorDetail from './MentorDetail';
import MentorList from './MentorList';
import { getMentors, addMentor } from './MentorsApi';

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

  function handleExitMentor() {
    props.history.push('/mentors');
    setSelectedMentor(null);
    setMentorToDelete(null);
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

  function handleDeleteFromModal() {
    setShowDeleteModal(false);
    // deleteProduct(productToDelete);
    handleExitMentor();
  }

  function handleSelectMentor(selected) {
    setSelectedMentor(selected);
    console.log(`you selected ${selected.name}`);
  }

  async function handleRefresh() {
    handleExitMentor();
    setMentors(await getMentors(props.profile));
  }

  function handleAdd() {
    setShowAddModal(true);
  }

  async function handleAddFromModal() {
    const res = await addMentor(mentorToAdd, props.profile);
    if (!res) {
      // Failure msg
    }
    setMentorToAdd(null);
    setShowAddModal(false);
  }

  function handleInputFromModal(e) {
    setMentorToAdd({ id: e.target.value });
  }

  return (
    <div className="content-container">
      <ListHeader
        title="Mentors"
        handleAdd={handleAdd}
        handleRefresh={handleRefresh}
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
          message={`Would you like to remove ${mentorToDelete.name} as your mentor?`}
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
