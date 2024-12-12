import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonTitle, IonContent, IonToolbar, IonButton, IonFooter, IonLabel, IonCard, IonItem, IonInput} from '@ionic/angular/standalone'
import { HeaderComponent } from 'src/app/components/header/header.component';
import { arrowBackOutline, logOut, logOutOutline, qrCodeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
  standalone: true,
  imports: [IonHeader, IonTitle, IonContent, IonToolbar, IonButton, IonFooter, IonLabel, IonCard, HeaderComponent, TranslateModule]
})
export class IncorrectoPage implements OnInit {

  // public usuario: Usuario;
  public correo: string ='';
  
  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private auth: AuthService, 
  ) { 
    addIcons({ logOutOutline, qrCodeOutline });
    // this.usuario = new Usuario();
    // this.usuario.recibirUsuario(this.activatedRoute,this.router);
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

  

}
