import React from 'react';
import { withRouter } from 'react-router';

import { ButtonFooter, CardContent } from '../components';

function ProductList({
  handleDeleteMentor,
  handleSelectMentor,
  mentors,
  history,
  errorMessage,
}) {
  function selectMentor(e) {
    const mentor = getSelectedMentor(e);
    handleSelectMentor(mentor);
    history.push(`/mentors/${mentor.id}`);
  }

  function deleteProduct(e) {
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
      {(!mentors || !mentors.length) && !errorMessage && (
        <div>Loading data ...</div>
      )}
      <ul className="list">
        {mentors.map((product, index) => (
          <li key={product.id} role="presentation">
            <div className="card">
              <CardContent
                name={product.name}
                description={product.description}
              />
              <footer className="card-footer">
                <ButtonFooter
                  className="delete-item"
                  iconClasses="fas fa-trash"
                  onClick={deleteProduct}
                  label="Delete"
                  dataIndex={index}
                  dataId={product.id}
                />
                <ButtonFooter
                  className="edit-item"
                  iconClasses="fas fa-edit"
                  onClick={selectMentor}
                  label="View"
                  dataIndex={index}
                  dataId={product.id}
                />
              </footer>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withRouter(ProductList);
