import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CentroVotacionService } from '@app/core/services/centro-votacion.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-centro-votacion',
  templateUrl: './view-centro-votacion.component.html',
  styleUrls: ['./view-centro-votacion.component.scss']
})

export class ViewCentroVotacionComponent implements OnInit {



  @ViewChild('dt') table!: Table;
  closeResult: any = "";
  title!: string;
  formCentroVotacion!: FormGroup;
  public token: any;

  public id_municipio: any
  public selectedSearchMunicipio: any

  dataLoadedCentroVotacion: boolean = false;

  public Centros_Votacion: any = []
  public Centros_Votacion_Original: any = []

  constructor(
    private CentroVotacionSrv: CentroVotacionService,
    private modalService: NgbModal,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) {
    this.formCentroVotacion = formBuilder.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.GetCentrosVotacion()
  }

  public municipios: any[] = [
    { id_municipio: 2, id_departamento: 1, nombre: "Jujutla" },
    { id_municipio: 3, id_departamento: 1, nombre: "Atiquizaya" },
    { id_municipio: 4, id_departamento: 1, nombre: "Concepción de Ataco" },
    { id_municipio: 5, id_departamento: 1, nombre: "El Refugio" },
    { id_municipio: 6, id_departamento: 1, nombre: "Guaymango" },
    { id_municipio: 7, id_departamento: 1, nombre: "Apaneca" },
    { id_municipio: 8, id_departamento: 1, nombre: "San Francisco Menéndez" },
    { id_municipio: 9, id_departamento: 1, nombre: "San Lorenzo" },
    { id_municipio: 10, id_departamento: 1, nombre: "San Pedro Puxtla" },
    { id_municipio: 11, id_departamento: 1, nombre: "Tacuba" },
    { id_municipio: 12, id_departamento: 1, nombre: "Turín" },
    { id_municipio: 13, id_departamento: 2, nombre: "Candelaria de la Frontera" },
    { id_municipio: 14, id_departamento: 2, nombre: "Chalchuapa" },
    { id_municipio: 15, id_departamento: 2, nombre: "Coatepeque" },
    { id_municipio: 16, id_departamento: 2, nombre: "El Congo" },
    { id_municipio: 17, id_departamento: 2, nombre: "El Porvenir" },
    { id_municipio: 18, id_departamento: 2, nombre: "Masahuat" },
    { id_municipio: 19, id_departamento: 2, nombre: "Metapán" },
    { id_municipio: 20, id_departamento: 2, nombre: "San Antonio Pajonal" },
    { id_municipio: 21, id_departamento: 2, nombre: "San Sebastián Salitrillo" },
    { id_municipio: 22, id_departamento: 2, nombre: "Santa Ana" },
    { id_municipio: 23, id_departamento: 2, nombre: "Santa Rosa Guachipilín" },
    { id_municipio: 24, id_departamento: 2, nombre: "Santiago de la Frontera" },
    { id_municipio: 25, id_departamento: 2, nombre: "Texistepeque" },
    { id_municipio: 26, id_departamento: 3, nombre: "Acajutla" },
    { id_municipio: 27, id_departamento: 3, nombre: "Armenia" },
    { id_municipio: 28, id_departamento: 3, nombre: "Caluco" },
    { id_municipio: 29, id_departamento: 3, nombre: "Cuisnahuat" },
    { id_municipio: 30, id_departamento: 3, nombre: "Izalco" },
    { id_municipio: 31, id_departamento: 3, nombre: "Juayúa" },
    { id_municipio: 32, id_departamento: 3, nombre: "Nahuizalco" },
    { id_municipio: 33, id_departamento: 3, nombre: "Nahulingo" },
    { id_municipio: 34, id_departamento: 3, nombre: "Salcoatitán" },
    { id_municipio: 35, id_departamento: 3, nombre: "San Antonio del Monte" },
    { id_municipio: 36, id_departamento: 3, nombre: "San Julián" },
    { id_municipio: 37, id_departamento: 3, nombre: "Santa Catarina Masahuat" },
    { id_municipio: 38, id_departamento: 3, nombre: "Santa Isabel Ishuatán" },
    { id_municipio: 39, id_departamento: 3, nombre: "Santo Domingo de Guzmán" },
    { id_municipio: 40, id_departamento: 3, nombre: "Sonsonate" },
    { id_municipio: 41, id_departamento: 3, nombre: "Sonzacate" },
    { id_municipio: 42, id_departamento: 11, nombre: "Alegría" },
    { id_municipio: 43, id_departamento: 11, nombre: "Berlín" },
    { id_municipio: 44, id_departamento: 11, nombre: "California" },
    { id_municipio: 45, id_departamento: 11, nombre: "Concepción Batres" },
    { id_municipio: 46, id_departamento: 11, nombre: "El Triunfo" },
    { id_municipio: 47, id_departamento: 11, nombre: "Ereguayquín" },
    { id_municipio: 48, id_departamento: 11, nombre: "Estanzuelas" },
    { id_municipio: 49, id_departamento: 11, nombre: "Jiquilisco" },
    { id_municipio: 50, id_departamento: 11, nombre: "Jucapa" },
    { id_municipio: 51, id_departamento: 11, nombre: "Jucuarán" },
    { id_municipio: 52, id_departamento: 11, nombre: "Mercedes Umaña" },
    { id_municipio: 53, id_departamento: 11, nombre: "Nueva Granada" },
    { id_municipio: 54, id_departamento: 11, nombre: "Ozatlán" },
    { id_municipio: 55, id_departamento: 11, nombre: "Puerto El Triunfo" },
    { id_municipio: 56, id_departamento: 11, nombre: "San Agustín" },
    { id_municipio: 57, id_departamento: 11, nombre: "San Buenaventura" },
    { id_municipio: 58, id_departamento: 11, nombre: "San Dionisio" },
    { id_municipio: 59, id_departamento: 11, nombre: "San Francisco Javier" },
    { id_municipio: 60, id_departamento: 11, nombre: "Santa Elena" },
    { id_municipio: 61, id_departamento: 11, nombre: "Santa María" },
    { id_municipio: 62, id_departamento: 11, nombre: "Santiago de María" },
    { id_municipio: 63, id_departamento: 11, nombre: "Tecapán" },
    { id_municipio: 64, id_departamento: 11, nombre: "Usulután" },
    { id_municipio: 65, id_departamento: 12, nombre: "Carolina" },
    { id_municipio: 66, id_departamento: 12, nombre: "Chapeltique" },
    { id_municipio: 67, id_departamento: 12, nombre: "Chinameca" },
    { id_municipio: 68, id_departamento: 12, nombre: "Chirilagua" },
    { id_municipio: 69, id_departamento: 12, nombre: "Ciudad Barrios" },
    { id_municipio: 70, id_departamento: 12, nombre: "Comacarán" },
    { id_municipio: 71, id_departamento: 12, nombre: "El Tránsito" },
    { id_municipio: 72, id_departamento: 12, nombre: "Lolotique" },
    { id_municipio: 73, id_departamento: 12, nombre: "Moncagua" },
    { id_municipio: 74, id_departamento: 12, nombre: "Nueva Guadalupe" },
    { id_municipio: 75, id_departamento: 12, nombre: "Nuevo Edén de San Juan" },
    { id_municipio: 76, id_departamento: 12, nombre: "Quelepa" },
    { id_municipio: 77, id_departamento: 12, nombre: "San Antonio del Mosco" },
    { id_municipio: 78, id_departamento: 12, nombre: "San Gerardo" },
    { id_municipio: 79, id_departamento: 12, nombre: "San Jorge" },
    { id_municipio: 80, id_departamento: 12, nombre: "San Luis de la Reina" },
    { id_municipio: 81, id_departamento: 12, nombre: "San Miguel" },
    { id_municipio: 82, id_departamento: 12, nombre: "San Rafael Oriente" },
    { id_municipio: 83, id_departamento: 12, nombre: "Sesori" },
    { id_municipio: 84, id_departamento: 12, nombre: "Uluazapa" },
    { id_municipio: 85, id_departamento: 13, nombre: "Arambala" },
    { id_municipio: 86, id_departamento: 13, nombre: "Cacaopera" },
    { id_municipio: 87, id_departamento: 13, nombre: "Chilanga" },
    { id_municipio: 88, id_departamento: 13, nombre: "Corinto" },
    { id_municipio: 89, id_departamento: 13, nombre: "Delicias de Concepción" },
    { id_municipio: 90, id_departamento: 13, nombre: "El Divisadero" },
    { id_municipio: 91, id_departamento: 13, nombre: "El Rosario (Morazán)" },
    { id_municipio: 92, id_departamento: 13, nombre: "Gualococti" },
    { id_municipio: 93, id_departamento: 13, nombre: "Guatajiagua" },
    { id_municipio: 94, id_departamento: 13, nombre: "Joateca" },
    { id_municipio: 95, id_departamento: 13, nombre: "Jocoaitique" },
    { id_municipio: 96, id_departamento: 13, nombre: "Jocoro" },
    { id_municipio: 97, id_departamento: 13, nombre: "Lolotiquillo" },
    { id_municipio: 98, id_departamento: 13, nombre: "Meanguera" },
    { id_municipio: 99, id_departamento: 13, nombre: "Osicala" },
    { id_municipio: 100, id_departamento: 13, nombre: "Perquín" },
    { id_municipio: 101, id_departamento: 13, nombre: "San Carlos" },
    { id_municipio: 102, id_departamento: 13, nombre: "San Fernando (Morazán)" },
    { id_municipio: 103, id_departamento: 13, nombre: "San Francisco Gotera" },
    { id_municipio: 104, id_departamento: 13, nombre: "San Isidro (Morazán)" },
    { id_municipio: 105, id_departamento: 13, nombre: "San Simón" },
    { id_municipio: 106, id_departamento: 13, nombre: "Sensembra" },
    { id_municipio: 107, id_departamento: 13, nombre: "Sociedad" },
    { id_municipio: 108, id_departamento: 13, nombre: "Torola" },
    { id_municipio: 109, id_departamento: 13, nombre: "Yamabal" },
    { id_municipio: 110, id_departamento: 13, nombre: "Yoloaiquín" },
    { id_municipio: 111, id_departamento: 14, nombre: "La Unión" },
    { id_municipio: 112, id_departamento: 14, nombre: "San Alejo" },
    { id_municipio: 113, id_departamento: 14, nombre: "Yucuaiquín" },
    { id_municipio: 114, id_departamento: 14, nombre: "Conchagua" },
    { id_municipio: 115, id_departamento: 14, nombre: "Intipucá" },
    { id_municipio: 116, id_departamento: 14, nombre: "San José" },
    { id_municipio: 117, id_departamento: 14, nombre: "El Carmen (La Unión)" },
    { id_municipio: 118, id_departamento: 14, nombre: "Yayantique" },
    { id_municipio: 119, id_departamento: 14, nombre: "Bolívar" },
    { id_municipio: 120, id_departamento: 14, nombre: "Meanguera del Golfo" },
    { id_municipio: 121, id_departamento: 14, nombre: "Santa Rosa de Lima" },
    { id_municipio: 122, id_departamento: 14, nombre: "Pasaquina" },
    { id_municipio: 123, id_departamento: 14, nombre: "Anamoros" },
    { id_municipio: 124, id_departamento: 14, nombre: "Nueva Esparta" },
    { id_municipio: 125, id_departamento: 14, nombre: "El Sauce" },
    { id_municipio: 126, id_departamento: 14, nombre: "Concepción de Oriente" },
    { id_municipio: 127, id_departamento: 14, nombre: "Polorós" },
    { id_municipio: 128, id_departamento: 14, nombre: "Lislique" },
    { id_municipio: 129, id_departamento: 5, nombre: "Antiguo Cuscatlán" },
    { id_municipio: 130, id_departamento: 5, nombre: "Chiltiupán" },
    { id_municipio: 131, id_departamento: 5, nombre: "Ciudad Arce" },
    { id_municipio: 132, id_departamento: 5, nombre: "Colón" },
    { id_municipio: 133, id_departamento: 5, nombre: "Comasagua" },
    { id_municipio: 134, id_departamento: 5, nombre: "Huizúcar" },
    { id_municipio: 135, id_departamento: 5, nombre: "Jayaque" },
    { id_municipio: 136, id_departamento: 5, nombre: "Jicalapa" },
    { id_municipio: 137, id_departamento: 5, nombre: "La Libertad" },
    { id_municipio: 138, id_departamento: 5, nombre: "Santa Tecla" },
    { id_municipio: 139, id_departamento: 5, nombre: "Nuevo Cuscatlán" },
    { id_municipio: 140, id_departamento: 5, nombre: "San Juan Opico" },
    { id_municipio: 141, id_departamento: 5, nombre: "Quezaltepeque" },
    { id_municipio: 142, id_departamento: 5, nombre: "Sacacoyo" },
    { id_municipio: 143, id_departamento: 5, nombre: "San José Villanueva" },
    { id_municipio: 144, id_departamento: 5, nombre: "San Matías" },
    { id_municipio: 145, id_departamento: 5, nombre: "San Pablo Tacachico" },
    { id_municipio: 146, id_departamento: 5, nombre: "Talnique" },
    { id_municipio: 147, id_departamento: 5, nombre: "Tamanique" },
    { id_municipio: 148, id_departamento: 5, nombre: "Teotepeque" },
    { id_municipio: 149, id_departamento: 5, nombre: "Tepecoyo" },
    { id_municipio: 150, id_departamento: 5, nombre: "Zaragoza" },
    { id_municipio: 151, id_departamento: 4, nombre: "Agua Caliente" },
    { id_municipio: 152, id_departamento: 4, nombre: "Arcatao" },
    { id_municipio: 153, id_departamento: 4, nombre: "Azacualpa" },
    { id_municipio: 154, id_departamento: 4, nombre: "Cancasque" },
    { id_municipio: 155, id_departamento: 4, nombre: "Chalatenango" },
    { id_municipio: 156, id_departamento: 4, nombre: "Citalá" },
    { id_municipio: 157, id_departamento: 4, nombre: "Comapala" },
    { id_municipio: 158, id_departamento: 4, nombre: "Concepción Quezaltepeque" },
    { id_municipio: 159, id_departamento: 4, nombre: "Dulce Nombre de María" },
    { id_municipio: 160, id_departamento: 4, nombre: "El Carrizal" },
    { id_municipio: 161, id_departamento: 4, nombre: "El Paraíso" },
    { id_municipio: 162, id_departamento: 4, nombre: "La Laguna" },
    { id_municipio: 163, id_departamento: 4, nombre: "La Palma" },
    { id_municipio: 164, id_departamento: 4, nombre: "La Reina" },
    { id_municipio: 165, id_departamento: 4, nombre: "Las Vueltas" },
    { id_municipio: 166, id_departamento: 4, nombre: "Nueva Concepción" },
    { id_municipio: 167, id_departamento: 4, nombre: "Nueva Trinidad" },
    { id_municipio: 168, id_departamento: 4, nombre: "Nombre de Jesús" },
    { id_municipio: 169, id_departamento: 4, nombre: "Ojos de Agua" },
    { id_municipio: 170, id_departamento: 4, nombre: "Potonico" },
    { id_municipio: 171, id_departamento: 4, nombre: "San Antonio de la Cruz" },
    { id_municipio: 172, id_departamento: 4, nombre: "San Antonio Los Ranchos" },
    { id_municipio: 173, id_departamento: 4, nombre: "San Fernando" },
    { id_municipio: 174, id_departamento: 4, nombre: "San Francisco Lempa" },
    { id_municipio: 175, id_departamento: 4, nombre: "San Francisco Morazán" },
    { id_municipio: 176, id_departamento: 4, nombre: "San Ignacio" },
    { id_municipio: 177, id_departamento: 4, nombre: "San Isidro Labrador" },
    { id_municipio: 178, id_departamento: 4, nombre: "Las Flores" },
    { id_municipio: 179, id_departamento: 4, nombre: "San Luis del Carmen" },
    { id_municipio: 180, id_departamento: 4, nombre: "San Miguel de Mercedes" },
    { id_municipio: 181, id_departamento: 4, nombre: "San Rafael" },
    { id_municipio: 182, id_departamento: 4, nombre: "Santa Rita" },
    { id_municipio: 183, id_departamento: 4, nombre: "Tejutla" },
    { id_municipio: 184, id_departamento: 7, nombre: "Cojutepeque" },
    { id_municipio: 185, id_departamento: 7, nombre: "Candelaria" },
    { id_municipio: 186, id_departamento: 7, nombre: "El Carmen (Cuscatlán)" },
    { id_municipio: 187, id_departamento: 7, nombre: "El Rosario (Cuscatlán)" },
    { id_municipio: 188, id_departamento: 7, nombre: "Monte San Juan" },
    { id_municipio: 189, id_departamento: 7, nombre: "Oratorio de Concepción" },
    { id_municipio: 190, id_departamento: 7, nombre: "San Bartolomé Perulapía" },
    { id_municipio: 191, id_departamento: 7, nombre: "San Cristóbal" },
    { id_municipio: 192, id_departamento: 7, nombre: "San José Guayabal" },
    { id_municipio: 193, id_departamento: 7, nombre: "San Pedro Perulapán" },
    { id_municipio: 194, id_departamento: 7, nombre: "San Rafael Cedros" },
    { id_municipio: 195, id_departamento: 7, nombre: "San Ramón" },
    { id_municipio: 196, id_departamento: 7, nombre: "Santa Cruz Analquito" },
    { id_municipio: 197, id_departamento: 7, nombre: "Santa Cruz Michapa" },
    { id_municipio: 198, id_departamento: 7, nombre: "Suchitoto" },
    { id_municipio: 199, id_departamento: 7, nombre: "Tenancingo" },
    { id_municipio: 200, id_departamento: 6, nombre: "Aguilares" },
  ];

