import { UIState } from './';
import { UITypes } from "../../types/ui"

type UIActionType = 
  | { type: UITypes.openSidebar}  
  | { type: UITypes.closeSidebar}
  | { type: UITypes.toggleIsAddingEntry, payload: boolean}
  | { type: UITypes.toggleIsDragging, payload: boolean};

export const uiReducer = ( state: UIState, action: UIActionType ): UIState => {
  
  switch (action.type) {
    case UITypes.openSidebar:
    
      return {
        ...state,
        sidemenuOpen: true
    }
    
    case UITypes.closeSidebar:
      return {
        ...state,
        sidemenuOpen: false
    }      

    case UITypes.toggleIsAddingEntry:
      return {
        ...state,
        isAddingEntry: action.payload
      }

    case UITypes.toggleIsDragging: 
      return {
        ...state,
        isDragging: action.payload
      }
  
    default:
      return state;
  }
}