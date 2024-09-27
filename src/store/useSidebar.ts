import { Group } from '@/types/TMenu';
import { create } from 'zustand';

import { createJSONStorage, persist } from 'zustand/middleware';

import { getMenuList } from '@/lib/mocks/menu-list.mock';

type SidebarState = {
  isOpen: boolean;
  menu: Group[];
};

type SidebarActions = {
  setIsOpen: () => void;
};

const InitialState: SidebarState = {
  isOpen: false,
  menu: getMenuList(),
};

export const useSidebar = create<SidebarState & SidebarActions>()(
  persist(
    (set, get) => ({
      ...InitialState,
      setIsOpen: () => {
        set({ isOpen: !get().isOpen });
      },
    }),
    {
      name: 'sidebar',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
