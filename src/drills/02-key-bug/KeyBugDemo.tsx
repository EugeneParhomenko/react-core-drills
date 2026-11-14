import { useState } from 'react';
import './KeyBugDemo.css';
import { Row } from './Row';
import type { Person } from './type';

const INITIAL_PEOPLE: Person[] = [
  { id: 1, name: 'Олексій' },
  { id: 2, name: 'Богдан' },
  { id: 3, name: 'Віктор' },
  { id: 4, name: 'Ганна' },
  { id: 5, name: 'Дмитро' },
];

type KeyMode = 'index' | 'id';

export function KeyBugDemo() {
  const [people, setPeople] = useState<Person[]>(INITIAL_PEOPLE);
  const [nextId, setNextId] = useState(INITIAL_PEOPLE.length + 1);
  const [keyMode, setKeyMode] = useState<KeyMode>('index');

  const sortAsc = () => {
    setPeople((current) =>
      [...current].sort((a, b) => a.name.localeCompare(b.name, 'uk')),
    );
  };

  const sortDesc = () => {
    setPeople((current) =>
      [...current].sort((a, b) => b.name.localeCompare(a.name, 'uk')),
    );
  };

  const addPersonAtStart = () => {
    const id = nextId;
    setNextId((value) => value + 1);
    setPeople((current) => [
      { id, name: `Нова ${id}` },
      ...current,
    ]);
  };

  return (
    <div className="key-bug-demo">
      <h1>Key Bug Demo</h1>
      <p>
        Введіть нотатки в кілька рядків, потім відсортуйте список. Порівняйте
        крок 1 (key за індексом) і крок 2 (key за id).
      </p>

      <div className="key-bug-demo__controls">
        <button type="button" onClick={sortAsc}>
          Сортувати А→Я
        </button>
        <button type="button" onClick={sortDesc}>
          Сортувати Я→А
        </button>
        <button type="button" onClick={addPersonAtStart}>
          Додати людину на початок
        </button>
      </div>

      <div
        className={`key-bug-demo__step ${keyMode === 'index' ? 'key-bug-demo__step--active' : ''}`}
      >
        <strong>Крок 1:</strong> key={'{index}'} — стан input «липне» до позиції
        <button
          type="button"
          onClick={() => setKeyMode('index')}
          disabled={keyMode === 'index'}
        >
          Увімкнути крок 1
        </button>
      </div>

      <div
        className={`key-bug-demo__step ${keyMode === 'id' ? 'key-bug-demo__step--active' : ''}`}
      >
        <strong>Крок 2:</strong> key={'{person.id}'} — нотатки залишаються з іменем
        <button
          type="button"
          onClick={() => setKeyMode('id')}
          disabled={keyMode === 'id'}
        >
          Увімкнути крок 2
        </button>
      </div>

      <div className="key-bug-list">
        {people.map((person, index) => (
          <Row
            key={keyMode === 'index' ? index : person.id}
            name={person.name}
          />
        ))}
      </div>
    </div>
  );
}