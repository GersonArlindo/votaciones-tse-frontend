import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '@app/core/services/usuarios.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-add-edit-usuarios',
  templateUrl: './add-edit-usuarios.component.html',
  styleUrls: ['./add-edit-usuarios.component.scss']
})
export class AddEditUsuariosComponent implements OnInit {

  form!: FormGroup;
  id: any;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;
  token: any

  public rol: any[] = [];
  public status: any[] = [];
  public formData: any = new FormData();
  public eventStatus: any;
  public eventRol!: number;
  public selectedStatus: boolean = false;
  public selectedRol!: number;

  constructor(
    private usuariosSrv: UsuariosService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      clave: ['', [Validators.required, Validators.maxLength(255)]],
      dui: ['', [Validators.required]],
      estado: [],
      rol: [],
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.status = [
      {
        id: false,
        name: 'INACTIVO'
      },
      {
        id: true,
        name: 'ACTIVO'
      }
    ]

    this.rol = [
      {
        id: 1,
        nombre: 'Root'
      },
      {
        id: 2,
        nombre: 'Administrador'
      },
      {
        id: 3,
        nombre: 'Presidente'
      },
      {
        id: 4,
        nombre: 'Secretario'
      },
      {
        id: 5,
        nombre: 'Vocal'
      }

    ]



  this.title = 'Agregar Usuario';
    if (this.id) {
      this.title = 'Editar Usuario'
      // edit mode
      this.usuariosSrv.getUsuariosById(this.id, this.token)
        .subscribe((data: any) => {
          console.log('Datos recibidos:', data);
           this.form = this.formBuilder.group({
            nombres: [data.nombres],
            apellidos: [data.apellidos],
            usuario: [data.usuario],
            estado: [data.estado],
            dui: [data.dui],
            clave: [data.clave],
            //rol: [data.Rol.id],
          });
          this.selectedRol=data.Rol.id_rol
        })
    }
}

  public saveUsuarios() {
    if (this.id) {
      console.log(this.eventRol)
      console.log(this.selectedRol)
      const data: any={
        usuario: this.form.value.usuario,
        nombres: this.form.value.nombres,
        id_rol: this.eventRol ?? Number(this.selectedRol),
        apellidos: this.form.value.apellidos,
        dui: this.form.value.dui,
        estado: Boolean(this.eventStatus) ?? Boolean(this.selectedStatus)
      }
      console.log(data)
      this.spinner.show();

      setTimeout(() => {
        this.usuariosSrv.updateUsuarios(data, this.id, this.token)
          .subscribe((res: any) => {
            if (res) {
              this.spinner.hide();
              this.router.navigate(['/usuarios/view']);
            } else {
              // Manejar el caso en que la respuesta sea falsa o haya errores
              console.error('Error en la solicitud:', res); // Imprime el error en la consola
              // También puedes mostrar un mensaje de error al usuario si es necesario
            }
          })
      }, 1200);

    } else {
      //cuando el formData no funciona
      const data: any={
        usuario: this.form.value.usuario,
        nombres: this.form.value.nombres,
        id_rol: Number(this.eventRol),
        apellidos: this.form.value.apellidos,
        dui: this.form.value.dui,
        clave: this.form.value.clave,
        estado: Boolean(this.eventStatus)
      }
      console.log(data)

      this.spinner.show();

      setTimeout(() => {
        this.usuariosSrv.createUsuarios(data, this.token)
          .subscribe((res: any) => {
            if (res) {
              this.spinner.hide();
              this.router.navigate(['/usuarios/view']);
            } else {
            }
          })
      }, 1200);
    }

  }
  public getStatus(event: any) {
    this.eventStatus = event;
    console.log(this.eventStatus)
  }

  public getRol(event: any) {
    this.eventRol = event;
    console.log(this.eventRol)
  }

  get position() { return this.form.controls }

  onSubmit(): void {
    this.submitted = true;
    if (this.submitted && this.position['nombres']?.errors) {
    }
    if (this.submitted && this.position['apellidos']?.errors) {
    }
    if (this.submitted && this.position['usuario']?.errors) {
    }
    if (this.submitted && this.position['dui']?.errors) {
    }
    if (this.submitted && this.position['estado']?.errors) {
    }
    if (this.submitted && this.position['rol']?.errors) {
    }
    if (this.submitted && this.position['clave']?.errors) {
    }
  }

  public isValid() {
    return !this.form.valid
  }

  isValidField(field: string) {
    return (
      (this.form.get(field) || this.form.get(field)?.dirty) && !this.form.get(field)?.valid
    );
  }

  getUserInfo(inf: any) {
    const token = this.getTokens();
    this.token = token
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload)[`${inf}`];
    } else {
      return null;
    }
  }

  getTokens() {
    return localStorage.getItem("login-token");
  }

  rol_id: any = this.getUserInfo('rol');
}
