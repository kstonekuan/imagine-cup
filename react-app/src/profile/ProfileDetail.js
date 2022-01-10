import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';

import { ButtonFooter, InputDetail } from '../components';

function ProfileDetail({
  product: initProduct,
  handleSaveProduct,
  history,
}) {
  const [product, setProduct] = useState(Object.assign({}, initProduct));

  useEffect(() => {
    if (!product) {
      history.push('/profile'); // no product, bail out of Details
    }
  }, [product, history]);

  function handleSave() {
    const chgProduct = { ...product, id: product.id || null };
    handleSaveProduct(chgProduct);
  }

  function handleNameChange(e) {
    setProduct({ ...product, name: e.target.value });
  }

  function handleDescriptionChange(e) {
    setProduct({ ...product, description: e.target.value });
  }

  function handleLinkChange(e) {
    setProduct({ ...product, link: e.target.value });
  }

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
          {product.userId && (
            <InputDetail name="id" value={product.userId} readOnly="true" />
          )}
          <InputDetail
            name="name"
            value={product.name}
            placeholder="Alan Turing"
            onChange={handleNameChange}
          />
          <InputDetail
            name="description"
            value={product.description}
            placeholder="Professional CS Wizard"
            onChange={handleDescriptionChange}
          />
          <InputDetail
            name="links"
            value={product.description}
            placeholder="https://mentor.zoom.us/alan"
            onChange={handleLinkChange}
          />
        </div>
      </div>
      <footer className="card-footer ">
        <ButtonFooter
          className="save-button"
          iconClasses="fas fa-save"
          onClick={handleSave}
          label="Save"
        />
      </footer>
    </div>
  );
}

export default withRouter(ProfileDetail);
