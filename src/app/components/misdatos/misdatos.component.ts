import { DatabaseService } from './../../services/database.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { IonItem, IonInput, IonLabel, IonSelectOption, IonSelect, IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { EducationalLevel } from 'src/app/model/educational-level';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.scss'],
  standalone: true,
  imports: [IonButton, TranslateModule, IonInput, IonItem, IonLabel, FormsModule,IonSelectOption, 
    CommonModule, MatDatepickerModule, MatInputModule, MatNativeDateModule,
    IonSelect]
})
export class MisdatosComponent implements OnInit {


  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  @ViewChild('itemCuenta', { read: ElementRef }) itemCuenta!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
  @ViewChild('itemDateOfBirth', { read: ElementRef }) itemDateOfBirth!: ElementRef;

  public listaNivelesEducacionales = EducationalLevel.getLevels()

  user: User = new User();

  constructor(private auth: AuthService,
    private databaseService: DatabaseService,
    
  ) { 
    this.auth.authUser.subscribe((user) => {
      console.log(user);
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit() {}

  public actualizarNivelEducacional(event: any) {
    this.user.educationalLevel 
      = EducationalLevel.findLevel(event.detail.value)!;
  }

  


  Actualizar() {
    // Verificar que todos los campos requeridos no estén vacíos
    if (!this.user.userName || 
        !this.user.firstName || 
        !this.user.lastName || 
        !this.user.email || 
        !this.user.address || 
        !this.user.secretQuestion || 
        !this.user.secretAnswer || 
        !this.user.password || 
        !this.user.educationalLevel) {
        
        // Mostrar un mensaje de error al usuario
        this.showErrorMessage("Por favor, complete todos los campos obligatorios.");
        return; // Detener la ejecución si hay campos vacíos
    }
  
    // Validación de formato de email (solo un ejemplo)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.user.email)) {
      this.showErrorMessage("Por favor, ingrese un correo electrónico válido.");
      return;
    }
  
    // Aquí puedes agregar más validaciones si es necesario, como la longitud de la contraseña
  
    // Si todo está bien, envía los datos del usuario a la API
    this.databaseService.saveUser(this.user)
      .then(response => {
        // Si el guardado fue exitoso
        this.auth.logoutDatosActualizados();
        this.showSuccessMessage("Datos actualizados correctamente.");
      })
      .catch(error => {
        // Manejo de errores si la API falla
        this.showErrorMessage("Hubo un error al actualizar los datos. Inténtalo nuevamente.");
        console.error(error); // Log del error para debugging
      });
  }
  
  // Función para mostrar mensajes de error (puedes cambiar esto para usar algún servicio de UI como Toast o Alert)
  showErrorMessage(message: string) {
    // Mostrar un mensaje de error de manera visible para el usuario (a través de un Toast, Modal, etc.)
    alert(message); // Solo para ejemplo
  }
  
  // Función para mostrar mensajes de éxito (de nuevo, cambiarlo por algo más adecuado en tu UI)
  showSuccessMessage(message: string) {
    alert(message); // Solo para ejemplo
  }
  

}
