import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { showAlertError, showToast } from 'src/app/tools/message-functions';
import { User } from '../model/user';
import { Storage } from '@ionic/storage-angular';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  storageAuthUserKey = 'AUTHENTICATED_USER';
  authUser = new BehaviorSubject<User | null>(null);
  isFirstLogin = new BehaviorSubject<boolean>(false);
  storageQrCodeKey = 'QR_CODE';
  qrCodeData = new BehaviorSubject<string | null>(null);
  selectedComponent = new BehaviorSubject<string>('welcome');

  constructor(private router: Router, private db: DatabaseService, private storage: Storage) { }

  async initializeAuthService() {
    try {
      await this.storage.create();
    } catch (error) {
      showAlertError('AuthService.initializeAuthService', error);
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      return Boolean(await this.readAuthUser());
    } catch (error) {
      showAlertError('AuthService.isAuthenticated', error);
      return false;
    }
  }

  async readAuthUser(): Promise<User | null> {
    try {
      const user = (await this.storage.get(this.storageAuthUserKey)) as User | null;
      this.authUser.next(user ?? null);
      return user;
    } catch (error) {
      showAlertError('AuthService.readAuthUser', error);
      return null;
    }
  }

  async saveAuthUser(user: User): Promise<User | null> {
    try {
      await this.storage.set(this.storageAuthUserKey, user);
      this.authUser.next(user);
      return user;
    } catch (error) {
      showAlertError('AuthService.saveAuthUser', error);
      return null;
    }
  }

  async deleteAuthUser(): Promise<boolean> {
    try {
      await this.storage.remove(this.storageAuthUserKey);
      this.authUser.next(null);
      return true;
    } catch (error) {
      showAlertError('AuthService.deleteAuthUser', error);
      return false;
    }
  }


  currentUser: any = null;
  async login(userName: string, password: string): Promise<boolean> {
    try {
      // Verifica si el usuario ingresó credenciales
      if (!userName || !password) {
        showToast('Por favor ingresa un nombre de usuario y contraseña');
        return false;
      }
  
      // Busca al usuario en la base de datos
      const user = await this.db.findUser(userName, password);
  
      // Verifica si se encontró un usuario
      if (user) {

        if (userName === 'admin') {
          user.isAdmin = true; // Asignamos el atributo de admin si el nombre es "admin"
           // Asignamos un rol de admin
          // Aquí puedes agregar más atributos que sean específicos para los administradores.
          console.log('El usuario es administrador:', user);
          
        } else {
          user.isAdmin = false; // Asegura que los usuarios que no son admin no tengan este atributo
        }
        this.authUser.next(user);
        this.selectedComponent.next('welcome');
        showToast(`¡Bienvenid@ ${user.firstName} ${user.lastName}!`);
        await this.saveAuthUser(user);
        this.selectedComponent.next('welcome');
        await this.router.navigate(['/inicio']);
        await this.saveAuthUser(user);
        return true;
      } else {
        // Si no se encontró un usuario, muestra un mensaje de error
        showToast('El correo o la password son incorrectos');
        await this.router.navigate(['/ingreso']);
        return false;
      }
    } catch (error) {
      showAlertError('AuthService.login', error);
      return false;
    }
  }

  getCurrentUser() {
    return this.authUser.getValue();
  }

  

  

  async olvideContraseña(email: string): Promise<boolean> {
    try {
      // Verifica si el usuario ingresó credenciales
      if (!email) {
        showToast('Por favor ingresa un correo');
        return false;
      }
  
      // Busca al usuario en la base de datos
      const user = await this.db.validarCorreo(email);
  
      // Verifica si se encontró un usuario
      if (user) {
        showToast(`Hola ${user.firstName} ${user.lastName}!`);
        await this.saveAuthUser(user);
        this.isFirstLogin.next(true);
        this.selectedComponent.next('welcome');
        await this.router.navigate(['/pregunta']);
        return true;
      } else {
        // Si no se encontró un usuario, muestra un mensaje de error
        await this.router.navigate(['/incorrecto']);
        return false;
      }
    } catch (error) {
      await this.router.navigate(['/incorrecto']);;
      return false;
    }
  }
  

  async logout(): Promise<boolean> {
    try {
      const user = await this.readAuthUser();

      if (user) {
        showToast(`¡Hasta pronto ${user.firstName} ${user.lastName}!`);
        await this.deleteAuthUser();
      }

      await this.router.navigate(['/ingreso']);
      return true;
    } catch (error) {
      showAlertError('AuthService.logout', error);
      return false;
    }
  }



  async logoutDatosActualizados(): Promise<boolean> {
    try {
      const user = await this.readAuthUser();

      if (user) {
        showToast(`Tus datos fueron actualizados ${user.firstName} ${user.lastName}!`);
        await this.deleteAuthUser();
      }

      await this.router.navigate(['/ingreso']);
      return true;
    } catch (error) {
      showAlertError('AuthService.logout', error);
      return false;
    }
  }

  

  // async readQrFromStorage(): Promise<string | null> {
  //   try {
  //     const qrData = await this.storage.get(this.storageQrCodeKey) as string | null;
  //     this.qrCodeData.next(qrData);
  //     return qrData;
  //   } catch (error) {
  //     showAlertError('AuthService.readQrFromStorage', error);
  //     return null;
  //   }
  // }

  // async saveQrToStorage(qrData: string): Promise<string | null> {
  //   try {
  //     await this.storage.set(this.storageQrCodeKey, qrData);
  //     this.qrCodeData.next(qrData);
  //     return qrData;
  //   } catch (error) {
  //     showAlertError('AuthService.saveQrToStorage', error);
  //     return null;
  //   }
  // }

  // async deleteQrFromStorage(): Promise<boolean> {
  //   try {
  //     await this.storage.remove(this.storageQrCodeKey);
  //     this.qrCodeData.next(null);
  //     return true;
  //   } catch (error) {
  //     showAlertError('AuthService.deleteQrFromStorage', error);
  //     return false;
  //   }
  // }
}
