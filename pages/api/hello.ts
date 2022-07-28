// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Todo lo que esta en /api corre del lado del servidor

// Al crear mis archivos en la carpeta /api se crea una nueva ruta y puedo hacer en esa ruta todos los metodos, put,post,delete,etc.

// La funcion tiene que exportarse por defecto

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  ok: boolean;
  message: string;
  method: string;
}

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {  

  res.status(200).json({ 
    ok: true,
    message: 'Everything is okay',
    method: req.method || 'There is no method',
  })
}
