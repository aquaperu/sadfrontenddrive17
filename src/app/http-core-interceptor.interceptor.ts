import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { catchError, throwError } from 'rxjs';
export const httpCoreInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('token');
  console.log(authToken)
  // interceptor que habilita el cors en el cliente de donde está corriendo , tambien debe estar registrado en el servidor
  //la otra opcion es crear un archivo proxy.config.js , poner el siguiente contenido, es el servidor de front end
  /**
   * 
   * const PROXY_HOST = 'https://4200-idx-sadfrontenddrive17-1717536473815.cluster-m7tpz3bmgjgoqrktlvd4ykrc2m.cloudworkstations.dev/';
const PROXY_CONFIG = [
    {
        context:['./'],
        target:PROXY_HOST,
        secure:false
    }
];
module.exports = PROXY_CONFIG

seguidamente ponerlo en angular.json
en la seccion  "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "proxyConfig": "proxy.conf.js"
          },

   */
  // Clone the request and add the authorization header
  const authReq = req.clone({
    /*setHeaders: {
      'Content-Type':'application/json',
      
      'Access-Control-Allow-Origin': 'https://4200-idx-sadfrontenddrive17-1717632774583.cluster-kc2r6y3mtba5mswcmol45orivs.cloudworkstations.dev/',
      //https://4200-idx-sadfrontenddrive17-1717632774583.cluster-kc2r6y3mtba5mswcmol45orivs.cloudworkstations.dev/autenticar/login
     
      Authorization: `Bearer ${authToken}`
    }*/
    headers: req.headers
    .set('authorization', `${authToken}`)
    //.set('Access-Control-Allow-Origin','https://4200-idx-sadfrontenddrive17-1717632774583.cluster-kc2r6y3mtba5mswcmol45orivs.cloudworkstations.dev/')
    //.set('Content-Type','application/json')
  });
  console.log({"llamando desde el interceptor":authToken})

  // Pass the cloned request with the updated header to the next handler
  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          // Specific handling for unauthorized errors         
          console.error('Unauthorized request:', err);
          // You might trigger a re-authentication flow or redirect the user here
        } else {
          // Handle other HTTP error codes
          console.error('HTTP error:', err);
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err); 
    })
  );;
};
