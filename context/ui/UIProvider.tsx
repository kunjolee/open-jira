import { useReducer } from 'react';

import { UIContext, uiReducer } from './';
import { ChildrenProp } from "../../interfaces"
import { UITypes } from '../../types/ui';

export interface UIState {
  sidemenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false
}

export const UIProvider = ({ children }: ChildrenProp) => {

  const [state, dispatch] = useReducer( uiReducer, UI_INITIAL_STATE );


  const openSideMenu = () => {
    dispatch({ type: UITypes.openSidebar })
  }  
  
  const closeSideMenu = () => {
    dispatch({ type: UITypes.closeSidebar })    
  }

  return (
    <UIContext.Provider value={{
      ...state,
      openSideMenu,
      closeSideMenu      
    }}>
      { children }
    </UIContext.Provider>
  )
}