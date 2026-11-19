import { useEffect, useId, useRef, useState } from 'react';
import './Tabs.css';
import { TabsContext, useTabsContext } from './TabsContext';

type TabsListProps = {
  children: React.ReactNode;
  "aria-label": string;
};
export function TabsList({ children, "aria-label": ariaLabel }: TabsListProps) {
  const ctx = useTabsContext('Tabs.List');
  const listRef = useRef<HTMLDivElement>(null);

  const getTabs = (): HTMLButtonElement[] => {
    return Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])') ?? []
    );
  }

  const getActiveTabIndex = () => {
    const tabs = getTabs();
    const activeTab = tabs.find(tab => tab.getAttribute('data-value') === ctx.value);
    return activeTab ? tabs.indexOf(activeTab) : -1;
  };

  const getFirstTab = (): HTMLButtonElement => {
    const tabs = getTabs();
    return tabs[0];
  }

  const getLastTab = (): HTMLButtonElement => {
    const tabs = getTabs();
    return tabs[tabs.length - 1];
  }

  const getNextTab = (direction: 'next' | 'previous'): HTMLButtonElement => {
    const tabs = getTabs();
    const activeTabIndex = getActiveTabIndex();
    const nextTabIndex = direction === 'next' ? activeTabIndex + 1 : activeTabIndex - 1;
    if (nextTabIndex > tabs.length - 1) return getFirstTab();
    if (nextTabIndex < 0) return getLastTab();
    return tabs[nextTabIndex];
  }

  const activateNextTab = (nextTab: HTMLButtonElement) => {
    const value = nextTab.getAttribute('data-value'); {
      if (value) {
        ctx.select(value);
      }
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowRight': {
        const nextTab = getNextTab('next');
        activateNextTab(nextTab);
        break;
      }
      case 'ArrowLeft': {
        const nextTab = getNextTab('previous');
        activateNextTab(nextTab);
        break;
      }
      case 'Home': {
        const firstTab = getFirstTab();
        activateNextTab(firstTab);
        break;  
      }
      case 'End': {
        const lastTab = getLastTab();
        activateNextTab(lastTab);
        break;
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div
      ref={listRef}
      className="tabs__list"
      role="tablist"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}

type TabsTriggerProps = {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
  onClick?: (value: string) => void;
};
export function TabsTrigger({ value, children, disabled, onClick }: TabsTriggerProps) {
  const ctx = useTabsContext('Tabs.Trigger');
  const isActive = ctx.value === value;
  const triggerId = `${ctx.baseId}-trigger-${value}`;
  const panelId = `${ctx.baseId}-panel-${value}`;
  const handleClick = () => {
    ctx.select(value);
    onClick?.(value);
  }
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
      aria-hidden={!isActive}
    >
      {isActive && children}
    </div>
  );
}

type TabsRootProps = {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};
export function TabsRoot({
  value,
  defaultValue,
  onValueChange,
  children,
}: TabsRootProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internalValue;

  const select = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  };

  const baseId = useId();

  return (
    <TabsContext value={{ value: activeValue, select, baseId }}>
      <div className="tabs">{children}</div>
    </TabsContext>
  );
}
