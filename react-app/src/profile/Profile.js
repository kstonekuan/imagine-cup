import React from 'react';

import { ListHeader } from '../components';
import ProfileDetail from './ProfileDetail';

function Profile(props) {
  return (
    <div className="content-container">
      <ListHeader
        title="Profile"
        routePath="/profile"
      />
      <div className="columns is-multiline is-variable">
        <div className="column is-8">
          <ProfileDetail
              product={props.profile}
              handleSaveProfile={props.handleSaveProfile}
            />
        </div>
      </div>
    </div>
  );
}

export default Profile;
