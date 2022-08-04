import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
  | { message: string }
  | IEntry

export default function handler ( req: NextApiRequest, res: NextApiResponse<Data> ) {

  const { id } = req.query; //siempre son strings

  if ( !mongoose.isValidObjectId(id) ) {
    return res.status(400).json({ message: 'invalid id: ' + id })
  }
  
  switch ( req.method ) {
    case 'PUT':      
      return updateEntry( req, res );
    
    case 'GET': 
      return getEntryById( req, res );
   
    case 'DELETE': 
      return deleteEntry( req, res );

    default:
      return res.status(400).json({ message: 'invalid method' });
  }

}

const getEntryById = async ( req: NextApiRequest, res: NextApiResponse ) => {
  const { id } = req.query;  

  db.connect();
  const entryInDB = await Entry.findById(id);
  db.disconnect();
  
  if ( !entryInDB ) {    
    db.disconnect();
    return res.status(400).json({ message: 'there is no entry with that ID: ' + id });
  } 
  


  res.status(200).json(entryInDB);

}

const updateEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {  
  const { id } = req.query;  

  await db.connect();

  const entryToUpdate = await Entry.findById( id );
  
  if ( !entryToUpdate ) {
    await db.disconnect();
    return res.status(400).json({ message: 'there is no entry with that ID: ' + id});
  }
  
  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status
  } = req.body;

  let options = {
    runValidators: true,
    new: true
  }

  try {
    const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, options );          
    await db.disconnect();
    res.status(200).json(updatedEntry!);
    
  } catch (error: any) {
    await db.disconnect();
    
    res.status(400).json({ message: JSON.stringify(error.errors.status.message) })
  }        

}

const deleteEntry = async (req: NextApiRequest , res: NextApiResponse<Data> ) => {
  const { id } = req.query;    

  await db.connect();

  const entryToDelete = await Entry.findById( id );

  if ( !entryToDelete ) {
    await db.disconnect();
    return res.status(400).json({ message: 'there is no entry with that ID: ' + id });
  }
  
  try {
    const deletedEntry = await Entry.findByIdAndDelete(id, { new: true });
        
    await db.disconnect();
    res.status(200).json( deletedEntry! );
    
  } catch (err) {

    await db.disconnect();
    console.log('Something went wrong while deleting entry',err)
  }
}

