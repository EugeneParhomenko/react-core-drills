import { useState } from 'react';

type RowProps = {
  name: string;
};

export function Row({ name }: RowProps) {
  const [note, setNote] = useState('');

  return (
    <div className="key-bug-row">
      <span className="key-bug-row__name">{name}</span>
      <input
        className="key-bug-row__input"
        type="text"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Нотатка"
      />
    </div>
  );
}
