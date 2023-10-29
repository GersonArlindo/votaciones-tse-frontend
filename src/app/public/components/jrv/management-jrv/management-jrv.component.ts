import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DestinoSufragioService } from '@app/core/services/destino-sufragio.service';
import { JrvService } from '@app/core/services/jrv.service';
import { UsersService } from '@app/core/services/users.service';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-management-jrv',
  templateUrl: './management-jrv.component.html',
  styleUrls: ['./management-jrv.component.scss']
})
export class ManagementJrvComponent implements OnInit {
  public valorTemplate: any
  public id!: any
  public token: any

  dataLoadedUsers: boolean = false;
  dataLoadedPersonas: boolean = false;

  public jrvs: any[] = []
  public miembrosJRV: any[] = []
  public selectedUser: any[] = []
  public users: any[] = []
  public usersOriginal: any[] = []
  public UserSeleccionados: any[] = []
  public TodosMiembrosJrvs: any[] = []
  public personas: any[] = []
  public personasOriginal: any[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jrvSrv: JrvService,
    private userSrv: UsersService,
    private destinoSufragioSrv: DestinoSufragioService
  ) { }

  ngOnInit(): void {
    this.getUsersDB()
    this.id = this.route.snapshot.params['id'];
    this.getJrvsById()
    this.getMiembrosByIdJrv()
    this.getAllMiembros()
    this.getDestinoSufragio()
     const localStorageItem = localStorage.getItem('tab-jrv');

     if (localStorageItem) {
      this.valorTemplate = localStorageItem;
     } else {
       this.valorTemplate = ""; // O asigna otro valor por defecto
     }
  }

  public getEstado(estado: boolean): string {
    return estado ? 'Activo' : 'Inactivo';
  }

  getMiembrosByIdJrv(){
    this.jrvSrv.getMiembrosByIdJrv(this.id, this.token)
    .subscribe((data: any) => {
      for(let miembro of data){
        this.miembrosJRV.push(miembro)
      }
      console.log(this.miembrosJRV);
    })
  }

  getDestinoSufragio(){
    this.destinoSufragioSrv.getPersonasAsignadasDestinoSufragio(this.token)
      .subscribe((res: any) => {
        for(let persona of res){
          if(persona.id_jrv == this.id){
            this.personas.push(persona)
            this.personasOriginal.push(persona)
          }
        }
        this.dataLoadedPersonas = true;
        console.log(res)
      })
  }

  getAllMiembros(){
    this.jrvSrv.getAllMiembrosByIdJrvs(this.token).pipe(
      map((data: any) => data.map((miembro: any) => miembro.id_usuario))
    )
    .subscribe((idUsuarios: any) => {
      for(let id of idUsuarios){
        this.TodosMiembrosJrvs.push(id)
      }
      console.log(this.TodosMiembrosJrvs);
    });
  }

  public eliminarUsuarioDeJrv(id: any){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Deseas remover este usuario de esta JRV!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.jrvSrv.deleteMiembroOfJrv(id, this.token)
          .subscribe((res: any) => {
            if(res){
              Swal.fire(
                'Eliminado!',
                'Se ha eliminado este usuario de la JRV exitosamente.',
                'success'
              )
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            }
          })
        
      }
    })
  }

  public onUsersSelect(event: any){
    this.UserSeleccionados = event
    console.log(this.UserSeleccionados);
  }


  public cambiarEstado(id: any){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Deseas cambiar el estado de esta JRV!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.jrvSrv.updatePartialJrv(id, this.token)
          .subscribe((res: any) => {
            if(res){
              Swal.fire(
                'Actualizada!',
                'Su estado ha sido actualizado',
                'success'
              )
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            }
          })
       
      }
    })
    console.log(id)
  }

  getUsersDB() {
    this.userSrv.getUsers(this.token)
      .subscribe((data: any) => {
        for (let user of data) {
          this.users.push(user);
          this.usersOriginal.push(user)
        }
        this.dataLoadedUsers = true; // Marcar los datos como cargados
        console.log(this.users);
      });
  }

  public agregarUseraJrv(id: any){

    if(this.miembrosJRV.length >= 5){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La JRV esta completa!'
      })
      return
    }

    if (this.TodosMiembrosJrvs.includes(id)) {
      console.log(`El valor ${id} está en el arreglo.`);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Usuario YA est agregado en otra mesa!'
      })
    } else {
      console.log(`El valor ${id} no está en el arreglo.`);
      const userOfJrv = {
        "id_jrv": Number(this.id),
        "id_usuario": id
      } 
      console.log(userOfJrv)
      this.jrvSrv.createMiembroOfJRV(userOfJrv, this.token)
        .subscribe((res: any) => {
          if(res.creado_en != null){
            Swal.fire(
              'Buen trabajo!',
              'Su usuario ha sido agregado a la jrv con exito!',
              'success'
            )
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
      })
    }

  }

  public buscarUsuario(event: any, valor: any){
    console.log('event', event.target.value);
        // Valor ingresado en el filtro
        const filterValue = event.target.value.toLowerCase();
 
        if (filterValue === '') {
          // Si el filtro está vacío, mostrar toda la data original
          this.users = this.usersOriginal;
        } else {
          // Aplicar el filtro en ambos campos
          this.users = this.usersOriginal.filter((user: any) => {
            const fullName = `${user.nombres} ${user.apellidos}`.toLowerCase();
            const dui = `${user.dui}`.toLowerCase();

            return fullName.includes(filterValue) || dui.includes(filterValue);
          });
        }
  }

  public buscarPersona(event: any, valor: any){
    console.log('event', event.target.value);
    // Valor ingresado en el filtro
    const filterValue = event.target.value.toLowerCase();

    if (filterValue === '') {
      // Si el filtro está vacío, mostrar toda la data original
      this.personas = this.personasOriginal;
    } else {
      // Aplicar el filtro en ambos campos
      this.personas = this.personasOriginal.filter((persona: any) => {
        const fullName = `${persona.informacion_personal.nombres} ${persona.informacion_personal.apellidos}`.toLowerCase();
        const dui = `${persona.informacion_personal.dui}`.toLowerCase();
        return fullName.includes(filterValue) || dui.includes(filterValue);
      });
    }
  }

  public EnviarMiembros(){
   if(this.UserSeleccionados.length >= 1){
    for (let i = 0; i < this.UserSeleccionados.length; i++) {
      const miembro =  {
        "id_jrv": Number(this.id),
        "id_usuario": this.UserSeleccionados[i]
      }
      this.jrvSrv.createMiembroOfJRV(miembro, this.token)
      .subscribe((data: any) => {
        console.log("GUARDADO" + data)
      })
    }
   }
  }

  public cambiarTab(valorTab: any){
    localStorage.setItem('tab-jrv', valorTab);
    this.valorTemplate = valorTab
    console.log(this.valorTemplate);
  }

  public getJrvsById() {
    this.jrvSrv.getJrvById(this.id, this.token)
      .subscribe((data: any) => {
        this.jrvs.push(data)
        console.log(this.jrvs);

      })
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
