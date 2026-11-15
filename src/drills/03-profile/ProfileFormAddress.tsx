import type { ProfileAddress } from './type';

export type ProfileFormAddressProps = {
  address: ProfileAddress;
  onAddressChange: (address: ProfileAddress) => void;
};

export function ProfileFormAddress({
  address,
  onAddressChange,
}: ProfileFormAddressProps) {
  const { city, street } = address;
  return (
    <div className="profile-form-address">
      <label>
        <span>City:</span>
        <input
          type="text"
          value={city}
          onChange={(event) =>
            onAddressChange({ ...address, city: event.target.value })
          }
        />
      </label>
      <label>
        <span>Street:</span>
        <input
          type="text"
          value={street}
          onChange={(event) =>
            onAddressChange({ ...address, street: event.target.value })
          }
        />
      </label>
    </div>
  );
}
