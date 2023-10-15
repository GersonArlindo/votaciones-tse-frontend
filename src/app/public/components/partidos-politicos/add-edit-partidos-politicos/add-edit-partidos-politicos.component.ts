import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidosPoliticosService } from '@app/core/services/partido-politico.service';
import { UsersService } from '@app/core/services/users.service';
import { environment } from '@encoding/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-add-edit-partidos-politicos',
  templateUrl: './add-edit-partidos-politicos.component.html',
  styleUrls: ['./add-edit-partidos-politicos.component.scss']
})
export class AddEditPartidosPoliticosComponent implements OnInit {

  form!: FormGroup;
  id: any;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;
  public status: any[] = [];
  public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  public url = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg';
  public formData: any = new FormData();
  public uploadFiles: any;
  public eventStatus: any;
  public selectedStatus!: number;
  public token: any
  public partidospoliticos: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private PartidosPoliticosSrv: PartidosPoliticosService,
    private UserSrv: UsersService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.status = [
      {
        id: 'INACTIVO',
        name: 'INACTIVO'
      },
      {
        id: 'ACTIVO',
        name: 'ACTIVO'
      }
    ]
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      siglas: [''],
      estado: [''],
      logo: [''],
    });

    this.title = 'Agregar Partido';
     if (this.id) {
      // edit mode
      this.title = 'Editar Partido';
      this.loading = true;

      this.PartidosPoliticosSrv.getPartidosPoliticosById(this.id,this.token)
        .pipe(
          switchMap((data: any) => {
            console.log(data);
            if (!data) {
              throw new Error('Los datos del partido político son indefinidos o nulos.');
            }

            this.form = this.formBuilder.group({
              nombre: [data['nombre'], [Validators.required]],
              siglas: [data['siglas']],
              estado: [data['estado']],
              logo: [data['logo']]
            });

            this.url = `${environment.API_URL}/${this.id}/${data['logo']}`;
            this.selectedStatus = data['estado'];

            return Promise.resolve(); // Resuelve la promesa vacía para que el observable se complete
          })
        )
        .toPromise()
        .catch((error: any) => {
          // Manejar errores aquí
          console.error('Error en la solicitud HTTP:', error);
        });
    }
  }






  public savePartidosPoliticos() {
    if (this.id) {
      this.formData.append("nombre", this.form.get('nombre')!.value);
      this.formData.append("siglas", this.form.get('siglas')!.value);
      this.formData.append("estado", this.selectedStatus)
      this.formData.append("logo", this.uploadFiles)

      this.spinner.show();

      setTimeout(() => {
        this.PartidosPoliticosSrv.updatePartidosPoliticos(this.formData, this.id, this.token)
          .subscribe((res: any) => {
            if (res) {
              this.spinner.hide();
              this.router.navigate(['/partidos-politicos/view']);
            } else {
              // Manejar el caso en que la respuesta sea falsa o haya errores
              console.error('Error en la solicitud:', res); // Imprime el error en la consola
              // También puedes mostrar un mensaje de error al usuario si es necesario
            }
          })
      }, 1200);

    } else {

      this.formData.append("nombre", this.form.get('nombre')!.value);
      this.formData.append("siglas", this.form.get('siglas')!.value);
      this.formData.append("estado", this.selectedStatus)
      this.formData.append("logo", this.uploadFiles)

      this.spinner.show();

      setTimeout(() => {
        this.PartidosPoliticosSrv.createPartidosPoliticos(this.formData, this.token)
          .subscribe((res: any) => {
            if (res) {
              this.spinner.hide();
              this.router.navigate(['/partidos-politicos/view']);
            } else {
            }
          })
      }, 1200);
    }
  }

  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  onFileSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.uploadFiles = event.target.files[0];
    }
  }

  get position() { return this.form.controls }

  onSubmit(): void {
    this.submitted = true;
    if (this.submitted && this.position['nombre']?.errors) {
    }
    if (this.submitted && this.position['siglas']?.errors) {
    }
    if (this.submitted && this.position['estado']?.errors) {
    }
    if (this.submitted && this.position['logo']?.errors) {
    }

  }

  public isValid() {
    return !this.form.valid
  }

  public getStatus(event: any) {
    this.eventStatus = event;
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
