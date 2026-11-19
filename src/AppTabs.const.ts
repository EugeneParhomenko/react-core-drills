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
  component: React.ComponentType;
};

export const MAIN_TABS: MainTab[] = [
  {
    label: 'Todo',
    id: 'todo',
    component: TodoApp,
  },
  {
    label: 'Key Bug',
    id: 'key-bug',
    component: KeyBugDemo,
  },
  {
    label: 'Profile',
    id: 'profile',
    component: ProfilePage,
  },
  {
    label: 'Stop Watch',
    id: 'stop-watch',
    component: StopWatch,
  },
  {
    label: 'Hooks',
    id: 'hooks',
    component: HooksDemoPage,
  },
  {
    label: 'Tabs',
    id: 'tabs',
    component: TabsDemo,
  },
];
