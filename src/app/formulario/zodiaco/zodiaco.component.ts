import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css']
})
export class ZodiacoComponent implements OnInit {
  formGroup: FormGroup;
  edad: number | null = null;
  signo: string | null = null;
  signoImagen: string | null = null;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      nombre: ['', Validators.required],
      Apaterno: ['', Validators.required],
      Amaterno: ['', Validators.required],
      dia: [null, [Validators.required, Validators.min(1), Validators.max(31)]],
      mes: [null, [Validators.required, Validators.min(1), Validators.max(12)]],
      año: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      sexo: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.formGroup.valid) {
      const { dia, mes, año } = this.formGroup.value;
      this.calcularEdad(dia, mes, año);
      this.asignarSignoZodiacal(dia, mes);
      console.log('Formulario enviado:', this.formGroup.value);
    }
  }

  calcularEdad(dia: number, mes: number, año: number) {
    const fechaNacimiento = new Date(año, mes - 1, dia);
    const edadDif = Date.now() - fechaNacimiento.getTime();
    this.edad = new Date(edadDif).getUTCFullYear() - 1970;
  }

  asignarSignoZodiacal(dia: number, mes: number) {
    const signos = [
      { nombre: 'Capricornio', fechaLimite: new Date(0, 0, 20) }, // 20 de enero
      { nombre: 'Acuario', fechaLimite: new Date(0, 1, 18) }, // 18 de febrero
      { nombre: 'Piscis', fechaLimite: new Date(0, 2, 20) }, // 20 de marzo
      { nombre: 'Aries', fechaLimite: new Date(0, 3, 20) }, // 20 de abril
      { nombre: 'Tauro', fechaLimite: new Date(0, 4, 20) }, // 20 de mayo
      { nombre: 'Géminis', fechaLimite: new Date(0, 5, 21) }, // 21 de junio
      { nombre: 'Cáncer', fechaLimite: new Date(0, 6, 22) }, // 22 de julio
      { nombre: 'Leo', fechaLimite: new Date(0, 7, 22) }, // 22 de agosto
      { nombre: 'Virgo', fechaLimite: new Date(0, 8, 22) }, // 22 de septiembre
      { nombre: 'Libra', fechaLimite: new Date(0, 9, 22) }, // 22 de octubre
      { nombre: 'Escorpio', fechaLimite: new Date(0, 10, 21) }, // 21 de noviembre
      { nombre: 'Sagitario', fechaLimite: new Date(0, 11, 21) }, // 21 de diciembre
    ];

    const fechaNacimiento = new Date(0, mes - 1, dia);
    for (let i = 0; i < signos.length; i++) {
      if (fechaNacimiento < signos[i].fechaLimite) {
        this.signo = signos[i - 1].nombre;
        this.signoImagen = `assets/${signos[i - 1].nombre}.png`; // Asegúrate de tener imágenes en la carpeta "assets"
        return;
      }
    }

    this.signo = signos[signos.length - 1].nombre;
    this.signoImagen = `assets/${signos[signos.length - 1].nombre}.png`; // Último signo zodiacal
  }
}
