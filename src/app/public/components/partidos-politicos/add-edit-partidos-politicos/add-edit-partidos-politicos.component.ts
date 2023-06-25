import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InstallerService } from '@app/core/services/installer.service';
import { PartidosPoliticosService } from '@app/core/services/partidos-politicos.service';
import { UsersService } from '@app/core/services/users.service';
import { environment } from '@encoding/environment';
import { NgxSpinnerService } from 'ngx-spinner';

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
  public status : any[] = [];
  public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  public url = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg';
  public formData: any = new FormData();
  public uploadFiles: any;
  public eventStatus: any;
  public selectedStatus!: number;
  


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

    this.status=[
      {
        id:0,
        name:'Inactivo'
      },
      {
        id:1,
        name:'Activo'
      }
    ]
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      sigla: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      representante_legal: ['', [Validators.required]],
      estado: [''],
      imagen	: [''],
    });

    this.title = 'Agregar Partido';
    if (this.id) {
        // edit mode
        this.title = 'Editar Partido';
        this.loading = true;
        
        this.PartidosPoliticosSrv.getPartidosPoliticosById(this.id)
        .subscribe((next: any) => {
          this.form = this.formBuilder.group({
            nombre: [next['nombre'], [Validators.required]],
            sigla: [next['sigla']],
            direccion: [next['direccion']],
            telefono: [next['telefono'],[Validators.pattern(this.emailPattern)]],
            representante_legal: [next['representante_legal']],
            estado: [next['estado']],
            imagen: [next['imagen']]
          });

          this.url = `${environment.API_URL}images/${next['imagen']}`;
          this.selectedStatus = next['estado']
        })
    }
  }

  public savePartidosPoliticos(){
    if(this.id){
      this.formData.append("nombre", this.form.get('nombre')!.value);
      this.formData.append("sigla", this.form.get('sigla')!.value);
      this.formData.append("direccion", this.form.get('direccion')!.value);
      this.formData.append("telefono", this.form.get('telefono')!.value);
      this.formData.append("representante_legal", this.form.get('representante_legal')!.value);
      this.formData.append("estado", this.selectedStatus)
      this.formData.append("imagen", this.uploadFiles)

      this.spinner.show();
  
      setTimeout(() => {
      this.PartidosPoliticosSrv.updatePartidosPoliticos(this.formData, this.id)
      .subscribe((res: any) => {
        if(res){
          this.spinner.hide();
          this.router.navigate(['/partidos-politicos/view']); 
        }else{
        }
      })
      }, 1200);

    }else{

      this.formData.append("nombre", this.form.get('nombre')!.value);
      this.formData.append("sigla", this.form.get('sigla')!.value);
      this.formData.append("direccion", this.form.get('direccion')!.value);
      this.formData.append("telefono", this.form.get('telefono')!.value);
      this.formData.append("representante_legal", this.form.get('representante_legal')!.value);
      this.formData.append("estado", this.selectedStatus)
      this.formData.append("imagen", this.uploadFiles)

      this.spinner.show();
  
      setTimeout(() => {
      this.PartidosPoliticosSrv.createPartidosPoliticos(this.formData)
      .subscribe((res: any) => {
        if(res){
          this.spinner.hide();
          this.router.navigate(['/partidos-politicos/view']); 
        }else{
        }
      })
      }, 1200);
    }
  }

  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  onFileSelect(event: any) {
    if(event.target.files && event.target.files[0]) { 
      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.uploadFiles = event.target.files[0];
    }
  }

  get position() { return this.form.controls}

  onSubmit(): void{
    this.submitted = true;
    if (this.submitted && this.position['nombre']?.errors) { 
    }
    if (this.submitted && this.position['sigla']?.errors) { 
    }
    if (this.submitted && this.position['direccion']?.errors) { 
    }
    if (this.submitted && this.position['telefono']?.errors) { 
    }
    if (this.submitted && this.position['representante_legal']?.errors) { 
    }
    if (this.submitted && this.position['estado']?.errors) { 
    }
    if (this.submitted && this.position['imagen']?.errors) { 
    }

  }

  public isValid() {
    return !this.form.valid
  }

  public getStatus(event:any){
    this.eventStatus = event;
  }

  isValidField(field: string){
    return(
      (this.form.get(field) || this.form.get(field)?.dirty) && !this.form.get(field)?.valid
    );
  }

  getUserInfo(inf: any) {
    const token = this.getTokens();
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

  uid: any = this.getUserInfo('uid');
  FullName: any = this.getUserInfo('name');


}
