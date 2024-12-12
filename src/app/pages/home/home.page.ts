import { Component, ViewChild } from '@angular/core';
import { DinosaurComponent } from 'src/app/components/dinosaur/dinosaur.component';
import { AuthService } from 'src/app/services/auth.service';
import { IonContent } from '@ionic/angular/standalone'
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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
      CommonModule, FormsModule, TranslateModule, IonContent
    , HeaderComponent, FooterComponent
    , WelcomeComponent, QrWebScannerComponent, DinosaurComponent
    , ForumComponent
  ]
})
export class HomePage {
  
  @ViewChild(FooterComponent) footer!: FooterComponent;
  selectedComponent = 'welcome';

  constructor(
    private auth: AuthService, 
    private scanner: ScannerService) { 
    this.auth.selectedComponent.subscribe((selectedComponent) => {
      this.selectedComponent = selectedComponent;
    });
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
