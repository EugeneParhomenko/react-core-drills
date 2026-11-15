import { useState } from 'react';
import { ProfileForm } from './ProfileForm';
import './ProfilePage.css';
import type { Profile } from './type';

export function ProfilePage() {
  const [formKey, setFormKey] = useState(0);
  const [savedProfile, setSavedProfile] = useState<Profile | null>(null);

  const handleCancel = () => {
    setFormKey(formKey + 1);
    setSavedProfile(null);
  };

  return (
    <div className="profile-page">
      <div className="profile-page-container">
        <h1>Profile</h1>
        <ProfileForm
          key={formKey}
          onSave={setSavedProfile}
          onCancel={handleCancel}
        />
      </div>
      {savedProfile && (
        <pre className="profile-page-saved-profile">
          {JSON.stringify(savedProfile, null, 2)}
        </pre>
      )}
    </div>
  );
}
