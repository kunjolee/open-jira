// Informacion que quiero insertar de forma automatica a mi base de datos, para ayudar a otros desarrolladores
import { Entry } from '../interfaces';


interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry extends Omit<Entry, '_id'> {};


export const seedData: SeedData = {
  entries: [
    {
      description: 'My first test 1',
      status: 'pending',
      createdAt: Date.now()
    },
    {      
      description: 'My  test 5',
      status: 'pending',
      createdAt: Date.now()
    },
    {      
      description: 'My  test 2',
      status: 'in-progress',
      createdAt: Date.now() - 1000000
    },
    {      
      description: 'My  test 3',
      status: 'completed',
      createdAt: Date.now() - 10000
    },
  ]
}
