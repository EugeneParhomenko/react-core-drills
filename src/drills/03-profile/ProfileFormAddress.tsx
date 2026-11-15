import { useState } from 'react';
import type { ProfileAddress } from './type';

export type ProfileFormAddressProps = {
  address: ProfileAddress;
  onAddressChange: (address: ProfileAddress) => void;
};

export function ProfileFormAddress({
  address,
  onAddressChange,
}: ProfileFormAddressProps) {
  const [{ city, street }, setAddress] = useState<ProfileAddress>(address);
  const handleCityChange = (city: string) => {
    setAddress({ ...address, city });
    onAddressChange({ ...address, city });
  };
  const handleStreetChange = (street: string) => {
    setAddress({ ...address, street });
    onAddressChange({ ...address, street });
  };
  return (
    <div className="profile-form-address">
      <label>
        <span>City:</span>
        <input
          type="text"
          value={city}
          onChange={(event) => handleCityChange(event.target.value)}
        />
      </label>
      <label>
        <span>Street:</span>
        <input
          type="text"
          value={street}
          onChange={(event) => handleStreetChange(event.target.value)}
        />
      </label>
    </div>
  );
}
