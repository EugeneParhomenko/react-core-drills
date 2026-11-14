import { useState } from 'react';
import './App.css';
import { TodoApp } from './drills/01-todo/TodoApp';

type MainTabType = 'todo';

type MainTab = {
  label: string;
  type: MainTabType;
  component: React.ComponentType;
};

const MAIN_TABS: MainTab[] = [
  {
    label: 'Todo',
    type: 'todo',
    component: TodoApp,
  },
];

function App() {
  const [selectedTab, setSelectedTab] = useState('todo');
  const ActiveComponent = MAIN_TABS.find(
    (tab) => tab.type === selectedTab,
  )?.component;
  return (
    <>
      <div className="main-tabs">
        {MAIN_TABS.map((tab) => (
          <button
            key={tab.label}
            className={selectedTab === tab.type ? 'active' : ''}
            onClick={() => setSelectedTab(tab.type)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="main-content">
        {ActiveComponent ? <ActiveComponent /> : null}
      </div>
    </>
  );
}

export default App;
