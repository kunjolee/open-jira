import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';

import { useSnackbar } from 'notistack';


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
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const addNewEntry = async ( description: string) => {

    const { data } = await entriesApi.post<Entry>('/entries', { description });
    dispatch({ type: EntriesTypes.addEntry, payload: data });
    
  }

  const updateEntry = async ( { _id, description, status }: Entry, showSnackbar = false ) => {
    try {

    const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
      dispatch({ type: EntriesTypes.updatedEntry, payload: data });
      
      if (showSnackbar) {
        enqueueSnackbar( 'Entry updated successfully' , {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
          }
        });

        router.push('/');
      }

    } catch (error) {
      console.log({ error })
    }

  }
  
  const deleteEntry = async ( _id: string ) => {

    try {
      const { data } = await entriesApi.delete<Entry>(`/entries/${_id}`);            

      dispatch({ type: EntriesTypes.deleteEntry, payload: data });

      enqueueSnackbar( 'Entry deleted successfully' , {
      variant: 'error',
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
      });

      router.push('/');

    } catch (err) {
      console.log(err);
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
      updateEntry,
      deleteEntry
    }}>
      { children }
    </EntriesContext.Provider>
  )
}