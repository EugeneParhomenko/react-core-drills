import { useId, useState } from 'react';
import './Tabs.css';
import { TabsContext } from './TabsContext';

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
