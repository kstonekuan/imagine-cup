import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ListHeader, ModalYesNo } from '../components';
import ProductDetail from '../products/ProductDetail';
import ProductList from '../products/ProductList';
import useProducts from '../products/useProducts';

const captains = console;

function Mentors({ history }) {
  const [productToDelete, setProductToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {
    addProduct,
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
    history.push('/products');
    selectProduct(null);
    setProductToDelete(null);
  }

  function handleDeleteProduct(product) {
    selectProduct(null);
    setProductToDelete(product);
    setShowModal(true);
  }

  function handleSaveProduct(product) {
    if (selectedProduct && selectedProduct.name) {
      captains.log(product);
    } else {
      addProduct(product);
    }
    handleCancelProduct();
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
        title="Products"
        // handleAdd={addNewProduct}
        handleRefresh={handleRefresh}
        routePath="/products"
      />
      <div className="columns is-multiline is-variable">
        <div className="column is-8">
          <Switch>
            <Route
              exact
              path="/products"
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
              path="/products/:id"
              component={() => {
                return (
                  <ProductDetail
                    product={selectedProduct}
                    handleCancelProduct={handleCancelProduct}
                    handleSaveProduct={handleSaveProduct}
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
