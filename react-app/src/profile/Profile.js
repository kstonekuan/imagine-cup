import React, { useEffect } from 'react';

import { ListHeader } from '../components';
import ProfileDetail from './ProfileDetail';
import useProducts from '../products/useProducts';

const captains = console;

function Profile(props) {
  const {
    addProduct,
    getProducts,
    // products,
    selectedProduct,
    updateProduct,
    // error: errorMessage,
  } = useProducts();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  function handleSaveProduct(product) {
    if (selectedProduct && selectedProduct.name) {
      captains.log(product);
      updateProduct(product);
    } else {
      addProduct(product);
    }
  }

  function handleRefresh() {
    getProducts();
  }

  return (
    <div className="content-container">
      <ListHeader
        title="Profile"
        handleRefresh={handleRefresh}
        routePath="/profile"
      />
      <div className="columns is-multiline is-variable">
        <div className="column is-8">
          <ProfileDetail
              product={props.userInfo}
              handleSaveProduct={handleSaveProduct}
            />
        </div>
      </div>
    </div>
  );
}

export default Profile;
