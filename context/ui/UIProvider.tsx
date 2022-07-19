import { useReducer } from 'react';

import { UIContext, uiReducer } from './';
import { ChildrenProp } from "../../interfaces"
import { UITypes } from '../../types/ui';

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false
}

export const UIProvider = ({ children }: ChildrenProp) => {

  const [state, dispatch] = useReducer( uiReducer, UI_INITIAL_STATE );

  const openSideMenu = () => {
    dispatch({ type: UITypes.openSidebar })
  }  
  
  const closeSideMenu = () => {
    dispatch({ type: UITypes.closeSidebar })    
  }
  
  const setIsAddingEntry = (data: boolean) => {
    dispatch({ type: UITypes.toggleIsAddingEntry, payload: data })
  }

  const toggleDragging = (dragging: boolean) => {
    dispatch({ type: UITypes.toggleIsDragging, payload: dragging})
  }

  return (
    <UIContext.Provider value={{
      ...state,
      // Methods
      closeSideMenu,
      openSideMenu,

      setIsAddingEntry,

      toggleDragging

    }}>
      { children }
    </UIContext.Provider>
  )
}