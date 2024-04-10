enum configuracionObra {
    CELDAOBRAID = "P31",
    DIASCONTRACTUALES = "O12",
    FECHAINICIOCONTRACTUAL = "R11",
    NOMBREHOJACONFIGURACION ="configuracion"
}
enum nombreHojas{
    PRESUPUESTOCONTRACTUAL='presupuesto_contractual',
    PLANIFICAOBRA='planifica_obra',
    CALENDARIOVALORIZADOAVANCEOBRA='calend_valo_avanceobra',
    RESUMENINGRESOSALIDAALMACEN ='resumen_ingreso_salida_almacen',
    INDICEVALORIZACION='indice_valorizacion',
    CONFIGURACION ="configuracion"
}

enum copiaPresupuestoContractualMetaDiaria {
    ETIQUETAPRESUPUESTOINICIO = 'A6',
    ETIQUETAMETADIARIA = "A5"
}

/**
 * son los rangos dentro de la hoja excel que contienen datos
 * A1:F56
 * A57:F100 
 */
const datosObra:string[] = [
    "D3:D7",    //UBICACION GEOGRAFICA
    "E11:E12",  //PROPIETARIO
    "F16:F20",  //CONTRATISTA
    "G24:G34",  //PERSONAL CLAVE
    "G22:G23",  //RESIDENTE DE OBRA
    "G27:G28",  //SUPERVISOR
    "O3:O8",    //EJECUCION
    "R9:R11",   //EJECUCION fechas en formato "mm/dd/yyyy" neesario para los calculos de fechas
    "O12",      //EJECUCION PLAZO DE EJECUCION CONTRACTUAL
    "O13:O18",  //CONTINUACION DE EJECUCION
    "N22:N30",  //INVERSION
    "N33",      //GARANTIA
    "X3:X5",    //COMPONENTE SOCIAL
    "X11:X14",  //SUPERVISION
    "X17:X20",  //ADELANTOS
];

export const parametros = {
    obra:{
        configuracion:configuracionObra,
        datos:datosObra
    },
    hojasXLS:{
        nombre:nombreHojas
    },
    copia:{
        origen:{
            nombreHoja:nombreHojas,
            etiquetaInicio:'A6'
        },
        destino:{
            nombreHoja:nombreHojas,
            etiquedaInicio:'A5'
        }
    },
    reglaValidacionCelda:{
        celda:"E3",
        colorLetra:"blue",
        colorFondo:"red",
        regla:"dom"//aplicable a todo lo que diga "dom"
    }
}