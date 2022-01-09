import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';

import { ButtonFooter, TextDetail } from '../components';

function MentorDetail({
  product: initProduct,
  handleCancelProduct,
  history,
}) {
  const [product] = useState(Object.assign({}, initProduct));

  useEffect(() => {
    if (!product) {
      history.push('/mentors'); // no product, bail out of Details
    }
  }, [product, history]);

  return (
    <div className="card edit-detail">
      <header className="card-header">
        <p className="card-header-title">
          {product.name}
          &nbsp;
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          {product.id && (
            <TextDetail name="id" value={product.id} />
          )}
          <TextDetail
            name="name"
            value={product.name}
          />
          <TextDetail
            name="description"
            value={product.description}
          />
          <TextDetail
            name="links"
            value={product.quantity}
          />
          <TextDetail
            name="sessions"
            value={product.quantity}
          />
        </div>
      </div>
      <footer className="card-footer ">
        <ButtonFooter
          className="cancel-button"
          iconClasses="fas fa-undo"
          onClick={handleCancelProduct}
          label="Close"
        />
      </footer>
    </div>
  );
}

export default withRouter(MentorDetail);
