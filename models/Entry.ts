import mongoose, { Model, Schema } from 'mongoose';
import { Entry } from '../interfaces';

export interface IEntry extends Entry { }

const entryModel = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'completed'],
      message: '{VALUE} is not a permitted state',      
    },
    default: 'pending'
  }
});

// El nombre del modelo es el que se le dará a la colección, pero el nombre se convertirá en plural


const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entryModel);


export default EntryModel;