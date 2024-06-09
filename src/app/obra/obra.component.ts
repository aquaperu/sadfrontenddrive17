import {  Component, Output, TemplateRef, ViewChild, EventEmitter,ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { createForm, FormType } from 'ngx-sub-form';
import { MatDialog } from '@angular/material/dialog';
import { IDynamicDialogConfig, ReusabledialogComponent } from '../reusabledialog/reusabledialog.component';
import { IObra, ObraService } from './obra.service';
import { getObraid, setObraId } from '../../global/ajusteGlobal';
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
import { importaHojasXls } from '../../funcionesComunes/importarHojas';
import { restendpoint } from '../../endpoint/restendpoint';
import { parametros } from '../../global/parametroGlobal';
import { capturaDatosPrincipalesXls } from '../../helpers/helperobra/capturaDatosPrincipales';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export interface obraPartialForm{
  alias:string;
  tipologia:string
}
interface IFormObra{
  alias:string;
  tipologia:string;
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
  
  @Output('valueResponse')valueResponse:EventEmitter<IFormObra> = new EventEmitter()
  
  @ViewChild('warningDialog')  warningDialog: TemplateRef<any> | undefined;

  public form = createForm<obraPartialForm>(this,{
    formType:FormType.SUB,
    formControls:{
      alias: new UntypedFormControl(),
      tipologia:new UntypedFormControl()
    }
  })

  constructor(
      public dialog: MatDialog,
      private obraService:ObraService,
      private cdr: ChangeDetectorRef,

  ){ }
  
  /**
   * ayuda a emitir el evento hacia el padre, despues que el usuario acepta 
   * el cuadro de dialogo 
   */
  async ngOnDestroy() {
    this.valueResponse.emit({
      alias:this.form.formGroup.value.alias,
      tipologia:this.form.formGroup.value.tipologia
    })
    await this.creaObra()
    
  }
  async ngOnInit() {
    
    //inserta las siguientes hojas dentro del archivo nuevo
    //haciedno de esta manera que el archivo excel administrado por el sistema
    
    await importaHojasXls(`${restendpoint.base}${restendpoint.obra.descargarplantilla}`,
    [
      parametros.hojasXLS.nombre.CONFIGURACION,
      parametros.hojasXLS.nombre.PRESUPUESTOCONTRACTUAL,
      parametros.hojasXLS.nombre.CALENDARIOVALORIZADOAVANCEOBRA,
      parametros.hojasXLS.nombre.INDICEVALORIZACION,
    ])
  }
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
  
  
  let body = await capturaDatosPrincipalesXls()
 
  if(body[33] == ''){
    body[33]=[0]//adelanto directo
  }
  if(body[34] == ''){
    body[34]=[0]//adelanto de materiales
  }
console.log({"datos capturados":body})
  body = body.concat(cuerpoExtra)
  
      this.status = 'uploading';
      const obraId = await getObraid()
      
      formData.append('file', this.file, this.file.name);
      formData.append('obraId',obraId )

this.loading = true
 this.obraService.registraObra(formData).subscribe({
    //deberia registrar la obra del usuario logeado
    next: async( obra:IObra)=> {//respuesta del servidor 
      this.loading = false
      console.log({"respuesta del servidor en mainobra":obra})
      await setObraId(obra.obraId)
    },
    error:(err:any)=> {
      console.error(err)
    
    },
    complete:async()=> {
      //habilita meta diaria y presupuesto
      
      this.openWarninDialog()
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
    
      panelClass: 'panelclassdialog_warning_sad',
      //en la configuracion de data, tambien se puede enviar el alto del contenido mat-dialog-content
      //matdialogcontent_height:'121px', está solo configurado para yesNoTemplateValorizacion 
      data: <IDynamicDialogConfig>{
        title: 'Información',
        //por medio del atributo dialog content el componente DialogsinoComponent renderizara el contenido 
        dialogContent: this.warningDialog, 
        acceptButtonTitle: 'Ok',
        //declineButtonTitle: 'No!'
        matdialogcontent_height:'210px'
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
