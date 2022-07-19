import { useReducer } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { ChildrenProp, Entry } from '../../interfaces';
import { EntriesTypes } from '../../types/entries';

import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'Pending: My first test 1',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      _id: uuidv4(),
      description: 'Pending: My  test 5',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      _id: uuidv4(),
      description: 'In progress: My  test 2',
      status: 'in-progress',
      createdAt: Date.now() - 1000000
    },
    {
      _id: uuidv4(),
      description: 'Completed: My  test 2',
      status: 'completed',
      createdAt: Date.now() - 10000
    },
  ]
}

export const EntriesProvider = ({ children }: ChildrenProp) => {

  const [state, dispatch] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE );
  
  const addNewEntry = ( description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: 'pending'
    }

    dispatch({ type: EntriesTypes.addEntry, payload: newEntry})
  }

  const updateEntry = ( entry: Entry ) => {
    dispatch({ type: EntriesTypes.updatedEntry, payload: entry})
  }
  
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