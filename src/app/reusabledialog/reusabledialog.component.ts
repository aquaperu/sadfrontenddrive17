import { Component,Inject,ElementRef, TemplateRef, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormanimalComponent } from '../formanimal/formanimal.component';

//configiracion que permite manejar las partes del cuadro de dialogo
export interface IDynamicDialogConfig {
  title?: string;
  acceptButtonTitle?: string;
  declineButtonTitle?: string;
  dialogContent: TemplateRef<any>;
  matdialogcontent_height:string;
  matdialogcontent_width:string;
}
//confirguracion que permite tener el 100% de pantalla para el dialog
export const configBase =  {
  maxWidth:"100vw",
  width: '100vw',
  height: '100%',
  panelClass:'panelclassdialog',
  enterAnimationDuration:'500ms',
  exitAnimationDuration:'500ms',      
}

@Component({
  selector: 'app-reusabledialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormanimalComponent],
  templateUrl: './reusabledialog.component.html',
  styleUrl: './reusabledialog.component.css'
})
export class ReusabledialogComponent {
  constructor(
    private elementRef:ElementRef,
    public dialogRef: MatDialogRef<ReusabledialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDynamicDialogConfig) {
    data.acceptButtonTitle ?? 'Yes';
    data.title ?? 'Unnamed Dialog';
    //gestiona el ancho y el alto del cuadro de dialogo
    data.matdialogcontent_height ?? '121px';
    data.matdialogcontent_width ?? '221px';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    
    this.elementRef.nativeElement.style.setProperty('--matdialogcontent-height',this.data.matdialogcontent_height)
    this.elementRef.nativeElement.style.setProperty('--matdialogcontent-width',this.data.matdialogcontent_width)
  }
  hijo(miVar:string){
    console.log({"disparador":miVar})
  }
}
