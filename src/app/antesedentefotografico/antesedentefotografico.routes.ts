import { Routes } from "@angular/router";
import { ListafotografiasComponent } from "./accionescrud/listafotografias/listafotografias.component";
import { FormulariofotografiaComponent } from "./accionescrud/formulariofotografia/formulariofotografia.component";
import { VistapreviafotografiasComponent } from "./accionescrud/vistapreviafotografias/vistapreviafotografias.component";

export const antesedentefotograficoRoutes:Routes = [
    {
        /** dashboard/main/valorizacion/submenu/panelfotografico/antesedentefotografico/fotografias*/
        
        path:'fotografias/:id',
        component:ListafotografiasComponent
      },
      {
        /** dashboard/main/valorizacion/submenu/panelfotografico/antesedentefotografico/formulariofotografia*/
        path:'formulariofotografia/new',
        component:FormulariofotografiaComponent
      },
      {
        /** dashboard/main/valorizacion/submenu/panelfotografico/antesedentefotografico/vistapreviafotografia*/
        path:'vistapreviafotografia',
        component:VistapreviafotografiasComponent
      }
]