  public GetCentrosVotacion(){
    this.CentroVotacionSrv.getCentrosVotaciones(this.token)
      .subscribe((data: any) => {
        for(let cv of data){
          this.Centros_Votacion.push(cv)
          this.Centros_Votacion_Original.push(cv)
        }
        this.dataLoadedCentroVotacion = true;
      })
      console.log(this.Centros_Votacion)
  }

  public editCentroVotacionModal(content: any, id: any){
      this.CentroVotacionSrv.getCentroVotacionById(id, this.token)
        .subscribe((next: any) => {
          this.formCentroVotacion = this.formBuilder.group({
            nombre: [next['nombre']],
            direccion: [next['direccion']],
          });
          //this.opcionSeleccionadaCentroVotacion = next['id_centro_votacion']
        })
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
  
        if (result === 'yes') {
          if (id >= 1) {
            // this.title = "Editar Centro Votacion"
  
            // const formJrv: any = {
            //   codigo: codJRV,
            //   id_centro_votacion: Number(this.id_centro_votacion),
            // }
            // this.spinner.show();
  
            // setTimeout(() => {
            //   this.jrvSrv.updateJrv(formJrv, id)
            //     .subscribe((res: any) => {
            //       if (res) {
            //         this.spinner.hide();
            //         this.router.navigate(['/jrv/view'])
            //           .then(() => {
            //             let currentUrl = this.router.url;
            //             this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            //             this.router.onSameUrlNavigation = 'reload';
            //             this.router.navigate([currentUrl]);
            //           })
            //         } else {
            //       }
            //     })
            // }, 1200);
  
          } else if (id == 0) {
            this.title = "Crear Centro de Votacion"

            //const formValue = this.form.value;
            /* const formCv: any = {
              nom: this.formCentroVotacion.value.codigo,
              id_centro_votacion: this.cv_asignado[0].id,
            }
            this.spinner.show();
            console.log(formJrv);
            
            setTimeout(() => {
              this.jrvSrv.createJrv(formJrv, this.token)
                .subscribe((res: any) => {
                  if (res) {
                    this.spinner.hide();
                    this.router.navigate(['/jrv/view'])
                      .then(() => {
                        let currentUrl = this.router.url;
                        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                        this.router.onSameUrlNavigation = 'reload';
                        this.router.navigate([currentUrl]);
                      })
                  } else {
                  }
                })
            }, 1500); */
  
          }
        }
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

  }

