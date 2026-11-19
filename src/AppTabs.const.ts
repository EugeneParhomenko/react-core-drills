import { TodoApp } from './drills/01-todo/TodoApp';
import { KeyBugDemo } from './drills/02-key-bug/KeyBugDemo';
import { ProfilePage } from './drills/03-profile/ProfilePage';
import { StopWatch } from './drills/04-stopwatch/StopWatch';
import { HooksDemoPage } from './drills/05-hooks/HooksDemoPage';
import { TabsDemo } from './drills/06-tabs/TabsDemo';

type MainTabId =
  'todo' | 'key-bug' | 'profile' | 'stop-watch' | 'hooks' | 'tabs';

type MainTab = {
  label: string;
  id: MainTabId;
};

export const MAIN_TABS: MainTab[] = [
  {
    label: 'Todo',
    id: 'todo',
  },
  {
    label: 'Key Bug',
    id: 'key-bug',
  },
  {
    label: 'Profile',
    id: 'profile',
  },
  {
    label: 'Stop Watch',
    id: 'stop-watch',
  },
  {
    label: 'Hooks',
    id: 'hooks',
  },
  {
    label: 'Tabs',
    id: 'tabs',
  },
];

type MainPanel = {
  id: MainTabId;
  component: React.ComponentType;
};
export const MAIN_PANELS: MainPanel[] = [
  {
    id: 'todo',
    component: TodoApp,
  },
  {
    id: 'key-bug',
    component: KeyBugDemo,
  },
  {
    id: 'profile',
    component: ProfilePage,
  },
  {
    id: 'stop-watch',
    component: StopWatch,
  },
  {
    id: 'hooks',
    component: HooksDemoPage,
  },
  {
    id: 'tabs',
    component: TabsDemo,
  },
];
