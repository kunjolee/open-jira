import type { NextPage } from 'next';

import { Card, CardHeader, Grid } from '@mui/material';

import { Layout } from '../components/layouts';
import { EntryList, NewEntry } from '../components/ui';


const HomePage: NextPage = () => {
  
  return (
    <Layout title='Open Jira'>
      <Grid container spacing={ 2 }>

        <Grid item xs={ 12 } sm={ 6 } md={ 4 }  >
          <Card sx={{ height: 'calc( 100vh - 100px )' }} >
            <CardHeader title='Pending' /> 
            <NewEntry />                         
            <EntryList status='pending'/>            
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
          <Card sx={{ height: 'calc( 100vh - 100px )' }}>
            <CardHeader title='In progress' />              
            <EntryList status='in-progress'/>
          </Card>
        </Grid>


        <Grid item xs={ 12 } sm={ 6 } md={ 4 } >
          <Card sx={{ height: 'calc( 100vh - 100px )' }}>
            <CardHeader title='Completed' />
            <EntryList status='completed'/>
          </Card>
        </Grid>


      </Grid>
    </Layout>
  )
}

export default HomePage
