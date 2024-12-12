import { Component, EventEmitter, Output, ViewChild, OnInit, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { DatabaseService } from './../../services/database.service';
import { DinosaurComponent } from 'src/app/components/dinosaur/dinosaur.component';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { QrWebScannerComponent } from 'src/app/components/qr-web-scanner/qr-web-scanner.component';
import { Dinosaur } from 'src/app/model/dinosaur';
import { Capacitor } from '@capacitor/core';
import { ScannerService } from 'src/app/services/scanner.service';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';
import { ForumComponent } from 'src/app/components/forum/forum.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { IonHeader, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader,
  IonItem, IonInput, IonIcon, IonGrid, IonRow, IonCol, IonButton, IonLabel, IonToolbar,
} from '@ionic/angular/standalone';
import { User } from 'src/app/model/user';
import { Subscription } from 'rxjs';
import { UsuariosComponent } from 'src/app/components/usuarios/usuarios.component';


@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader,
    IonItem, IonInput, IonIcon, IonGrid, IonRow, IonCol, IonButton, IonLabel, IonToolbar, HeaderComponent, FooterComponent, 
    QrWebScannerComponent,WelcomeComponent, DinosaurComponent, ForumComponent,
    TranslateModule, FormsModule, CommonModule, MisdatosComponent, UsuariosComponent
  ]
})
export class InicioPage {
  
  @ViewChild(FooterComponent) footer!: FooterComponent;
  selectedComponent = 'welcome';
  user: User = new User();
  isAdmin: boolean = false;
  private authSubscription: Subscription | undefined;

  constructor(
    private auth: AuthService, 
    private scanner: ScannerService,
    private databaseService: DatabaseService,
    private cdr: ChangeDetectorRef) { 
    this.auth.selectedComponent.subscribe((selectedComponent) => {
      this.selectedComponent = selectedComponent;
    });
    const user = this.auth.getCurrentUser();
    if (user) {
      this.isAdmin = user.isAdmin || false;
      console.log('¿Es admineeee?', this.isAdmin);
    } else {
      console.log('Usuario no encontrado en localStorage');
    } 

    this.auth.authUser.subscribe((user) => {
      console.log(user);
      if (user) {
        this.user = user;
      }
    });

    this.auth.authUser.subscribe((user) => {
      console.log(user);
      if (user) {
        this.user = user;
        this.selectedComponent = 'welcome'; // Cambia a 'inicio' cuando el usuario se loguea
      } else {
        this.selectedComponent = 'welcome'; // Cambia a 'welcome' si el usuario no está autenticado
      }
    });
  }

  ngOnInit(): void {
    // Restaurar el usuario desde el almacenamiento local cuando la aplicación se inicie
    this.authSubscription = this.auth.authUser.subscribe(user => {
      if (user) {
        this.isAdmin = user.isAdmin;  // Actualiza el estado de admin
      } else {
        this.isAdmin = false;  // Si no hay usuario, el estado es false
      }
      this.cdr.detectChanges();
    });

    this.auth.selectedComponent.subscribe((component) => {
      this.selectedComponent = component;  // Esto se actualizará cada vez que cambie selectedComponent
      console.log('Componente seleccionado:', this.selectedComponent);
    });
  }

  ngOnDestroy() {
    // Asegúrate de limpiar la suscripción cuando el componente sea destruido
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }


  startQrTest() {
    this.showDinoComponent(Dinosaur.jsonDinoExample);
  }

  async startQrScan() {
    if (Capacitor.getPlatform() === 'web') {
      this.selectedComponent = 'qrwebscanner';
    } else {
      this.showDinoComponent(await this.scanner.scan());
    }
  }

  webQrScanned(qr: string) {
    this.showDinoComponent(qr);
  }

  webQrStopped() {
    this.footer.segmentChanged('welcome');
  }

  showDinoComponent(qr: string) {
    if (qr === '') {
      this.footer.segmentChanged('welcome');
      return;
    }
    if (Dinosaur.isValidDinosaurQrCode(qr, true)) {
      this.auth.qrCodeData.next(qr);
      this.footer.segmentChanged('dinosaur');
    } else {
      this.footer.segmentChanged('welcome');
    }
  }



}
