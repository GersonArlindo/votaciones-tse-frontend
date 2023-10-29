import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { users } from '@app/core/models/auth.interface';
import { UsuariosService } from '@app/core/services/usuarios.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public imageData: any;
  public users: users[] = [];
  public rol: any[] = [];
  public usuario : any[] = []
  public nombres : any
  public apellidos : any
  public dui :any
  public estado! : boolean
  public selectedRol!: number;
  id: any;
  token: any
  form!: FormGroup;

  constructor(
    private usuariosSrv: UsuariosService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
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

    this. getUsuarioById()
  }

  getUsuarioById() {
    this.usuariosSrv.getUsuariosById(this.uid,this.token)
    .subscribe((data: any) => {
      console.log(data)
      this.usuario.push(data);
      console.log(this.usuario)
    });
  }

  public getClassForEstado(id: any) {
    const className = id == 1 ? "activo-class" : id == 0 ? "inactivo-class" : "";
    return className;
  }



  public convertStatus(estado: any){
    if(estado == true){
      return "ACTIVO";
    }
    if(estado == false){
      return "INACTIVO"
    }
    return
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
  uid: any = this.getUserInfo('id')


}
