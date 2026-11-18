import type { User } from './types';

type UsersListProps = {
  users: User[];
};

export function UsersList({ users }: UsersListProps) {
  if (users.length === 0) {
    return <p className="users-list__empty">No users found</p>;
  }

  return (
    <ul className="users-list">
      {users.map((user) => (
        <li key={user.id} className="user-card">
          <img
            className="user-card__avatar"
            src={user.image}
            alt=""
            width={52}
            height={52}
            loading="lazy"
          />
          <div className="user-card__body">
            <p className="user-card__name">
              {user.firstName} {user.lastName}
            </p>
            <p className="user-card__meta">{user.email}</p>
            <p className="user-card__meta user-card__meta--mono">
              {user.phone}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
