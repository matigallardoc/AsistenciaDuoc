import { showAlert, showAlertError } from "../tools/message-functions";

export class Dinosaur {

  static jsonDinoExample =
    `{
      "bloqueInicio": 1,
      "bloqueTermino": 2,
      "dia": "Lunes",
      "horaInicio": "08:00",
      "horaFin": "10:00",
      "idAsignatura": "MAT101",
      "nombreAsignatura": "Matemáticas",
      "nombreProfesor": "Eduardo Fuenzalida",
      "seccion": "002D",
      "sede": "Sede Padre Alonso de Ovalle"
    }`;
  
    static jsonDinoEmpty =
    `{
      "bloqueInicio": 0,
      "bloqueTermino": 0,
      "dia": "",
      "horaInicio": "",
      "horaFin": "",
      "idAsignatura": "",
      "nombreAsignatura": "",
      "nombreProfesor": "",
      "seccion": "",
      "sede": ""
    }`;

    bloqueInicio = 0;
    bloqueTermino = 0;
    dia = '';
    horaInicio = '';
    horaFin = '';
    idAsignatura = '';
    nombreAsignatura = '';
    nombreProfesor = '';
    seccion = '';
    sede = '';

  constructor() { }

  public static getNewDinosaur(
    bloqueInicio: number,
    bloqueTermino: number,
    dia: string,
    horaInicio: string,
    horaFin: string,
    idAsignatura: string,
    nombreAsignatura: string,
    nombreProfesor: string,
    seccion: string,
    sede: string
  ) {
    const dino = new Dinosaur();
    dino.bloqueInicio = bloqueInicio;
    dino.bloqueTermino = bloqueTermino;
    dino.dia = dia;
    dino.horaInicio = horaInicio;
    dino.horaFin = horaFin;
    dino.idAsignatura = idAsignatura;
    dino.nombreAsignatura = nombreAsignatura;
    dino.nombreProfesor = nombreProfesor;
    dino.seccion = seccion;
    dino.sede = sede;
    return dino;
  }

  // Devolver verdadero si el texto del QR contiene todos los datos de
  // un dinosaurio, de lo contrario se ha escaneado un QR que a lo 
  // mejor es válido, pero es de otra cosa que no es un dinosaurio
  // de esta aplicación.

  static isValidDinosaurQrCode(datosQR: string, showError: boolean = false) {
    if (datosQR !== '') {
      try {
        const json = JSON.parse(datosQR);

        if (json.bloqueInicio !== undefined
          && json.bloqueTermino !== undefined
          && json.dia !== undefined
          && json.horaInicio !== undefined
          && json.horaFin !== undefined
          && json.idAsignatura !== undefined
          && json.nombreAsignatura !== undefined
          && json.nombreProfesor !== undefined
          && json.seccion !== undefined
          && json.sede !== undefined) {
          return true;
        }
      } catch(error: any) {}
    }
    if (showError) {
      showAlert('El código QR escaneado no corresponde al Sistema de asistencia Duoc UC');
    }
    return false;
  }
  
}
