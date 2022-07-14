import { UIState } from './';
import { UITypes } from "../../types/ui"

type UIActionType = 
  | { type: UITypes.openSidebar}  
  | { type: UITypes.closeSidebar};

export const uiReducer = ( state: UIState, action: UIActionType ): UIState => {
  
  switch (action.type) {
    case UITypes.openSidebar:

    console.log("Deberias entrar?")
    
      return {
        ...state,
        sidemenuOpen: true
    }
    
    case UITypes.closeSidebar:
      return {
        ...state,
        sidemenuOpen: false
    }      
  
    default:
      return state;
  }
}