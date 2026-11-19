import './App.css';
import { MAIN_PANELS, MAIN_TABS } from './AppTabs.const';
import { Tabs } from './drills/06-tabs/Tabs';

function App() {
  return (
    <div className="app">
      <Tabs defaultValue="todo">
        <div className="main-tabs" aria-label="Drills">
          <Tabs.List aria-label="Drills">
            {MAIN_TABS.map((tab) => (
              <Tabs.Trigger key={tab.id} value={tab.id}>
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>
        <main className="main-content">
          {MAIN_PANELS.map((panel) => (
            <Tabs.Panel value={panel.id}>
              <panel.component />
            </Tabs.Panel>
          ))}
        </main>
      </Tabs>
    </div>
  );
}

export default App;
