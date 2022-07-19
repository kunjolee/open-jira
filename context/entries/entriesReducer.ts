import { EntriesState } from './';
import { Entry } from '../../interfaces';
import { EntriesTypes } from '../../types/entries'


type EntriesActionType = 
  | { type: EntriesTypes.addEntry, payload: Entry }
  | { type: EntriesTypes.updatedEntry, payload: Entry }


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

    default:
      return state;
  }
}