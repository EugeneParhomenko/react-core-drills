import './Tabs.css';
import { useTabsContext } from './TabsContext';

type TabsPanelProps = {
  children: React.ReactNode;
  value: string;
};
export function TabsPanel({ children, value }: TabsPanelProps) {
  const ctx = useTabsContext('Tabs.Panel');
  const triggerId = `${ctx.baseId}-trigger-${value}`;
  const panelId = `${ctx.baseId}-panel-${value}`;
  const isActive = ctx.value === value;
  return (
    <div
      className="tabs__panel"
      role="tabpanel"
      aria-labelledby={triggerId}
      id={panelId}
      tabIndex={0}
      hidden={!isActive}
    >
      {isActive && children}
    </div>
  );
}
