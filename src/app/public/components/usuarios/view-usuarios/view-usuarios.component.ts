import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '@app/core/services/usuarios.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-view-usuarios',
  templateUrl: './view-usuarios.component.html',
  styleUrls: ['./view-usuarios.component.scss']
})
export class ViewUsuariosComponent implements OnInit {

  public usuarios: any[] = [];
  public rol: any[] = [];
  @ViewChild('dt') table!: Table;
  closeResult:any = "";

  public token: any
  public status: any[] = [];
  public usuarioEncontrado: any[] = [];
  public eventStatus: any;
  public selectedStatus!: boolean;
  public selectedRol!: number;
  public formData: any = new FormData();
  formBuscar!: FormGroup
  valor: any


  form!: FormGroup;
  update: any;
  deleted: any;
  create: any;
  id?: string;
  submitting = false;
  submitted = false;
  title!: string;

  constructor(
    private usuariosSrv: UsuariosService,
    private modalService: NgbModal,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
  ) {
    this.formBuscar = formBuilder.group({
      valor: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.rol = [
      {
        id: '1',
        nombre: 'Root'
      },
      {
        id: '2',
        nombre: 'Administrador'
      },
      {
        id: '3',
        nombre: 'Presidente'
      },
      {
        id: '4',
        nombre: 'Secretario'
      },
      {
        id: '5',
        nombre: 'Vocal'
      }

    ]

    this.form = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      dui: ['', [Validators.required]],
      estado: [''],
      rol: [''],
    });



    this.getUsuarios();
  }

  public getUsuarios(){
    this.usuariosSrv.getUsuarios(this.token)
    .subscribe((data: any) => {
      this.usuarios = data;
      console.log(this.usuarios);
    })
  }

  public getStatus(event: any) {
    this.eventStatus = event;
  }




  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
  }

  public isValid() {
    return !this.form.valid
  }

  isValidField(field: string) {
    return (
      (this.form.get(field) || this.form.get(field)?.dirty) && !this.form.get(field)?.valid
    );
  }

  public convertStatus(estado: any){
    if(estado == true){
      return "ACTIVO";
    }if(estado == false){
      return "INACTIVO"
    }
    return
  }

  public getClassForEstado(id: any) {
    const className = id == 1 ? "activo-class" : id == 0 ? "inactivo-class" : "";
    return className;
  }




  applyFilterGlobal($event: any, stringVal: any) {
    this.table.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }


 /* buscarEnArreglo() {
    this.usuarioEncontrado = []
    this.valor = this.formBuscar.value.valor;
    console.log(this.valor);
      this.usuarioEncontrado = this.usuarios.filter((usuario) => {
      const nombreCompleto = usuario.nombres + ' ' + usuario.apellidos;
      const valorMinusculas = this.valor.toLowerCase();
      return (
        nombreCompleto.toLowerCase().includes(valorMinusculas) ||
        usuario.dui.toLowerCase().includes(valorMinusculas)
      );
    });
      console.log(this.usuarioEncontrado);
  }*/

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
