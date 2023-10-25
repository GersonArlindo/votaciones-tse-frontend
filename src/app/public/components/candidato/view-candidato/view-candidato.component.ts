import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatoService } from '@app/core/services/candidato.service';
import { environment } from '@encoding/environment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-candidato',
  templateUrl: './view-candidato.component.html',
  styleUrls: ['./view-candidato.component.scss']
})
export class ViewCandidatoComponent implements OnInit {
  public candidato: any[] = [];
  @ViewChild('dt') table!: Table;
  closeResult: any = "";
  url: any;
  data: any;
  update: any;
  deleted: any;
  create: any;
  formCandidato!: FormGroup;
  public status: any[] = [];
  public uploadFiles: any;
  public eventStatus: any;
  public selectedStatus!: number;
  id?: string;
  submitting = false;
  submitted = false;
  title!: string;
  public token:any;
  loading= false;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private candidatoSrv: CandidatoService,
    private primengConfig: PrimeNGConfig,
    private route: ActivatedRoute,
    private router: Router,/* 
    private PermissionSrv: PermissionService, */
    private spinner: NgxSpinnerService
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
    this.formCandidato = this.formBuilder.group({
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

      this.candidatoSrv.getCandidatoById(this.id,this.token)
        .pipe(
          switchMap((data: any) => {
            console.log(data);
            if (!data) {
              throw new Error('Los datos del partido político son indefinidos o nulos.');
            }

            this.formCandidato = this.formBuilder.group({
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

  public getCandidatos() {

    this.candidatoSrv.getCandidato(this.token).subscribe((data: any) => {
      this.candidato = (data);
    })
  }

  /* public getPermissionRole(id: any){
    this.PermissionSrv.getPermissionsByRole(id)
      .subscribe((permission: any) => {
        for(let permiss of permission){
          if(permiss.mod_id == 22){
            this.update = permiss['update'];
            this.deleted = permiss['deleted'];
            this.create = permiss['create'];
          }
        }
      })
  }
 */


  applyFilterGlobal($event: any, stringVal: any) {
    this.table.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  public convertDateTime(date: any) {
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
    return (b[0] % 12 || 12) + ':' + b[1] +
      (b[0] <= 11 ? ' am' : ' pm');
  }

  public editCandidatoModal(content: any, id: any) {
    this.candidatoSrv.getCandidatoById(this.token,id)
      .subscribe((next: any) => {
        this.formCandidato = this.formBuilder.group({
          candidato_nombre: [next['candidato_nombre']],
        });
      })
   
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:"xl" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

      if (result === 'yes') {
        if (id >= 1) {
         /*  this.title = "Editar Candidato"

          const formValue = this.formCandidato.value;
          this.spinner.show();

          setTimeout(() => {
            this.candidatoSrv.updateCandidato(formValue, id)
              .subscribe((res: any) => {
                if (res) {
                  this.spinner.hide();
                  this.router.navigate(['/candidato/view'])
                    .then(() => {
                      let currentUrl = this.router.url;
                      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                      this.router.onSameUrlNavigation = 'reload';
                      this.router.navigate([currentUrl]);
                    })
                } else {
                }
              })
          }, 1200); */

        } else if (id == 0) {
          this.title = "Crear Candidato"
          /* const formValue = this.formCandidato.value;
          this.spinner.show();

          setTimeout(() => {
            this.candidatoSrv.createCandidato(this.token, formValue)
              .subscribe((res: any) => {
                if (res) {
                  this.spinner.hide();
                  this.router.navigate(['/candidato/view'])
                    .then(() => {
                      let currentUrl = this.router.url;
                      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                      this.router.onSameUrlNavigation = 'reload';
                      this.router.navigate([currentUrl]);
                    })
                } else {
                }
              })
          }, 1200); */

        }
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public guardarDatosCandidatos(){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Realmente quieres guardar este registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        const dataCandidato: any = {
          id_: this.id,
          nombre: this.formCandidato.value.nombre,
          direccion: this.formCandidato.value.direccion,
          estado: "CERRADA"
        }
    
        this.candidatoSrv.createCandidato(dataCandidato, this.token)
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

  get position() { return this.formCandidato.controls }

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

  public getStatus(event: any) {
    this.eventStatus = event;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.submitted && this.position['nombre']?.errors) {
    }
    if (this.submitted && this.position['foto']?.errors) {
    }
    if (this.submitted && this.position['estado']?.errors) {
    }

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
