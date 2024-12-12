import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonTitle, IonContent, IonToolbar, IonButton, IonFooter, IonLabel, IonCard, IonMenuToggle} from '@ionic/angular/standalone'
import { HeaderComponent } from 'src/app/components/header/header.component';
import { User } from 'src/app/model/user';
import { arrowBackOutline, logOut, logOutOutline, qrCodeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from './../../services/database.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonHeader, IonTitle, IonContent, IonToolbar, IonButton, IonFooter, IonLabel, IonCard, IonMenuToggle, HeaderComponent, TranslateModule]
})
export class CorrectoPage implements OnInit {

  // public usuario: User;
  public correo: string ='';
  user: User = new User();
  
  constructor(
    private router: Router,
    private auth: AuthService, 
    private activatedRoute: ActivatedRoute,
    private databaseService: DatabaseService,
  ) { 
    this.auth.authUser.subscribe((user) => {
      console.log(user);
      if (user) {
        this.user = user;
      }
    });
    addIcons({ logOutOutline, qrCodeOutline });
    // this.usuario = new Usuario();
    // this.usuario.recibirUsuario(this.activatedRoute,this.router);
  }

  ngOnInit() {
  }

  navegar(pagina:string){
    // this.usuario.navegarEnviandoUsuario(this.router,pagina);
  }

  logout() {
    this.auth.logout();
  }



}
