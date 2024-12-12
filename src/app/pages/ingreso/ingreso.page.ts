import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AnimationController,ToastController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader,
  IonItem, IonInput, IonIcon, IonGrid, IonRow, IonCol, IonButton, IonLabel, IonToolbar
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { addIcons } from 'ionicons';
import { eye, eyeOff } from 'ionicons/icons';
import { showToast } from 'src/app/tools/message-functions';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { colorWandOutline } from 'ionicons/icons';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { QrWebScannerComponent } from 'src/app/components/qr-web-scanner/qr-web-scanner.component';
import { Capacitor } from '@capacitor/core';
import { ScannerService } from 'src/app/services/scanner.service';
import { Dinosaur } from 'src/app/model/dinosaur';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [IonHeader, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader,
    IonItem, IonInput, IonIcon, IonGrid, IonRow, IonCol, IonButton, IonLabel,
    FormsModule, CommonModule, LanguageComponent, IonToolbar, TranslateModule,FooterComponent,QrWebScannerComponent
  ]
})
export class IngresoPage implements OnInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild(FooterComponent) footer!: FooterComponent;
  selectedComponent = 'welcome';
  public cuenta: string = '';
  public password: string = '';
  public passwordVisible: boolean = false;


  constructor(
    private router: Router
  , private activatedRoute: ActivatedRoute
  , private authService: AuthService
  , private animationController: AnimationController,
  private scanner: ScannerService) {
    addIcons({ eye, eyeOff, colorWandOutline });
    this.cuenta = 'atorres';
    this.password = '1234'; 
  }

  ngOnInit(
  ) {
  }

  navigateTheme() {
    this.router.navigate(['/theme']);
  }


  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(10000)
        .fromTo('transform', 'translate(-100%)', 'translate(100%)')
        .fromTo('opacity', 1, 1);

      animation.play();
    }
  }

  ingresar() {
    this.authService.login(this.cuenta, this.password);
    
  }

  creaTuCuenta() {
    showToast('Funcionalidad aún no implementada');
  }

  public togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  webQrStopped() {
    this.footer.segmentChanged('welcome');
  }
  async startQrScan() {
    if (Capacitor.getPlatform() === 'web') {
      this.selectedComponent = 'qrwebscanner';
    } else {
      this.showDinoComponent(await this.scanner.scan());
    }
  }

  startQrTest() {
    this.showDinoComponent(Dinosaur.jsonDinoExample);
  }

  showDinoComponent(qr: string) {
    if (qr === '') {
      this.footer.segmentChanged('welcome');
      return;
    }
    if (Dinosaur.isValidDinosaurQrCode(qr, true)) {
      this.authService.qrCodeData.next(qr);
      this.footer.segmentChanged('dinosaur');
    } else {
      this.footer.segmentChanged('welcome');
    }
  }

  webQrScanned(qr: string) {
    this.showDinoComponent(qr);
  }

  recuperarcontrasena(){
    this.router.navigate(['/correo']);
  }

  ruta(){
    this.router.navigate(['/map']);
  }

  registro(){
    this.router.navigate(['/registrarme']);
  }

}
