import { useEffect, useReducer } from 'react';

import { entriesApi } from '../../apis';

import { ChildrenProp, Entry } from '../../interfaces';
import { EntriesTypes } from '../../types/entries';

import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: []
}

export const EntriesProvider = ({ children }: ChildrenProp) => {

  const [state, dispatch] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE );
  
  const addNewEntry = async ( description: string) => {

    const { data } = await entriesApi.post<Entry>('/entries', { description });
    dispatch({ type: EntriesTypes.addEntry, payload: data });
    
  }

  const updateEntry = async ( { _id, description, status }: Entry ) => {
    try {

    const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
      dispatch({ type: EntriesTypes.updatedEntry, payload: data });
            
    } catch (error) {
      console.log({ error })
    }

  }
  
  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')        
    dispatch({ type: EntriesTypes.refreshData, payload: data })
  }

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider value={{
      ...state,
      // 
      addNewEntry,
      updateEntry
    }}>
      { children }
    </EntriesContext.Provider>
  )
}