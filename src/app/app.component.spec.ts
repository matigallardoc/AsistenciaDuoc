import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { IngresoPage } from 'src/app/pages/ingreso/ingreso.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { APIClientService } from 'src/app/services/apiclient.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


describe('Probar página de ingreso', () => {
  let component: IngresoPage;
  let fixture: ComponentFixture<IngresoPage>;
  let authService: AuthService;

  // Código fuente que se ejecuta antes de cada test
  beforeEach(() => {
    // Configuración del módulo de testing
    TestBed.configureTestingModule({
      imports: [
        IngresoPage, // Importa el componente directamente en el array de imports
        IonicModule,
        FormsModule,
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),  // Agregar este módulo para manejar la traducción
      ],
      providers: [
        DatabaseService,
        AuthService,
        Storage,
        APIClientService,
        TranslateService
      ],
    }).compileComponents(); // Compila el template y el css del componente

    // Crea una instancia del componente
    fixture = TestBed.createComponent(IngresoPage); 
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService); // Inyecta AuthService
    fixture.detectChanges();
  });

  it('Debería poder crear la página de ingreso', () => {
    // Verifica que el componente se haya creado
    expect(component).toBeTruthy(); 
  });

  it('Debería asignar cuenta y contraseña a nombre de Ana Torres', () => {
    expect(component.cuenta).toBe('atorres');
    expect(component.password).toBe('1234');
  });


  it('Debería poder iniciar sesión con Ana Torres', fakeAsync(() => {
    // Espía el método login del servicio AuthService
    spyOn(authService, 'login').and.returnValue(Promise.resolve(true)); // Simula una respuesta exitosa

    component.cuenta = 'atorres';
    component.password = '1234';
    
    // Llama al método ingresar() del componente y espera su ejecución
    component.ingresar(); 
    tick(); // Avanza el temporizador para completar las tareas asincrónicas
    flush(); // Asegura que todas las promesas se resuelvan antes de hacer las verificaciones

    // Verifica que el método login del servicio AuthService haya sido llamado con los parámetros correctos
    expect(authService.login).toHaveBeenCalledWith('atorres', '1234');
  }));

  it('Debería poder iniciar sesión con Juan Perez', fakeAsync(() => {
    // Espía el método login del servicio AuthService
    spyOn(authService, 'login').and.returnValue(Promise.resolve(true)); // Simula una respuesta exitosa

    component.cuenta = 'jperez';
    component.password = '5678';
    
    // Llama al método ingresar() del componente y espera su ejecución
    component.ingresar(); 
    tick(); // Avanza el temporizador para completar las tareas asincrónicas
    flush(); // Asegura que todas las promesas se resuelvan antes de hacer las verificaciones

    // Verifica que el método login del servicio AuthService haya sido llamado con los parámetros correctos
    expect(authService.login).toHaveBeenCalledWith('jperez', '5678');
  }));

  it('Debería poder iniciar sesión con Carla Mujica', fakeAsync(() => {
    // Espía el método login del servicio AuthService
    spyOn(authService, 'login').and.returnValue(Promise.resolve(true)); // Simula una respuesta exitosa

    component.cuenta = 'cmujica';
    component.password = '0987';
    
    // Llama al método ingresar() del componente y espera su ejecución
    component.ingresar(); 
    tick(); // Avanza el temporizador para completar las tareas asincrónicas
    flush(); // Asegura que todas las promesas se resuelvan antes de hacer las verificaciones

    // Verifica que el método login del servicio AuthService haya sido llamado con los parámetros correctos
    expect(authService.login).toHaveBeenCalledWith('cmujica', '0987');
  }));

  it('Debería no poder iniciar sesión con un usuario invalido', fakeAsync(() => {
    // Espía el método login del servicio AuthService
    spyOn(authService, 'login').and.returnValue(Promise.resolve(false)); // Simula una respuesta exitosa

    component.cuenta = 'usuario_invalido';
    component.password = '0987';
    
    // Llama al método ingresar() del componente y espera su ejecución
    component.ingresar(); 
    tick(); // Avanza el temporizador para completar las tareas asincrónicas
    flush(); // Asegura que todas las promesas se resuelvan antes de hacer las verificaciones

    // Verifica que el método login del servicio AuthService haya sido llamado con los parámetros correctos
    expect(authService.login).toHaveBeenCalledWith('usuario_invalido', '0987');
  }));

  
  
});
