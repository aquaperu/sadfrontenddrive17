import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppFormComponent } from "./app-form/app-form.component";
import { Observable, Subject } from 'rxjs';

interface Person{
  id:string;
  firstName:string;
}

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, AppFormComponent]
})
export class AppComponent {
  title = 'sadfrontenddrive17';
  public person$:Observable<Person> = new Subject();
  
}
