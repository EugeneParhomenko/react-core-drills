import { useState } from 'react';
import { ProfileFormAddress } from './ProfileFormAddress';
import { ProfileFormSkills } from './ProfileFormSkills';
import type { Profile } from './type';

const getInitialProfile = (): Profile => ({
  name: '',
  email: '',
  address: { city: '', street: '' },
  skills: [],
});

const validateName = (name: string) => {
  return name.trim().length > 0;
};
const validateEmail = (email: string) => {
  return email.length > 0 && email.includes('@');
};

export type ProfileFormProps = {
  onSave: (profile: Profile) => void;
  onCancel: () => void;
};

export function ProfileForm({ onSave, onCancel }: ProfileFormProps) {
  const [profile, setProfile] = useState<Profile>(getInitialProfile);
  const isValid = validateName(profile.name) && validateEmail(profile.email);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(profile);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>Name:</span>
        <input
          type="text"
          value={profile.name}
          onChange={(event) =>
            setProfile({ ...profile, name: event.target.value })
          }
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          type="email"
          value={profile.email}
          onChange={(event) =>
            setProfile({ ...profile, email: event.target.value })
          }
        />
      </label>
      <ProfileFormAddress
        address={profile.address}
        onAddressChange={(address) => setProfile({ ...profile, address })}
      />
      <ProfileFormSkills
        skills={profile.skills}
        onSkillsChange={(skills) => setProfile({ ...profile, skills })}
      />
      <div className="profile-form-controls">
        <button type="submit" disabled={!isValid}>
          Save
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
