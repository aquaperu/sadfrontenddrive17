import { parametros } from "src/app/global/parametroGlobal";
/**
 * 
 * @returns - Retorna la captura de datos de la hoja "configuracion", en la secuencia en la que la configuracion del parametro.obra.datos se indica.
 */
export async function capturaDatosPrincipalesXls(){
    return await Excel.run(async (context) => {
      
      const sheet = context.workbook.worksheets.getItem(parametros.obra.configuracion.NOMBREHOJACONFIGURACION)
      let cuerpo:any[]=[]
      let myrango:any[]=[]
      
      parametros.obra.datos.map((val,index)=>{
       // if(index === 0){ //UBICACION GEOGRAFICA
          myrango[index] = sheet.getRange(val)
          myrango[index].load('values')
        //}
        /*if(index === 1){ //PROPIETARIO
          myrango[index] = sheet.getRange(val)
          myrango[index].load('values')
        }
        if(index === 2){ //CONTRATISTA
          myrango[index] = sheet.getRange(val)
          myrango[index].load('values')
        }
        if(index === 3){ //PERSONAL CLAVE
          myrango[index] = sheet.getRange(val)
          myrango[index].load('values')
        }
        if(index === 4){ //RESIDENTE DE OBRA
          myrango[index] = sheet.getRange(val)
          myrango[index].load('values')
        }
        if(index === 5){ //SUPERVISOR
          myrango[index] = sheet.getRange(val)
          myrango[index].load('values')
        }
        if(index === 6){ //EJECUCION
          myrango[index] = sheet.getRange(val)
          myrango[index].load('values')
        }
        if(index === 7){ //EJECUCION fechas en formato "mm/dd/yyyy" neesario para los calculos de fechas
          myrango[index] = sheet.getRange(val)
          myrango[index].load('values')
        }
        if(index === 8){ //EJECUCION PLAZO DE EJECUCION CONTRACTUAL
          myrango[index] = sheet.getRange(val)
          myrango[index].load('values')
        }
        if(index === 9){ //CONTINUACION DE EJECUCION
          myrango[index] = sheet.getRange(val)
          myrango[index].load('values')
        }
        if(index === 10){ //INVERSION
          myrango[index] = sheet.getRange(val)
          myrango[index].load('values')
        }
        if(index === 11){ //GARANTIA
          myrango[index] = sheet.getRange(val)
          myrango[index].load('values')
        }
        if(index === 12){ //COMPONENTE SOCIAL
          myrango[index] = sheet.getRange(val)
          myrango[index].load('values')
        }
        if(index === 13){ //SUPERVISION
          myrango[index] = sheet.getRange(val)
          myrango[index].load('values')
        }
        if(index === 14){ //ADELANTOS
          myrango[index] = sheet.getRange(val)
          myrango[index].load('values')
        }*/

          
      })
      
      await context.sync();
      
      myrango.map((val:any)=>{
        console.log(val.values)
        
          cuerpo = cuerpo.concat(val.values)
          
      })
      return cuerpo 
      
    });
  
  }