  public guardarDatosCentroVotacion(){


    Swal.fire({
      title: 'Estas seguro?',
      text: "Realmente quieres guardar este registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const dataCentroVotacion: any = {
          id_municipio: this.id_municipio,
          nombre: this.formCentroVotacion.value.nombre,
          direccion: this.formCentroVotacion.value.direccion,
          estado: "CERRADA"
        }
    
        this.CentroVotacionSrv.createCentroVotacion(dataCentroVotacion, this.token)
          .subscribe((res: any) => {
            if(res){
              Swal.fire(
                'Buen Trabajo!',
                'Su Centro de Votacion ha sido creado exitosamente!',
                'success'
              )
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            }
            console.log(res)
          })
      }
    })

    

  }

  public municipioCapturado(event: any){
    this.id_municipio = event
    console.log(event)
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


  public busquedaReactiva(event: any){
    console.log('event', event.target.value);
        // Valor ingresado en el filtro
        const filterValue = event.target.value.toLowerCase();
 
        if (filterValue === '') {
          // Si el filtro está vacío, mostrar toda la data original
          this.Centros_Votacion = this.Centros_Votacion_Original;
        } else {
          // Aplicar el filtro en ambos campos
          this.Centros_Votacion = this.Centros_Votacion_Original.filter((cv: any) => {
            const nombre = `${cv.nombre}`.toLowerCase();
            const direccion = `${cv.direccion}`.toLowerCase();
            const estado = `${cv.estado}`.toLowerCase();

            return nombre.includes(filterValue) || direccion.includes(filterValue) || estado.includes(filterValue);
          });
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
