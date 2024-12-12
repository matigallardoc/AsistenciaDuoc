import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonItem } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dinosaur',
  templateUrl: './dinosaur.component.html',
  styleUrls: ['./dinosaur.component.scss'],
  standalone: true,
  imports: [IonContent, IonGrid, IonRow, IonCol, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonItem, TranslateModule]
})

export class DinosaurComponent {

  miclase: any;

  constructor(private authService: AuthService) { 
    this.authService.qrCodeData.subscribe((qrData) => {
      this.miclase = qrData? JSON.parse(qrData): null;
    })
  }

}
