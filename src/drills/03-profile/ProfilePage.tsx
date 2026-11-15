import { useState } from 'react';
import { ProfileForm } from './ProfileForm';
import './ProfilePage.css';
import type { EditableProfile, Profile } from './type';

const getInitialProfile = (): Profile => ({
  id: crypto.randomUUID(),
  name: '',
  email: '',
  address: { city: '', street: '' },
  skills: [],
});

const validateName = (name: string) => {
  return name.length > 0;
};
const validateEmail = (email: string) => {
  return email.length > 0 && email.includes('@');
};

export function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(getInitialProfile());
  const [savedProfile, setSavedProfile] = useState<Profile | null>(null);

  const getEditableProfile = (): EditableProfile => {
    return {
      name: profile.name,
      email: profile.email,
      address: {
        city: profile.address.city,
        street: profile.address.street,
      },
      skills: profile.skills,
    };
  };

  const isValid = () => {
    return validateName(profile.name) && validateEmail(profile.email);
  };

  const handleEditableProfileChange = (editableProfile: EditableProfile) => {
    setProfile({ ...profile, ...editableProfile });
  };

  const onSave = () => {
    setSavedProfile({ ...profile });
  };

  const onCancel = () => {
    setProfile(getInitialProfile());
    setSavedProfile(null);
  };

  return (
    <div className="profile-page">
      <div className="profile-page-container">
        <h1>Profile</h1>
        <ProfileForm
          key={profile.id}
          editableProfile={getEditableProfile()}
          onEditableProfileChange={handleEditableProfileChange}
        />
        <div className="profile-form-controls">
          <button onClick={onSave} disabled={!isValid()}>
            Save
          </button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
      {savedProfile && <code>{JSON.stringify(savedProfile, null, 2)}</code>}
    </div>
  );
}
