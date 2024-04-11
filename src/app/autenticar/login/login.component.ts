import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { createForm, FormType, subformComponentProviders } from 'ngx-sub-form';
import { Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { UsuarioService, loginForm } from '../usuario.service';
import { ErrorpersonalizadoService } from '../errorpersonalizado.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


export interface confMsg{
  title:string;
  typeMsg:string;
  msg:string;
  panelClass:string;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}]
})
export class LoginComponent {
  
  subscription: Subscription
  message:confMsg

  email: string = '';
  password: string = '';
  loading: boolean = false;

  
  constructor(
    private toastr: ToastrService,
    private _userService: UsuarioService,
    private router: Router,
    private _errorService: ErrorpersonalizadoService,
    
    
    
  ) { }

  public form = createForm<loginForm>(this,{
    formType:FormType.SUB,
    formControls:{

      email:new UntypedFormControl(null),
      password: new UntypedFormControl(null)
    }
  })

  login(){
     // Validamos que el usuario ingrese datos
     if (this.form.formGroup.value.email == null || this.form.formGroup.value.password == null) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      

      return
    }

    // Creamos el body
    const usuario: loginForm = {
      email: this.form.formGroup.value.email,
      password: this.form.formGroup.value.password,
    }

    this.loading = true;
    /*this.subscription = this._userService.login(usuario).subscribe({
      next: (payload:any) => {//respuesta del servidor
        //habilitar un spinner
        this.loading = false

        localStorage.setItem('token', payload.token);
        this.router.navigate(['dashboard/main'])
      },
      error: (e: HttpErrorResponse) => {
        
        this.toastr.error(traductor(e.error.message), 'Error');
        return
      },
      complete() {
        
        console.log('Login completado satisfactoriamente')
      },
    })*/
    this.loading = false
    this.router.navigate(['dashboard/main'])

    
    

  }
  register(){
    this.router.navigate(['autenticar/registrar'])
  }
  

}


function traductor(e:string):string{

  const configuracion:any = {
      USER_NOT_FOUND:"Usuario no Registrado"

  }
  return configuracion[e]

}