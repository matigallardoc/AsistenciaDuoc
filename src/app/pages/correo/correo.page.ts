import { TranslateModule } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, IonicModule } from '@ionic/angular';
import { IonHeader, IonTitle, IonContent, IonToolbar, IonButton, IonFooter, IonLabel, IonCard, IonItem, IonInput, IonIcon} from '@ionic/angular/standalone'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { User } from 'src/app/model/user';
import { DatabaseService } from 'src/app/services/database.service';
import { arrowBackOutline, logOut, logOutOutline, qrCodeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonHeader, IonTitle, IonContent, IonToolbar, IonButton, IonFooter, IonLabel, IonCard, IonItem, IonInput, 
    CommonModule, FormsModule, HeaderComponent, IonIcon, TranslateModule]
})
export class CorreoPage implements OnInit {

  public usuario: User;
  public email: string ='';
  public cuenta: string = '';
  
  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private databaseService: DatabaseService,
    private authService: AuthService
  ) { 
    this.usuario = new User();
    addIcons({ logOutOutline, qrCodeOutline });
    this.email = 'atorres@duocuc.cl';
  }

  ngOnInit() {
  }

  // async validarCorreo() {
  //   // Validar el formato del correo
  //   if (!this.isValidEmail(this.correo)) {
  //     await this.mostrarMensajeEmergente('Por favor, introduce un correo electrónico válido.');
  //     return;
  //   }

  //   if (this.correo) {
  //     try {
  //       // Busca el usuario en la base de datos
  //       const user = await this.databaseService.findUserByEmail(this.correo);

  //       // Si no se encuentra un usuario, navega a la página "incorrecto"
  //       if (!user) {
  //         console.log('Correo no encontrado, navegando a incorrecto.');
  //         await this.mostrarMensajeEmergente('Correo no encontrado.');
  //         this.router.navigate(['/incorrecto']);
  //       } else {
  //         console.log('Usuario encontrado, navegando a pregunta.');
  //         this.router.navigate(['/pregunta']);
  //       }
  //     } catch (error) {
  //       console.error('Error al validar correo:', error);
  //       await this.mostrarMensajeEmergente('Error al validar el correo. Inténtalo de nuevo.');
  //     }
  //   }
  // }

  // Método para validar el formato del correo
  // isValidEmail(email: string): boolean {
  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailPattern.test(email);
  // }

  async mostrarMensajeEmergente(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 2000,
    });
    toast.present();
  }

  logout() {
    this.authService.logout();
  }

  ingresar() {
    this.authService.olvideContraseña(this.email);
  }
}