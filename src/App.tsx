import './App.css';
import { MAIN_TABS } from './AppTabs.const';
import { Tabs } from './drills/06-tabs/Tabs';

function App() {
  return (
    <div className="app">
      <Tabs defaultValue="todo">
        <div className="main-tabs">
          <Tabs.List aria-label="Drills">
            {MAIN_TABS.map((tab) => (
              <Tabs.Trigger key={tab.id} value={tab.id}>
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>
        <main className="main-content">
          {MAIN_TABS.map((panel) => (
            <Tabs.Panel key={panel.id} value={panel.id}>
              <panel.component />
            </Tabs.Panel>
          ))}
        </main>
      </Tabs>
    </div>
  );
}

export default App;
