import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { arrowBackOutline, logOut, logOutOutline, qrCodeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { User } from 'src/app/model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
      CommonModule    // CGV-Permite usar directivas comunes de Angular
    , FormsModule     // CGV-Permite usar formularios
    , IonicModule     // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    , TranslateModule // CGV-Permite usar pipe 'translate'
  ]
})
export class HeaderComponent {
  
  @Output() clickQrScanButton: EventEmitter<void> = new EventEmitter<void>();
  @Output() clickQrTestButton: EventEmitter<void> = new EventEmitter<void>();
  currentUser: any = null; // Declara la propiedad aquí
  user: User = new User();
  private authSubscription: Subscription | undefined;
  isAdmin: boolean = false;
  selectedComponent = 'welcome';

  constructor(private navCtrl: NavController, 
    private authService: AuthService,
    private databaseService: DatabaseService,
    private cdr: ChangeDetectorRef) { 
    addIcons({ logOutOutline, qrCodeOutline });
    this.authService.authUser.subscribe((user) => {
      console.log(user);
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authUser.subscribe(user => {
      if (user) {
        this.isAdmin = user.isAdmin;  // Actualiza el estado de admin
      } else {
        this.isAdmin = false;  // Si no hay usuario, el estado es false
      }
      this.cdr.detectChanges();
    });
  }

  startScan() {
    this.clickQrScanButton.emit();
  }

  showTest() {
    this.clickQrTestButton.emit();
  }

  logout() {
    this.selectedComponent = 'welcome';
    this.authService.logout();
    
  }

}
