import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '@app/core/services/usuarios.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  formBuscar!: FormGroup
  valor: any
  public eventRol: any;


  constructor(
    private usuariosSrv: UsuariosService,
    private modalService: NgbModal,
    private primengConfig: PrimeNGConfig,
    private router: Router,
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





    this.getUsuarios();
  }

  public getUsuarios(){
    this.usuariosSrv.getUsuarios(this.token)
    .subscribe((data: any) => {
      this.usuarios = data;
      console.log(this.usuarios);
    })
  }

  public getRol(event: any) {
    this.eventRol = event;
  }



  deletePartidosPoliticosModal(content: any, viewProduct:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
       // this.partidosPoliticosLanguage(viewProduct);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
