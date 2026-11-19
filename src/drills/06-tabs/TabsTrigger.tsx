import './Tabs.css';
import { useTabsContext } from './TabsContext';

type TabsTriggerProps = {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
};
export function TabsTrigger({ value, children, disabled }: TabsTriggerProps) {
  const ctx = useTabsContext('Tabs.Trigger');
  const isActive = ctx.value === value;
  const triggerId = `${ctx.baseId}-trigger-${value}`;
  const panelId = `${ctx.baseId}-panel-${value}`;
  const handleClick = () => {
    ctx.select(value);
  };
  return (
    <button
      type="button"
      role="tab"
      className={
        isActive ? 'tabs__trigger tabs__trigger--active' : 'tabs__trigger'
      }
      data-value={value}
      id={triggerId}
      aria-controls={panelId}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
