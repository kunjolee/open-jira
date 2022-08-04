import { DragEvent, useContext } from 'react';
import { useRouter } from 'next/router';

import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';
import { dateFunctions } from '../../utils/';

interface Props {
  entry: Entry
}



const EntryCard = ({ entry }: Props) => {

  const { toggleDragging } = useContext( UIContext );
  const router = useRouter();

  const onDragStart = ( event: DragEvent<HTMLDivElement> ) => {    
    event.dataTransfer.setData('text', entry._id);
    // Todo: modificar el estado, para indicar que estoy haciendo drag

    toggleDragging(true);
  }

  const onDragEnd = () => {
    // fin del onDrag
    toggleDragging(false);
  }

  const handleClick = () => {
    router.push(`/entries/${entry._id}`)
  }

  return (
    <Card
      onClick={ handleClick }
      sx={{ marginBottom: 1 }}
      // Eventos drag

      draggable
      onDragStart={ onDragStart }
      onDragEnd={ onDragEnd }
    >
      <CardActionArea >
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>{ dateFunctions.getFormatDistanceToNow( entry.createdAt ) }</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
export default EntryCard