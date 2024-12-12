import { DatabaseService } from './../../services/database.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonicModule } from '@ionic/angular';
import { arrowBackOutline, logOut, logOutOutline, qrCodeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { EducationalLevel } from 'src/app/model/educational-level';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IonItem, IonInput, IonLabel, IonSelectOption, IonSelect, IonButton } from '@ionic/angular/standalone';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'; 
import { showToast } from 'src/app/tools/message-functions';


@Component({
  selector: 'app-registrarme',
  templateUrl: './registrarme.page.html',
  styleUrls: ['./registrarme.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ]
})
export class RegistrarmePage implements OnInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  @ViewChild('itemCuenta', { read: ElementRef }) itemCuenta!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
  @ViewChild('itemDateOfBirth', { read: ElementRef }) itemDateOfBirth!: ElementRef;

  user: User = new User();
  public listaNivelesEducacionales = EducationalLevel.getLevels()
  repeatPassword: string = '';

  constructor(
    private auth: AuthService,
    private databaseService: DatabaseService,
  ) { 
    addIcons({ logOutOutline, qrCodeOutline }); 
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

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
        !this.repeatPassword ||
        !this.user.educationalLevel) {
        
        // Mostrar un mensaje de error al usuario
        console.error("Por favor, complete todos los campos obligatorios.");
        showToast("Por favor, complete todos los campos obligatorios.");
        return; // Detener la ejecución si hay campos vacíos
    }

    if (this.user.password !== this.repeatPassword) {
      console.error("Las contraseñas no coinciden.");
      showToast("Las contraseñas no coinciden.");
      return; // Detener la ejecución si las contraseñas no coinciden
    }

    // Envía los datos del usuario a la API
    this.databaseService.saveUserRegistro(this.user);
    this.auth.logoutDatosActualizados();

    // Puedes agregar aquí cualquier lógica adicional que necesites después de guardar
}

}
