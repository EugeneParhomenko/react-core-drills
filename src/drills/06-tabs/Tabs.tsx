import { TabsList } from './TabsList';
import { TabsPanel } from './TabsPanel';
import { TabsRoot } from './TabsRoot';
import { TabsTrigger } from './TabsTrigger';

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Panel: TabsPanel,
});
