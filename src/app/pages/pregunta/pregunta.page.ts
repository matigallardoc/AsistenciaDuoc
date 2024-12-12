import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {IonTitle, IonContent, IonToolbar, IonButton, IonFooter, IonCard, IonCardTitle, IonCardSubtitle, IonInput, IonHeader } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { arrowBackOutline, logOut, logOutOutline, qrCodeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { DatabaseService } from './../../services/database.service';

import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { EducationalLevel } from 'src/app/model/educational-level';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'; 


@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonHeader, IonTitle, IonContent, IonToolbar, IonButton, IonFooter, IonCard, IonCardTitle, 
    IonCardSubtitle, IonInput, HeaderComponent, FormsModule, CommonModule, TranslateModule]
})
export class PreguntaPage implements OnInit {

  user: User = new User();
  public correo: string ='';
  respuesta: string='';
  
  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private databaseService: DatabaseService,
  ) { 
    this.auth.authUser.subscribe((user) => {
      console.log(user);
      if (user) {
        this.user = user;
      }
    });
    addIcons({ logOutOutline, qrCodeOutline });
  }

  ngOnInit() {
    this.respuesta = '';
  }

  public capturarRespuesta(event: any): void {
    this.respuesta = event.target.value; // Asigna el valor del input a la variable respuesta
  }

  public validarRepuestaSecreta(): void{
    if(this.user.secretAnswer === this.respuesta) {
      this.router.navigate(['/correcto']);
      console.log("hola correcto")
    }else{
      this.router.navigate(['/incorrecto']);
      console.log("hola incorrecto")
    }
  }


  logout() {
    this.auth.logout();
  }

}
