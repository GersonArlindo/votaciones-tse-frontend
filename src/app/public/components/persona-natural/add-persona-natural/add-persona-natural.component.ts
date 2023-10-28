import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaNaturalService } from '@app/core/services/persona-natural.service';
import { UsersService } from '@app/core/services/users.service';
import { environment } from '@encoding/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { lastValueFrom, switchMap } from 'rxjs';
import municipios from '@assets/data/municipios.json';
import departamentos from '@assets/data/departamentos.json';
import { personaNaturalRequest } from '@app/core/models/personas_naturales.interface';

interface Municipio {
  id_municipio: string;
  id_departamento: string;
  nombre: string;
}
interface Departamento {
  id_departamento: string;
  nombre: string;
}
@Component({
  selector: 'app-add-persona-natural',
  templateUrl: './add-persona-natural.component.html',
  styleUrls: ['./add-persona-natural.component.scss'],
})
export class AddPersonaNaturalComponent implements OnInit {
  form!: FormGroup;
  id: any;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;
  public departamentos: Departamento[] = departamentos;
  public municipios: Municipio[] = municipios;
  public generos: any = [];
  public duiPattern = /^\d{8}-\d{1}$/;
  public url =
    'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg';
  public data: personaNaturalRequest = {
    nombres: '',
    apellidos: '',
    dui: '',
    genero: '',
    id_municipio: 0,
    fecha_nacimiento: '',
    fecha_vencimiento_dui: '',
    detalle_direccion: '',
  };

  public selectedDepartamento!: number;
  public selectedMunicipio!: number;
  public token: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private personaNaturalService: PersonaNaturalService,
    private UserSrv: UsersService
  ) {}

  ngOnInit(): void {
    this.generos = ['MASCULINO', 'FEMENINO'];

    this.form = this.formBuilder.group({
      dui: ['', [Validators.pattern(this.duiPattern)]], //formato 00000000-0
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      departamento: [''],
      municipio: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      fecha_vencimiento_dui: ['', [Validators.required]],
    });

    this.title = 'Agregar Persona Natural';
  }

  public async savePersonaNatural() {
    this.spinner.show();

    const { value: formPersona } = this.form;

    this.data = {
      nombres: formPersona.nombres,
      apellidos: formPersona.apellidos,
      dui: formPersona.dui,
      detalle_direccion: formPersona.direccion,
      fecha_nacimiento: convertDate2ISO(formPersona.fecha_nacimiento),
      fecha_vencimiento_dui: convertDate2ISO(formPersona.fecha_vencimiento_dui),
      genero: formPersona.genero,
      id_municipio: parseInt(formPersona.municipio),
    };

    try {
     await lastValueFrom(
        this.personaNaturalService.createPersonaNatural(this.data, this.token)
      ).finally(() => this.spinner.hide());
      
      this.router.navigate(['/persona-natural/view']);
    } catch (error) {
      
    }
  }

  get position() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.submitted && this.position['nombres']?.errors) {
    }
    if (this.submitted && this.position['apellidos']?.errors) {
    }
    if (this.submitted && this.position['dui']?.errors) {
    }
    if (this.submitted && this.position['municipio']?.errors) {
    }
    if (this.submitted && this.position['departamento']?.errors) {
    }
    if (this.submitted && this.position['fecha_nacimiento']?.errors) {
    }
    if (this.submitted && this.position['fecha_nacimiento']?.errors) {
    }
  }

  public isValid() {
    return !this.form.valid;
  }

  public handleDepartamento(event: any) {
    this.municipios = municipios.filter(
      (municipio) => municipio.id_departamento == event
    );
  }

  public handleGenero(event: any) {
    this.data.genero = event;
  }

  public getMunicipio(event: any) {
    this.data.id_municipio = event;
  }

  isValidField(field: string) {
    return (
      (this.form.get(field) || this.form.get(field)?.dirty) &&
      !this.form.get(field)?.valid
    );
  }

  getUserInfo(inf: any) {
    const token = this.getTokens();
    this.token = token;
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload)[`${inf}`];
    } else {
      return null;
    }
  }

  getTokens() {
    return localStorage.getItem('login-token');
  }

  rol_id: any = this.getUserInfo('rol');
}

const convertDate2ISO = (date: string): any => {
  const newDate = new Date(date);

  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate.toISOString();
};
