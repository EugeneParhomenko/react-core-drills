import { useState } from 'react';
import { ProfileFormAddress } from './ProfileFormAddress';
import { ProfileFormSkills } from './ProfileFormSkills';
import type { EditableProfile, ProfileAddress } from './type';

export type ProfileFormProps = {
  editableProfile: EditableProfile;
  onEditableProfileChange: (editableProfile: EditableProfile) => void;
};

export function ProfileForm({
  editableProfile,
  onEditableProfileChange,
}: ProfileFormProps) {
  const [profile, setProfile] = useState<EditableProfile>(editableProfile);

  const onNameChange = (name: string) => {
    const newProfile = { ...profile, name };
    commitProfileChange(newProfile);
  };

  const onEmailChange = (email: string) => {
    const newProfile = { ...profile, email };
    commitProfileChange(newProfile);
  };

  const onAddressChange = (address: ProfileAddress) => {
    const newProfile = { ...profile, address };
    commitProfileChange(newProfile);
  };

  const onSkillsChange = (skills: string[]) => {
    const newProfile = { ...profile, skills };
    commitProfileChange(newProfile);
  };

  const commitProfileChange = (profile: EditableProfile) => {
    setProfile(profile);
    onEditableProfileChange(profile);
  };

  return (
    <form>
      <label>
        <span>Name:</span>
        <input
          type="text"
          value={profile.name}
          onChange={(event) => onNameChange(event.target.value)}
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          type="email"
          value={profile.email}
          onChange={(event) => onEmailChange(event.target.value)}
        />
      </label>
      <ProfileFormAddress
        address={profile.address}
        onAddressChange={onAddressChange}
      />
      <ProfileFormSkills
        skills={profile.skills}
        onSkillsChange={onSkillsChange}
      />
    </form>
  );
}
