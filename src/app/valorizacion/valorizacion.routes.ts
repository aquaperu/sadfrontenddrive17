import { Routes } from '@angular/router';
import { ValorizacionComponent } from './valorizacion.component';

export const routesValorizacion: Routes = [
    {
      /**dashboard/main/valorizacion/mainvalorizacion */
      path:'mainvalorizacion',
      component:ValorizacionComponent,
      //para cada app que se encuentra dentro del mainvalorizacion le tiene que corresponder un modulo
      children:[
        {
          /**dashboard/main/valorizacion/mainvalorizacion/panelfotografico */
          path:'panelfotografico',
          loadChildren:()=>import('../panelfotografico/panelfotografico.routes').then(r=>r.routesPanelfotografico),
          
        },
        {
          /*dashboard/main/valorizacion/mainvalorizacion/periodo*/
          path:'periodo',
          loadChildren:()=>import('../periodo/periodo.routes').then(r=>r.periodoRoutes),
        },
        {
          /*dashboard/main/valorizacion/mainvalorizacion/consolidado*/
          path:'consolidado',
          loadChildren:()=>import('../consolidado/consolidado.routes').then(m=>m.routesConsolidado),
        },
        {
          //dashboard/main/valorizacion/mainvalorizacion/indiceseparador
          path:'indiceseparador',
          loadChildren:()=>import('../indiceseparador/indiceseparador.routes').then(r=>r.routesIndiceSeparador),
        },
        {
          //dashboard/main/valorizacion/mainvalorizacion/antesedentefotografico
          path:'antesedentefotografico',
          loadChildren:()=>import('../antesedentefotografico/antesedentefotografico.routes').then(r=>r.antesedentefotograficoRoutes),
        }
      ]
    }
  ];