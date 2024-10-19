import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface Empleado {
  matricula:number;
  nombre:string;
  correo:string;
  edad:number;
  horas:number;
}
interface Empleado_mod {
  matricula_mod:number;
  nombre_mod:string;
  correo_mod:string;
  edad_mod:number;
  horas_mod:number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})



export default class EmpleadosComponent implements OnInit{
  formGroup!:FormGroup;
  formModificar!:FormGroup;
  formMod!:FormGroup;
  empleado:Empleado={
    matricula:0,
    nombre:'',
    correo:'',
    edad:0,
    horas:0
  }
  empleado_mod:Empleado_mod={
    matricula_mod:0,
    nombre_mod:'',
    correo_mod:'',
    edad_mod:0,
    horas_mod:0
  }
  EmpleadosArray: any[] = [];
  mostrar:boolean = false;
  mod_mostrar:boolean = false;
  matricula!:number;
  nombre!:string;
  correo!:string
  edad!:number;
  horas!:number;
  total:number=0;
  pagarHoras:number=0;
  pagarHorasExtras:number=0;
  subtotal:number=0;



  constructor(private fb:FormBuilder){

  }

  ngOnInit(): void {
    this.formGroup = this.initForm();
    this.formModificar = this.initForm_Modif();
    this.formMod = this.initFormMod();
  }

  initForm():FormGroup{
    return this.fb.group({
      matricula:[''],
      nombre:[''],
      correo:[''],
      edad:[''],
      horas:[''],
    })
  }
  initForm_Modif():FormGroup{
    return this.fb.group({
      matricula_mod:[''],
      nombre_mod:[''],
      correo_mod:[''],
      edad_mod:[''],
      horas_mod:[''],
    })
  }
  initFormMod():FormGroup{
    return this.fb.group({
      selected:[''],
    })
  }
  onSubmit(): void{
    this.empleado = this.formGroup.value;
    this.registrarUsuario(this.empleado);
  }

  registrarUsuario(info:Empleado):void{
    let empleadosGuardados = localStorage.getItem('empleados');
    let empleados_Array = empleadosGuardados ? JSON.parse(empleadosGuardados) : [];
    const empleadoArray =
    {
      'matricula':info.matricula,
      'nombre':info.nombre,
      'correo':info.correo,
      'edad':info.edad,
      'horas':info.horas
    };
    empleados_Array.push(empleadoArray);
    let empleadoJSON = JSON.stringify(empleados_Array);
    localStorage.setItem('empleados', empleadoJSON);
    this.imprimirTabla();
  }

  calcular_horas_extra(horas:number):number{
    if(horas > 40){
      return (horas-40) * 140;
    }
    return 0;
  }

  calcular_horas(horas:number):number{
    if(horas<40){
      return horas * 70;
    }
    return 40 * 70;
  }

  imprimirTa() {
    this.mostrar = true;
    let empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.EmpleadosArray = JSON.parse(empleadosGuardados);
        for (var i = 0; i < this.EmpleadosArray.length; i++) {
          console.log(this.EmpleadosArray[i].subtotal);
          this.total += this.EmpleadosArray[i].subtotal;
          console.log(this.EmpleadosArray[i].subtotal);
        }
    }
  }

  imprimirTabla() {
    this.mostrar = true;
    let empleadosGuardados = localStorage.getItem('empleados');
  
    if (empleadosGuardados) {
      this.EmpleadosArray = JSON.parse(empleadosGuardados);
  
      let pagarHoras = 0;
      let pagarHorasExtras = 0;
      let subtotal = 0;
  
    

      for (var i = 0; i < this.EmpleadosArray.length; i++) {
        let empleado = this.EmpleadosArray[i];
        console.log(empleado);
      
        let horasTrabajadas = Number(empleado.horas); 
    
       
        if (horasTrabajadas > 40) {
          pagarHorasExtras =  (horasTrabajadas - 40 )  * 140; 
          pagarHoras = 40 * 70;
        } else {
            pagarHoras = horasTrabajadas * 70; 
            pagarHorasExtras = 0; 
        }
        
        this.total +=(pagarHoras + pagarHorasExtras);
        console.log(this.total)
      }
        
        subtotal = pagarHoras + pagarHorasExtras;
        
       // console.log(`Horas normales a pagar: ${pagarHoras}`);
       // console.log(`Horas extras a pagar: ${pagarHorasExtras}`);
       // console.log(`Subtotal para el empleado ${empleado.nombre}: ${subtotal}`);
  
      this.pagarHoras = pagarHoras;
      this.pagarHorasExtras = pagarHorasExtras;
      this.subtotal = subtotal;
      
    }
  }


  borrarRegistro(){
    const matricula = this.formMod.value.selected;

    this.eliminar(matricula);
  }

  ModRegistro(){
    const matricula = this.formMod.value.selected;
    this.mod_mostrar = true;
    let empleadoEncontrado
    if(matricula){
      let empleadosGuardados = localStorage.getItem('empleados');
      if (empleadosGuardados) {
        let array = JSON.parse(empleadosGuardados);
        for (var i = 0; i < array.length; i++) {
          if (array[i].matricula == matricula) {
            empleadoEncontrado = array[i];
          }
        }
        console.log(empleadoEncontrado);
        if(empleadoEncontrado){
          this.formModificar.patchValue({
            matricula_mod: empleadoEncontrado.matricula,
            nombre_mod: empleadoEncontrado.nombre,
            correo_mod: empleadoEncontrado.correo,
            edad_mod: empleadoEncontrado.edad,
            horas_mod: empleadoEncontrado.horas
          });
        }
      }


    }
  }

  update():void{
    this.empleado_mod = this.formModificar.value;
    this.empleado.matricula = this.empleado_mod.matricula_mod;
    this.empleado.nombre = this.empleado_mod.nombre_mod;
    this.empleado.correo = this.empleado_mod.correo_mod;
    this.empleado.edad = this.empleado_mod.edad_mod;
    this.empleado.horas = this.empleado_mod.horas_mod;
    this.eliminar(this.empleado.matricula);
    this.registrarUsuario(this.empleado);
    this.imprimirTabla();
  }

  eliminar(matricula:number){
    let empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      let array = JSON.parse(empleadosGuardados);
      var resultado = []
      for (var i = 0; i < array.length; i++) {
        if (array[i].matricula !== matricula) {
          resultado.push(array[i]);
        }
      }
      this.EmpleadosArray = resultado;
      let empleadoJSON = JSON.stringify(this.EmpleadosArray);
      localStorage.setItem('empleados', empleadoJSON);
    }
  }

}

