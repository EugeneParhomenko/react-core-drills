import { useRef } from 'react';
import './Tabs.css';
import { useTabsContext } from './TabsContext';

type TabsListProps = {
  children: React.ReactNode;
  'aria-label': string;
};
export function TabsList({ children, 'aria-label': ariaLabel }: TabsListProps) {
  const ctx = useTabsContext('Tabs.List');
  const listRef = useRef<HTMLDivElement>(null);

  const getTabs = (): HTMLButtonElement[] => {
    return Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not([disabled])',
      ) ?? [],
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const tabs = getTabs();
    if (tabs.length === 0) return;
    const currentIndex = tabs.findIndex(
      (tab) => tab.dataset.value === ctx.value,
    );

    let nextIndex: number;
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    nextTab.focus();
    ctx.select(nextTab.dataset.value!);
  };

  return (
    <div
      ref={listRef}
      className="tabs__list"
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}
