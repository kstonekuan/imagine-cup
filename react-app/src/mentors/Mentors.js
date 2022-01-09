import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ListHeader, ModalYesNo } from '../components';
import MentorDetail from './MentorDetail';
import ProductList from '../products/ProductList';
import useProducts from '../products/useProducts';

const captains = console;

function Mentors({ history }) {
  const [productToDelete, setProductToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {
    deleteProduct,
    getProducts,
    products,
    selectProduct,
    selectedProduct,
    error: errorMessage,
  } = useProducts();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  function handleCancelProduct() {
    history.push('/mentors');
    selectProduct(null);
    setProductToDelete(null);
  }

  function handleDeleteProduct(product) {
    selectProduct(null);
    setProductToDelete(product);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleDeleteFromModal() {
    setShowModal(false);
    deleteProduct(productToDelete);
    handleCancelProduct();
  }

  function handleSelectProduct(selectedProduct) {
    selectProduct(selectedProduct);
    captains.log(`you selected ${selectedProduct.name}`);
  }

  function handleRefresh() {
    handleCancelProduct();
    getProducts();
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
                <ProductList
                  errorMessage={errorMessage}
                  products={products}
                  selectedProduct={selectedProduct}
                  handleSelectProduct={handleSelectProduct}
                  handleDeleteProduct={handleDeleteProduct}
                />
              )}
            />
            <Route
              exact
              path="/mentors/:id"
              component={() => {
                return (
                  <MentorDetail
                    product={selectedProduct}
                    handleCancelProduct={handleCancelProduct}
                  />
                );
              }}
            />
          </Switch>
        </div>
      </div>

      {showModal && (
        <ModalYesNo
          message={`Would you like to remove ${productToDelete.name} as your mentor?`}
          onNo={handleCloseModal}
          onYes={handleDeleteFromModal}
        />
      )}
    </div>
  );
}

export default Mentors;
