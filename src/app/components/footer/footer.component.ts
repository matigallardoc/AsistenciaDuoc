import { DatabaseService } from './../../services/database.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { addIcons } from 'ionicons';
import { homeOutline, pawOutline, pencilOutline, qrCodeOutline, libraryOutline, informationCircleOutline } from 'ionicons/icons';
import { User } from 'src/app/model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
      CommonModule    // CGV-Permite usar directivas comunes de Angular
    , FormsModule     // CGV-Permite usar formularios
    , TranslateModule // CGV-Permite usar pipe 'translate'
    , IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon
  ]
})
export class FooterComponent {

  currentUser: any = null; // Declara la propiedad aquí

  selectedComponent = 'welcome';
  user: User = new User();
  isVip: boolean = false;
  isAdmin: boolean = false;
  private authSubscription: Subscription | undefined;


  constructor(private auth: AuthService,
    private databaseService: DatabaseService,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ homeOutline, qrCodeOutline, pawOutline, pencilOutline, libraryOutline, informationCircleOutline });
    // Suscribirse a los cambios de selectedComponent en AuthService
    this.auth.authUser.subscribe((user) => {
      console.log(user);
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
    
    this.authSubscription = this.auth.authUser.subscribe(user => {
      if (user) {
        this.isAdmin = user.isAdmin;  // Actualiza el estado de admin
      } else {
        this.isAdmin = false;  // Si no hay usuario, el estado es false
      }
      this.cdr.detectChanges();
    });
  }





  checkIfVip(): void {
    // Verificamos si el nombre del usuario es "vip"
    this.isVip = this.user.firstName === 'admin';
    console.log('Valor de userName:', this.user.firstName);
    console.log('El usuario es VIP:', this.isVip);
  }

  segmentChanged(selectedComponent: string) {
    this.selectedComponent = selectedComponent;
    this.auth.selectedComponent.next(this.selectedComponent);
  }

}
