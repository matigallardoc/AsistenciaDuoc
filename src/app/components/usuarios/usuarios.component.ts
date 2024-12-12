import { DatabaseService } from './../../services/database.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { IonItem, IonInput, IonLabel, IonSelectOption, IonSelect, IonButton, IonList, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle  } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { EducationalLevel } from 'src/app/model/educational-level';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'; 
import { addIcons } from 'ionicons';
import { homeOutline, pawOutline, pencilOutline, qrCodeOutline, libraryOutline, informationCircleOutline, trashOutline } from 'ionicons/icons';
import { showAlertError } from 'src/app/tools/message-functions';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [IonButton, TranslateModule, IonInput, IonItem, IonLabel, FormsModule,IonSelectOption, 
    CommonModule, MatDatepickerModule, MatInputModule, MatNativeDateModule,
    IonSelect, IonList, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle, TranslateModule]
})
export class UsuariosComponent  implements OnInit {

  selectedComponent = 'welcome';
  user: User = new User();
  users: User[] = [];

  constructor(private auth: AuthService,
    private databaseService: DatabaseService,
    
  ) { 
    addIcons({trashOutline,homeOutline,qrCodeOutline,pawOutline,pencilOutline,libraryOutline,informationCircleOutline});
    this.auth.authUser.subscribe((user) => {
      console.log(user);
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit() {
    console.log('Componente Usuarios cargado');
    this.cargarUsuarios();
  }

  segmentChanged(selectedComponent: string) {
    this.selectedComponent = selectedComponent;
    this.auth.selectedComponent.next(this.selectedComponent);
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
        !this.user.educationalLevel) {
        
        // Mostrar un mensaje de error al usuario
        
        return; // Detener la ejecución si hay campos vacíos
    }

    // Envía los datos del usuario a la API
    this.databaseService.saveUser(this.user);
    this.auth.logoutDatosActualizados();

    // Puedes agregar aquí cualquier lógica adicional que necesites después de guardar
}

async cargarUsuarios() {
  try {
    // Obtener usuarios de la base de datos
    this.users = await this.databaseService.readUsertodos();

    // Ordenar los usuarios para que el admin esté primero
    this.users.sort((a, b) => {
      if (a.firstName.toLowerCase() === 'admin') {
        return -1;  // 'a' (el admin) va antes que 'b'
      } else if (b.firstName.toLowerCase() === 'admin') {
        return 1;   // 'b' (el admin) va después que 'a'
      }
      return a.firstName.localeCompare(b.firstName);  // Ordenar alfabéticamente por nombre
    });

    console.log('Usuarios cargados:', this.users);  // Verificar si están ordenados
  } catch (error) {
    console.error('Error al cargar los usuarios:', error);
  }
}

// Método para eliminar un usuario
async eliminarUsuario(user: User): Promise<void> {
  try {
    // Verificamos que el usuario no sea admin antes de intentar eliminarlo
    if (user.userName.toLowerCase() === 'admin') {
      console.log('No puedes eliminar al usuario admin.');
      return; // No hacemos nada si el usuario es admin
    }

    // Eliminar al usuario de la base de datos
    const q = 'DELETE FROM USER WHERE userName = ?';
    await this.databaseService.db.query(q, [user.userName]);

    console.log(`Usuario con nombre de usuario ${user.userName} eliminado correctamente.`);

    // Recargar la lista de usuarios después de eliminar
    await this.cargarUsuarios();
  } catch (error) {
    showAlertError('DataBaseService.eliminarUsuario', error);
    throw error; // Lanza el error para que se pueda manejar en la capa superior
  }
}






}


