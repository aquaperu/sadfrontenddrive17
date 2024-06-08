import { ChangeDetectionStrategy, Component, OnInit, Output, TemplateRef, ViewChild, EventEmitter,ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { createForm, FormType, subformComponentProviders } from 'ngx-sub-form';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { IDynamicDialogConfig, ReusabledialogComponent } from '../reusabledialog/reusabledialog.component';
import { ReusablebottomsheetComponent } from '../reusablebottomsheet/reusablebottomsheet.component';
import { IObra, ObraService } from './obra.service';
import { ValorizacionService } from '../valorizacion/valorizacion.service';
import { getObraid, setObraId } from '../../global/ajusteGlobal';
import { parametros } from '../../global/parametroGlobal';
import { importaHojasXls } from '../../funcionesComunes/importarHojas';
import { restendpoint } from '../../endpoint/restendpoint';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CommonModule, NgStyle } from '@angular/common';


interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export interface obraPartialForm{
  alias:string;
  tipologia:string
}
interface  IConfigViews{
  activateMetadiaria:boolean,
  activateConfiguracion:boolean,
  formdata?:any
}

@Component({
  selector: 'app-mainobra',
  standalone: true,
  imports: [
    MatDividerModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule,
    MatListModule,
    NgStyle
  ],
  templateUrl: './obra.component.html',
  styleUrl: './obra.component.css'
})
export class ObraComponent implements OnDestroy {

  loading: boolean = false;
  photoSelected: string | ArrayBuffer | null;

  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  file: File | null = null; // Variable to store file
  

  @Output('valueResponse')valueResponse:EventEmitter<IConfigViews> = new EventEmitter()


  
  //maneja un dialog de tipo bottom
  @ViewChild('dialogoPostRegistroObra')  dialogoPostRegistroObra: TemplateRef<any> | undefined;
  
  @ViewChild('warningDialog')  warningDialog: TemplateRef<any> | undefined;

  bottomSheetRef = {} as MatBottomSheetRef<ReusablebottomsheetComponent>

  public form = createForm<obraPartialForm>(this,{
    formType:FormType.SUB,
    formControls:{
      alias: new UntypedFormControl(),
      tipologia:new UntypedFormControl()
    }
  })

  constructor(
      public dialog: MatDialog,
      private router:Router,
      private obraService:ObraService,
      private cdr: ChangeDetectorRef,

  ){ }
  //ayuda a emitir el evento hacie el padre, despues que el usuario acepta 
  //el cuadro de dialogo
  ngOnDestroy(): void {
    this.valueResponse.emit({
      activateConfiguracion:false,
      activateMetadiaria:true,
      formdata:this.form.formGroup.value.alias
    })
    this.openWarninDialog()
  }
  async ngOnInit() {
    
    //inserta las siguientes hojas dentro del archivo nuevo
    //haciedno de esta manera que el archivo excel administrado por el sistema
    
    /*await importaHojasXls(`${restendpoint.base}${restendpoint.obra.descargarplantilla}`,
    [
      parametros.hojasXLS.nombre.CONFIGURACION,
      parametros.hojasXLS.nombre.PRESUPUESTOCONTRACTUAL,
      parametros.hojasXLS.nombre.CALENDARIOVALORIZADOAVANCEOBRA,
      parametros.hojasXLS.nombre.INDICEVALORIZACION,
      
    ])*/
    
  
    
    
  
  }
  
  //por lo visto en excel, para que rutee despues de haber llamado al dialog, lo unico que
  //se tiene que poner en la ruta.
  async creaObra(){

    //trabajando con las imagen
    if (this.file) {
      const formData = new FormData();
  
      
    
    //fin de las imagenes
  
  const cuerpoExtra = [
    //el orden importa, puesto que se llenará en el mismo orden en el back 
    
    [this.form.formGroup.value.alias],
    [this.form.formGroup.value.tipologia]
  ]
  
  
  /*let body = await capturaDatosPrincipalesXls()
 
  if(body[33] == ''){
    body[33]=[0]//adelanto directo
  }
  if(body[34] == ''){
    body[34]=[0]//adelanto de materiales
  }

  body = body.concat(cuerpoExtra)
 
*/
  
  
      this.status = 'uploading';
      const obraId = '65d91ea6cc44ee97bd625b0d'//await getObraid() habilitar cuando se trabaja desde produccion
      
      formData.append('file', this.file, this.file.name);
      formData.append('obraId',obraId )

this.loading = true
 this.obraService.registraObra(formData).subscribe({
    //deberia registrar la obra del usuario logeado
    next: async( obra:IObra)=> {//respuesta del servidor 
      this.loading = false
      console.log({"respuesta del servidor en mainobra":obra})
     
      //dialogo de informacion de creacion de las hojas

      //this.openYesNoDialog()
      //this.openWarninDialog()
      //controla el renderisado de los botones de las apps
      //se llamó desde dashboard, entonces la respuesta tambien es a dashboard

      /*this.valueResponse.emit({
        activateConfiguracion:false,
        activateMetadiaria:true,
      })*/
      

          //await setObraId(obra.obraId)habilitar cuando se trabaja de modo normal
    },
    error:(err:any)=> {
      console.error(err)
    
    },
    complete:async()=> {
      /*this.valueResponse.emit({
        activateConfiguracion:false,
        activateMetadiaria:true,
        formdata:this.form.formGroup.value.alias
      })*/
      //this.router.navigate(['dashboard/main']);
      
    },
 });
}
    
  }
  
  /**
   * metodo que muestra la advertencia de uso de S.A.D
   * @param event 
   */
  openWarninDialog() {

    const dialogRef = this.dialog.open(ReusabledialogComponent, {//cambiar por otro de formulario 
      width: '290px',
    
      panelClass: 'panelclassdialog',
      //en la configuracion de data, tambien se puede enviar el alto del contenido mat-dialog-content
      //matdialogcontent_height:'121px', está solo configurado para yesNoTemplateValorizacion 
      data: <IDynamicDialogConfig>{
        title: 'Información',
        //por medio del atributo dialog content el componente DialogsinoComponent renderizara el contenido 
        dialogContent: this.warningDialog, 
        acceptButtonTitle: 'Ok',
        //declineButtonTitle: 'No!'
        matdialogcontent_height:'200px'
      }
    });

    dialogRef.afterClosed().subscribe( async(result) => {
      
      if (!result) return;
      console.log(result)
      //configurar el calendario valorizaco de avance de obra
      //cada selda es un mes empezando por "G"
      //peligro, el codigo de importar hoja, no me permite la lectura con await
      //por ahora el cronograma se copiará tal cual está en el excel contractual
      
      
      
    })
  }

  onChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      
      // image preview
      const reader = new FileReader();
      reader.onload = (e:any) => {
        this.photoSelected = reader.result;
        this.cdr.detectChanges();// poner este codigo cuando se usa la estrategia de deteccion push
      } 
      
      reader.readAsDataURL(this.file);
      
      
    }
  }

 

  async onPhotoSelected(event: HtmlInputEvent) {
    
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      
      // image preview
      const reader = new FileReader();
      reader.onload = (e:any) => {
        this.photoSelected = reader.result;
        this.cdr.detectChanges();// poner este codigo cuando se usa la estrategia de deteccion push
      } 
      
      reader.readAsDataURL(this.file);
      
      
    }
   
  }

}
