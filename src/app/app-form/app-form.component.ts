import { HttpClientModule } from '@angular/common/http';
import { Component, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import { FormType, createForm } from 'ngx-sub-form';
import { Subject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';

interface IDynamicDialogConfig {
  title?: string;
  acceptButtonTitle?: string;
  declineButtonTitle?: string;
  dialogContent: TemplateRef<any>;
  matdialogcontent_height:string;
  matdialogcontent_width:string;
}

interface confMsg{
  title:string;
  typeMsg:string;
  msg:string;
  panelClass:string;
  template:TemplateRef<any> | undefined
}

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';

import { FormanimalComponent } from "../formanimal/formanimal.component";
import { ReusabledialogComponent } from '../reusabledialog/reusabledialog.component';
interface Person{
  id:string;
  firstName:string;
}
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
    selector: 'app-app-form',
    standalone: true,
    templateUrl: './app-form.component.html',
    styleUrl: './app-form.component.css',
    imports: [CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose, FormanimalComponent],
    providers:[{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}]
})
export class AppFormComponent {
  panel:Subscription
  @ViewChild('animalDialog')  animalDialog: TemplateRef<any> | undefined;
  @ViewChild('animalformDialog')  animalformDialog: TemplateRef<any> | undefined;
  
  
  private input$: Subject<Person | undefined> = new Subject();
  @Input() set person(person:Person | undefined){
    this.input$.next(person);
  }
  private disabled$ :Subject<boolean> = new Subject();
  @Input() set disabled(value:boolean | undefined){
    this.disabled$.next(!!!value)
  }
  @Output() personUpdate:Subject<Person> = new Subject();

  public form = createForm<Person>(this,{
    formType:FormType.ROOT,
    disabled$:this.disabled$,
    input$:this.input$,
    output$:this.personUpdate,
    formControls:{
      id:new FormControl(null),
      firstName: new FormControl(null)
    }
  })
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}
  

  openDialog(): void {
    /*const dialogRef = this.dialog.open(DialoganimalComponent, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });*/
    const dialogRef = this.dialog.open(ReusabledialogComponent, 
      {
        width: '250px',
        data: <IDynamicDialogConfig>{
        title: 'Meta Diaria',
        dialogContent: this.animalDialog,
        acceptButtonTitle: 'Ok',
        //declineButtonTitle: ''
        }
      });

      this.panel = dialogRef.afterClosed().subscribe(async (result) => {
        if (!result) return;
        console.log(result)
      })
     
  }
  openDialogFormAnimal(): void {
    /*const dialogRef = this.dialog.open(DialoganimalComponent, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });*/
    const dialogRef = this.dialog.open(ReusabledialogComponent, 
      {
        width: '250px',
        data: <IDynamicDialogConfig>{
        title: 'animal form dialog',
        dialogContent: this.animalformDialog,
        acceptButtonTitle: 'Ok',
        //declineButtonTitle: ''
        }
      });

      this.panel = dialogRef.afterClosed().subscribe(async (result) => {
        if (!result) return;
        console.log(result)
      })
     
  }
  

}
