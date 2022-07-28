import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware (req: NextRequest) {
  
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/api/entries/')) {

    const id = pathname.replace('/api/entries/', '');    
    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    if ( !checkMongoIDRegExp.test( id ) ) {
      // Invalid mongo ID

      const url = req.nextUrl.clone();

      url.pathname = '/api/bad-request'
      url.search=`?message='${ id } is not a valid mongoID'`      

      return NextResponse.rewrite(url);
    }    
    
  } 
    
  return NextResponse.next();
}


export const config = {
  matcher: [
    '/api/entries/:path',    
  ]
  
}