import React, { useState } from 'react';
import { withRouter } from 'react-router';

import { ButtonFooter, InputDetail } from '../components';

function ProfileDetail({
  profile: initProfile,
  handleSaveProfile,
}) {
  const [profile, setProfile] = useState(Object.assign({}, initProfile));

  function handleSave() {
    handleSaveProfile(profile);
  }

  function handleNameChange(e) {
    setProfile({ ...profile, name: e.target.value });
  }

  function handleEmailChange(e) {
    setProfile({ ...profile, email: e.target.value });
  }

  function handleMobileChange(e) {
    setProfile({ ...profile, mobile: e.target.value });
  }

  function handleSummaryChange(e) {
    setProfile({ ...profile, summary: e.target.value });
  }

  function handleSocialChange(e) {
    setProfile({ ...profile, social: e.target.value });
  }

  return (
    <div className="card edit-detail">
      <header className="card-header">
        <p className="card-header-title">
          {profile.name}
          &nbsp;
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          <InputDetail 
            name="Id" 
            value={profile.id} 
            readOnly="true" 
          />
          <InputDetail
            name="Name"
            value={profile.name}
            placeholder="Alan Turing"
            onChange={handleNameChange}
          />
          <InputDetail
            name="Email"
            value={profile.email}
            placeholder="alan@gmail.com"
            onChange={handleEmailChange}
          />
          <InputDetail
            name="Mobile"
            value={profile.mobile}
            placeholder="987654321"
            onChange={handleMobileChange}
          />
          <InputDetail
            name="Summary"
            value={profile.summary}
            placeholder="Professional CS Wizard"
            onChange={handleSummaryChange}
          />
          <InputDetail
            name="Social"
            value={profile.social}
            placeholder="LinkedIn, WhatsApp, Telegram..."
            onChange={handleSocialChange}
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
