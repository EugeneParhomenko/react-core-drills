import { useState } from 'react'
import './App.css'
import { TodoApp } from './drills/01-todo/TodoApp'

const MAIN_TABS = [
  {
    label: 'Todo',
    icon: 'todo',
    component: <TodoApp />,
  },
]

function App() {
  const [selectedTab, setSelectedTab] = useState(MAIN_TABS[0])
  return (
    <>
      <div className="main-tabs">
        {MAIN_TABS.map((tab) => (
          <button key={tab.label} onClick={() => setSelectedTab(tab)}>
            {tab.label}
          </button>
        ))}
      </div>
    <div className="main-content">
        {selectedTab.component}
      </div></>
  )
}

export default App
