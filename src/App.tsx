import { useState } from 'react';
import './App.css';
import { TodoApp } from './drills/01-todo/TodoApp';

type MainTabId = 'todo';

type MainTab = {
  label: string;
  id: MainTabId;
  component: React.ComponentType;
};

const MAIN_TABS: MainTab[] = [
  {
    label: 'Todo',
    id: 'todo',
    component: TodoApp,
  },
];

function App() {
  const [selectedTab, setSelectedTab] = useState<MainTabId>('todo');
  const ActiveComponent = MAIN_TABS.find(
    (tab) => tab.id === selectedTab,
  )?.component;
  return (
    <>
      <div className="main-tabs">
        {MAIN_TABS.map((tab) => (
          <button
            key={tab.label}
            className={selectedTab === tab.id ? 'active' : ''}
            onClick={() => setSelectedTab(tab.id)}
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
