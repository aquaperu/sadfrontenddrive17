import { Component, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import { FormType, createForm } from 'ngx-sub-form';
import { Subject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
interface Person{
  id:string;
  firstName:string;
}
@Component({
  selector: 'formanimal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,MatInputModule,MatButtonModule, MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './formanimal.component.html',
  styleUrl: './formanimal.component.css'
})
export class FormanimalComponent {
  public form = createForm<Person>(this,{
    formType:FormType.SUB,
    /*disabled$:this.disabled$,
    input$:this.input$,
    output$:this.personUpdate,*/
    formControls:{
      id:new FormControl(null),
      firstName: new FormControl(null)
    },
  });

}
