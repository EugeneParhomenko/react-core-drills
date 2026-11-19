import { createContext, useContext } from 'react';

type TabsContextType = {
  value: string;
  select: (value: string) => void;
  baseId: string;
};

export const TabsContext = createContext<TabsContextType | null>(null);

export function useTabsContext(componentName: string) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`<${componentName}> must be used inside <Tabs>`);
  return ctx;
}
