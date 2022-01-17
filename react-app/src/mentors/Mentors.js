import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ListHeader, ModalYesNo } from '../components';
import MentorDetail from './MentorDetail';
import MentorList from './MentorList';
import { getMentors } from './MentorsApi';

function Mentors(props) {
  const [mentorToDelete, setMentorToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);

  useEffect(() => {
    setMentors(getMentors(props.profile));
    console.log(mentors);
  }, [mentors]);

  function handleExitMentor() {
    props.history.push('/mentors');
    setSelectedMentor(null);
    setMentorToDelete(null);
  }

  function handleDeleteMentor(mentor) {
    setSelectedMentor(null);
    setMentorToDelete(mentor);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleDeleteFromModal() {
    setShowModal(false);
    // deleteProduct(productToDelete);
    handleExitMentor();
  }

  function handleSelectMentor(selected) {
    setSelectedMentor(selected);
    console.log(`you selected ${selected.name}`);
  }

  function handleRefresh() {
    handleExitMentor();
    setMentors(getMentors(props.profile));
  }

  return (
    <div className="content-container">
      <ListHeader
        title="Mentors"
        // handleAdd={addNewProduct}
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

      {showModal && (
        <ModalYesNo
          message={`Would you like to remove ${mentorToDelete.name} as your mentor?`}
          onNo={handleCloseModal}
          onYes={handleDeleteFromModal}
        />
      )}
    </div>
  );
}

export default Mentors;
