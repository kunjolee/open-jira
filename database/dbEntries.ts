import { isValidObjectId } from 'mongoose';
import { Entry, IEntry } from '../models';
import { db } from './'

export const getEntryById = async ( id: string ): Promise<IEntry | null> => {

  if (!isValidObjectId(id)) return null;
  

  db.connect();
  const entry = await Entry.findById(id).lean();
  db.disconnect();    

  return JSON.parse( JSON.stringify( entry ) );
}