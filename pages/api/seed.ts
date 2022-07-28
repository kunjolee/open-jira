// Vamos a usar esta ruta solo en desarrollo para agregar datos iniciales para testear

import type { NextApiRequest, NextApiResponse } from 'next';

import { db, seedData } from '../../database';
import { Entry } from '../../models';

type Data = {
  message: string
}

const handler = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

  if (process.env.NODE_ENV === 'production')  {
    return res.status(401).json({ message: 'Cant access to this service in production' })
  }

  await db.connect();
  await Entry.deleteMany(); //Si no agrego un filtro, elmimina todos mis registros de el documento Entry
  await Entry.insertMany( seedData.entries ); //inserta las entradas
    // en este lapso de la conexion y la desconexion puedo hacer cualquier interaccion con la base de datos

  await db.disconnect();


  res.status(200).json({
    message: 'Process done successfully'
  })
};

export default handler;