import React, { useEffect, useState } from 'react';

import { ListHeader, ModalYesNo } from '../components';
import ProductDetail from '../products/ProductDetail';
import useProducts from '../products/useProducts';

const captains = console;

function Profile({ history }) {
  const [productToDelete, setProductToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {
    addProduct,
    deleteProduct,
    getProducts,
    // products,
    selectProduct,
    selectedProduct,
    updateProduct,
    // error: errorMessage,
  } = useProducts();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  function addNewProduct() {
    selectProduct({});
    history.push('/products/0');
  }

  function handleCancelProduct() {
    history.push('/products');
    selectProduct(null);
    setProductToDelete(null);
  }

  function handleSaveProduct(product) {
    if (selectedProduct && selectedProduct.name) {
      captains.log(product);
      updateProduct(product);
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

  function handleRefresh() {
    handleCancelProduct();
    getProducts();
  }

  return (
    <div className="content-container">
      <ListHeader
        title="Profile"
        handleAdd={addNewProduct}
        handleRefresh={handleRefresh}
        routePath="/profile"
      />
      <div className="columns is-multiline is-variable">
        <div className="column is-8">
          <ProductDetail
              product={selectedProduct}
              handleCancelProduct={handleCancelProduct}
              handleSaveProduct={handleSaveProduct}
            />
        </div>
      </div>

      {showModal && (
        <ModalYesNo
          message={`Would you like to delete ${productToDelete.name}?`}
          onNo={handleCloseModal}
          onYes={handleDeleteFromModal}
        />
      )}
    </div>
  );
}

export default Profile;
