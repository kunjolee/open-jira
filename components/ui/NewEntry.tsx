import { ChangeEvent, useContext, useState } from 'react';

import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

const NewEntry = () => {
  
  // const [isAdding, setIsAdding] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)


  const onTextFieldChanged = (e: ChangeEvent<HTMLInputElement>) => {    
    setInputValue(e.target.value);
  }
  
  const cleanData = () =>{
    setInputValue('');
    setTouched( false );
    setIsAddingEntry( false );
  }

  const onSave = () => {
    if (inputValue.length === 0) return;

    addNewEntry( inputValue );    
    cleanData();
  }


  return (    
    <Box sx={{ marginTop: 2, paddingX: 1  }}>       
      {
        isAddingEntry ? (
          <>
            <TextField 
              fullWidth
              sx={{ marginTop: 2, marginBottom: 1 }}        
              autoFocus
              multiline
              label='New Entry'
              helperText={ inputValue.length <= 0 && touched && 'Insert a value'}
              error={ inputValue.length <= 0 && touched }
              value={ inputValue }
              onChange={ onTextFieldChanged }
              onBlur={ () => setTouched(true) }
            />  
            <Box display='flex' justifyContent='space-between'>
              <Button
                variant='text' 
                onClick = { cleanData }           
              >
                Cancel
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                endIcon={ <SaveOutlinedIcon /> }
                onClick={ onSave } 
              >
                Save
              </Button>
            </Box>
          </>
        ) : 
        (
          <Button 
            startIcon={ <AddIcon /> }
            fullWidth   
            variant='outlined'   
            onClick = {() => setIsAddingEntry(true)}  
          >
            Add Task  
          </Button>             
        )
      }


    </Box>    
  )
}
export default NewEntry