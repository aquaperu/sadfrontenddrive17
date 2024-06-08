import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';
import { IConfiguracionGlobal } from '../../global/ajusteGlobal';
import { restendpoint } from '../../endpoint/restendpoint';

export interface IObra {
  obraId:number,
  
}
export interface IExcelObraId{
code:string
}

@Injectable({
  providedIn: 'root'
})
export class ObraService {
  obraObject:IConfiguracionGlobal
  constructor(
    private httpClient:HttpClient,
    
  ){  }
/**
 * 
 * @param obraId - Parametro que permite la busqueda en la base de datos
 * @description - Metodo que permite configurar el atributo obraObject del tipo IConfiguracionGlobal
 */
  private transformObraToObject(obraId:number){
    //'https://192.168.1.86:3033/obra/buscaobrabyId/obraId'
    console.log({"url a la que se accede:":`${restendpoint.base}${restendpoint.obra.buscaobrabyId}/${obraId}`})
    this.httpClient.get<IObra>(`${restendpoint.base}${restendpoint.obra.buscaobrabyId}/${obraId}`).subscribe(
      {
        next:(obra:IObra)=> {
          
          
          
        },
        error(err) {
          
        },
        complete() {
          
        },

    })
  }

  registraObra(data:any){
    //https://192.168.1.86:3033/obra/crea'
    return this.httpClient.post<IObra>(restendpoint.base + restendpoint.obra.crea, data)
     .pipe(retry(1), catchError(this.errorHandl))
  }

  private errorHandl(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
  getObraById(obraId:number){
    this.transformObraToObject(obraId)
    return this.obraObject
  }
  
}
