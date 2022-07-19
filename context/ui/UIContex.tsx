import { createContext } from 'react';

interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;  
  isDragging: boolean;
  // Methods
  closeSideMenu: () =>  void; 
  openSideMenu: () =>  void; 

  setIsAddingEntry: (data: boolean) => void; 

  toggleDragging: (dragging: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);