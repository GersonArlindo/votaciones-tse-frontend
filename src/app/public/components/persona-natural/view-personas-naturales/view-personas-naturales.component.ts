import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { personaNatural } from '@app/core/models/personas_naturales.interface';
import { DestinoSufragioService } from '@app/core/services/destino-sufragio.service';
import { JrvService } from '@app/core/services/jrv.service';
import { PersonaNaturalService } from '@app/core/services/persona-natural.service';
import { environment } from '@encoding/environment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-personas-naturales',
  templateUrl: './view-personas-naturales.component.html',
  styleUrls: ['./view-personas-naturales.component.scss']
})
export class ViewPersonasNaturalesComponent implements OnInit {

  public personaNatural: any[] = [];
  public personaNaturalAsignada: any[] = [];
  public personaNaturalSinAsignar: any[] = [];
  public JuntasReceptorasdeVotos: any[] = [];
  @ViewChild('dt') table!: Table;
  closeResult:any = "";
  url:any;
  data:any;
  public token: any

  update: any;
  deleted: any;
  create: any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private PersonaNaturalSrv: PersonaNaturalService,
    private JrvSrv: JrvService,
    private DestinoSufragioSrv: DestinoSufragioService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getPersonasAsignadas();
    this.getJrvs();
    this.getPersonasNaturales();
    //this.getPermissionRole(this.rol_id);
  }

  public getPersonasNaturales(){
    this.PersonaNaturalSrv.getPersonaNatural()
    .subscribe((data: any) => {
      for(let pp of data){
        this.personaNatural.push(pp);
        if(!this.personaNaturalAsignada.includes(pp.id_persona_natural)){
          this.personaNaturalSinAsignar.push(pp)
        }
      }
      console.log(this.personaNaturalSinAsignar)
    })
  }

  public getPersonasAsignadas(){
    this.DestinoSufragioSrv.getPersonasAsignadasDestinoSufragio(this.token)
      .subscribe((data: any) => {
        for(let pna of data){
          this.personaNaturalAsignada.push(pna.id_persona_natural)
        }
        console.log(this.personaNaturalAsignada)
      })
  }

  public getJrvs(){
    this.JrvSrv.getJrv(this.token)
      .subscribe((res: any) => {
        for(let jrv of res){
          this.JuntasReceptorasdeVotos.push(jrv)
        }
        //console.log(this.JuntasReceptorasdeVotos)
      })
  }


  applyFilterGlobal($event: any, stringVal: any) {
    this.table.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }



  public convertDateTime(date: any){
    const date_locale = new Date(`${date}`).toLocaleDateString('es', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    var date_timer_ = new Date(`${date}`);
    var hours = date_timer_.getUTCHours();
    var minutes = date_timer_.getUTCMinutes();
    var militaryTime = (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;

    const formatted = `${date_locale} ${this.to12HourTime(militaryTime)}`;
    return formatted
  }

  public to12HourTime(time: any) {
    var b = time.split(/\D/);
    return (b[0]%12 || 12) + ':' + b[1] +
           (b[0]<=11? ' am' : ' pm');
  }

  public PersonaNatural(id: any){
    this.PersonaNaturalSrv.getPersonaNaturalById(id)
    .subscribe((res: any) =>{
      if(res){
        console.log(res)
        setTimeout(() =>{
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
        }, 100);
      }
    })
  }

  public asignarJrvPersonas() {
    this.spinner.show()
    const relaciones: any = {};
    this.personaNaturalSinAsignar.forEach((persona) => {
      const idMunicipioPersona = persona.id_municipio;
      this.JuntasReceptorasdeVotos.forEach((jrv) => {
        const idMunicipioJRV = jrv.centro_votacion.id_municipio;
        if (idMunicipioPersona == idMunicipioJRV) {
          // Verifica si la clave ya existe en el objeto
          if (!relaciones[idMunicipioJRV]) {
            // Si no existe, crea un arreglo vacío
            relaciones[idMunicipioJRV] = [];
          }
          // Almacena la relación en el arreglo correspondiente
          relaciones[idMunicipioJRV].push({
            id_persona_natural: persona.id_persona_natural,
            id_jrv: jrv.id_jrv,
          });
        }
      });
    });
    return relaciones;
  }

  public crearYGuardarRelaciones() {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Deseas iniciar proceso de asignacion de personas naturales a sus respectivos centros de votacion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show()
        // 1. Llama a la función para obtener el objeto relaciones
        const relaciones = this.asignarJrvPersonas();
        console.log(relaciones)

        // 1.1. Verifica si no se han encontrado relaciones
        if (!relaciones || Object.keys(relaciones).length === 0) {
          Swal.fire(
            'Personas ya asignadas',
            'No se encontraron relaciones para asignar',
            'warning'
          );
          this.spinner.hide();
          return; // Sal del proceso si no hay relaciones
        }

        // 2. Convierte el objeto relaciones en un arreglo de relaciones
        const relacionesArray: any = [];
        Object.keys(relaciones).forEach((idMunicipio) => {
          relacionesArray.push(
            ...relaciones[idMunicipio].map((relacion: any) => ({
              id_persona_natural: relacion.id_persona_natural,
              id_jrv: relacion.id_jrv,
            }))
          );
        });
      
        // 3. Envía los datos al endpoint
        relacionesArray.forEach((data: any) => {
          console.log(data)
          this.DestinoSufragioSrv.asignarAJrv(this.token, data)
            .subscribe((res: any) => {
              Swal.fire(
                'Exito!',
                'Las personas han sido asignadas exitosamente!',
                'success'
              )
              setTimeout(() => {
                this.spinner.hide()
                window.location.reload();
              }, 2500);
              console.log('Datos enviados:', data);
            });
        });
      }
    })

  }
  
  

  // public asignarJrvPersonas(){
  // const relaciones: any = [];

  // this.personaNatural.forEach((persona) => {
  //   const idMunicipioPersona = persona.id_municipio;

  //   this.JuntasReceptorasdeVotos.forEach((jrv) => {
  //     const idMunicipioJRV = jrv.centro_votacion.id_municipio;

  //     if (idMunicipioPersona == idMunicipioJRV) {
  //       // Coincidencia encontrada, almacena la relación
  //       relaciones.push({
  //         id_persona_natural: persona.id_persona_natural,
  //         id_jrv: jrv.id_jrv,
  //       });
  //     }
  //   });
  // });
  // console.log(relaciones)
  // return relaciones;
  // }



  ViewPersonaNaturalModal(content: any, viewPersona:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.PersonaNatural(viewPersona);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deletePersonaNaturalModal(content: any, viewPersona:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.PersonaNatural(viewPersona);
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
