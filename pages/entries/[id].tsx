import { ChangeEvent, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material';

import SaveIcon from '@mui/icons-material/SaveAltOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { dbEntries } from '../../database';
import { Layout } from '../../components/layouts';
import { Entry, EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'completed']

interface Props {
  entry: Entry;
}

const EntryPage = ({ entry }:Props) => {

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);
  
  const { updateEntry, deleteEntry } = useContext(EntriesContext)
  
  const isNotValid = useMemo(() => inputValue.length <=0 && touched, [inputValue,touched]);

  const onInputChanged = (e: ChangeEvent<HTMLInputElement>) => {    
    setInputValue(e.target.value);
  }

  const onStatusChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus);
  }  
  
  const onSave = () => {

    if ( inputValue.length === 0 ) return;

    const updatedEntry = {
      ...entry,
      description: inputValue,
      status
    };
    
    updateEntry( updatedEntry, true );
    
  }   

  const onDelete = ( _id: string ) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteEntry( _id );
    }
  }

  return (
    <Layout title={ inputValue.substring(0,20) + '...' }>
      <>
        <Grid
          container
          justifyContent='center'
          sx={{ marginTop: 2 }}
        >
          <Grid item xs={ 12 } sm={ 8 } md={ 6 } >
            <Card>

              <CardHeader
                title={'Entry:'}
                subheader={`Created ${ dateFunctions.getFormatDistanceToNow( entry.createdAt ) }`}
              />                          

              <CardContent>
                <TextField
                  sx={{ marginTop: 2, marginBottom: 1 }}
                  fullWidth
                  placeholder='New Entry'
                  autoFocus
                  multiline
                  label='New Entry'
                  value={ inputValue }
                  onChange={ onInputChanged }
                  onBlur={ () => setTouched( true ) }
                  helperText={ isNotValid && 'Insert a value' }
                  error={ isNotValid }                  
                />
                
                <FormControl>
                  <FormLabel>Status: </FormLabel>                
                  <RadioGroup
                    row
                    onChange={ onStatusChanged }
                    value={ status } 
                  >
                    {
                      validStatus.map(( option ) => (
                        <FormControlLabel
                          key={ option }
                          value={ option }
                          control={ <Radio /> }
                          label={ capitalize(option) }
                        />
                      ) )
                    }
                  </RadioGroup>
                </FormControl>

                {/* Radio */}
              </CardContent>

              <CardActions>
                <Button
                  startIcon={ <SaveIcon /> }
                  variant='contained'
                  fullWidth  
                  onClick = { onSave }
                  disabled = { inputValue.length <= 0 }
                >
                  Save
                </Button>
              </CardActions>

            </Card>
          </Grid>
        </Grid>

        <IconButton 
          onClick={() => onDelete( entry._id )}
          sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: 'error.dark'          
          }}
        >
          <DeleteIcon />
        </IconButton>      
      </>
    </Layout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ( { params } ) => {
  
  const { id } = params as { id: string };  

  const entry = await dbEntries.getEntryById( id );

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  
  return {
    props: {
      entry
    }
  }
    
}

// El getServerSideProps es similar al getStaticProps, pero la diferencia es que esta funcion sera llamada en cada request de el usuario

// Puede ser usada solo en pages, y se manda a llamar solo en el backend. Genera la informacion del lado del servidor usando server side rendering


export default EntryPage