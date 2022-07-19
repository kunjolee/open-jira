import { DragEvent, useContext, useMemo } from 'react';

import { List, Paper } from '@mui/material';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import { EntryStatus } from '../../interfaces';
import { EntryCard } from './';

import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus;
}

const EntryList = ({ status }: Props) => {  
  const { entries, updateEntry } = useContext(EntriesContext);

  const { isDragging, toggleDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(() => entries.filter((entry) => entry.status === status) , [ entries, status ]);
  

  const allowDrop = ( event: DragEvent<HTMLDivElement> ) => {
    event.preventDefault();
  }

  const onDropEntry = ( event: DragEvent<HTMLDivElement> ) => {    
    const id = event.dataTransfer.getData('text');    

    const entry = entries.find(entry => entry._id === id)!;
    
    entry.status = status;

    if (entry) {      
      updateEntry( entry );
      toggleDragging(false);
    }
  }

  
  return (
    <div 
      onDrop={ onDropEntry }
      onDragOver={ allowDrop }
      className={ isDragging ? styles.dragging : '' }
    >
      <Paper 
        sx={{ height: 'calc(100vh - 100px)', overflow: 'scroll', '&::-webkit-scrollbar': { display: 'none' },backgroundColor: 'transparent', padding: '3px 10px' }}
      >
        <List sx={{ opacity: isDragging ? 0.5 : 1, transition: 'all .3s' }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry}/>
          ))}                  
        </List>
      </Paper>
    </div>    
  )
}
export default EntryList