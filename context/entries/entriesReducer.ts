import { EntriesState } from './';
import { Entry } from '../../interfaces';
import { EntriesTypes } from '../../types/entries'


type EntriesActionType = 
  | { type: EntriesTypes.addEntry, payload: Entry }
  | { type: EntriesTypes.updatedEntry, payload: Entry }
  | { type: EntriesTypes.refreshData, payload: Entry[] }
  | { type: EntriesTypes.deleteEntry, payload: Entry }


export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

  switch (action.type) {
    case EntriesTypes.addEntry:
      return {
        ...state,
        entries: [...state.entries, action.payload]
      }

    case EntriesTypes.updatedEntry: 
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id){
            entry.status = action.payload.status;
            entry.description = action.payload.description;            
          }
          return entry;
        })
      }

    case EntriesTypes.refreshData:
      return {
        ...state,
        entries: [ ...action.payload ]
      }
    
    case EntriesTypes.deleteEntry: 
      return {
        ...state,  
        entries: state.entries.filter((entry) => entry._id !== action.payload._id)
      }


    default:
      return state;
  }
}