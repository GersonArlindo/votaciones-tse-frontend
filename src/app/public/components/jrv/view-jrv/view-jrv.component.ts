import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CentroVotacionService } from '@app/core/services/centro-votacion.service';
import { JrvService } from '@app/core/services/jrv.service';
import { ModalDismissReasons, NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-jrv',
  templateUrl: './view-jrv.component.html',
  styleUrls: ['./view-jrv.component.scss']
})

export class ViewJrvComponent implements OnInit {

  @ViewChild('dt') table!: Table;
  closeResult: any = "";
  title!: string;
  form!: FormGroup; 
  id?: string;
  submitting = false;
  submitted = false;

  dataLoadedJrv: boolean = false;

  public token: any
  id_centro_votacion: any;

  public opcionSeleccionadaCentroVotacion: any;
  
  public jrvs: any[] = [];
  public centro_votacion: any[] = []
  public originalCentroVotaciones: any[] = []
  public cv_asignado: any[] = []
  
  

  constructor(
    private jrvSrv: JrvService,
    private modalService: NgbModal,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private CentroVotacionSrv: CentroVotacionService
  ) { }



  ngOnInit(): void {
    this.getJrvs();
    this.getCentrosVotacion()
    this.form = this.formBuilder.group({
      codigo: ['', [Validators.required]],
      
    });
  }

  public getJrvs() {
    this.jrvSrv.getJrv(this.token)
      .subscribe((data: any) => {
        console.log(data);
        for (let jrv of data){
          this.jrvs.push(jrv)
        }
        this.dataLoadedJrv = true;
      })
  }

  public getCentrosVotacion(){
    this.CentroVotacionSrv.getCentrosVotaciones(this.token)
    .subscribe((cv: any) => {
      for(let centro of cv){
        this.centro_votacion.push(centro)
        this.originalCentroVotaciones.push(centro)
      }
      console.log(this.centro_votacion)
    })
  }


  

  editJrvModal(content: any, id: any) {
    let codJRV = this.generarCodigoUnicoJRV()
    this.form.get('codigo')!.setValue(codJRV)
      this.jrvSrv.getJrvById(id, this.token)
        .subscribe((next: any) => {
          this.form = this.formBuilder.group({
            codigo: [next['codigo']],
          });
          this.opcionSeleccionadaCentroVotacion = next['id_centro_votacion']
        })
      if (id >= 1) {
        this.title = "Editar Jrv"
      } else if (id == 0) {
        this.title = "Crear Jrv"
      }
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "xl" }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
  
        if (result === 'yes') {
          if (id >= 1) {
            this.title = "Editar Jrv"
  
            const formJrv: any = {
              codigo: codJRV,
              id_centro_votacion: Number(this.id_centro_votacion),
            }
            this.spinner.show();
  
            setTimeout(() => {
              this.jrvSrv.updateJrv(formJrv, id)
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
            }, 1200);
  
          } else if (id == 0) {
            this.title = "Crear Jrv"

            //const formValue = this.form.value;
            const formJrv: any = {
              codigo: this.form.value.codigo,
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
            }, 1500);
  
          }
        }
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

  }

  public searchReactiveCV(event: any, valor: any){
    console.log('event', event.target.value);
        // Valor ingresado en el filtro
        const filterValue = event.target.value.toLowerCase();
 
        if (filterValue === '') {
          // Si el filtro está vacío, mostrar toda la data original
          this.centro_votacion = this.originalCentroVotaciones;
        } else {
          // Aplicar el filtro en ambos campos
          this.centro_votacion = this.originalCentroVotaciones.filter((cv: any) => {
            const fullName = `${cv.nombre}`.toLowerCase();
            const state = `${cv.estado}`.toLowerCase();
            const municipio = `${cv.municipios.nombre}`.toLowerCase();
            const depto = `${cv.municipios.departamentos.nombre}`.toLowerCase();

            return fullName.includes(filterValue) || state.includes(filterValue) || municipio.includes(filterValue) || depto.includes(filterValue);
          });
        }
  }

  public asignarCV(id: any, nombre: any, totalJrv: any){
    if(totalJrv >= 5){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Has llegado al Limite de Jrv por Centro de Votacion!'
      })
      return
    }

    Swal.fire({
      title: 'Estas seguro?',
      text: "Deseas agregar esta JRV a este Centro de Votacion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          "id": id,
          "nombre": nombre
        }
        this.cv_asignado = []
        this.cv_asignado.push(data)
        console.log(this.cv_asignado);
        
        Swal.fire(
          'Agregada!',
          'Su Jrv ha sido agregada con exito!',
          'success'
        )
      }
    })

  }

  public getCentroVotacion($event: any){
    this.id_centro_votacion = $event
    console.log($event)
  }

  public Jrv(id: any) {
    this.jrvSrv.getJrvById(id, this.token)
      .subscribe((res: any) => {
        if (res) {
          setTimeout(() => {
            let currentUrl = this.router.url;
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate([currentUrl]);
          }, 100);
        }
      })
  }



  viewJrvModal(content: any, viewProduct: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.Jrv(viewProduct);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

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

    // Función para determinar la clase CSS
    getClassForEstado(estado: string): string {
      return estado === 'CERRADA' ? 'cerrado-class' : 'abierto-class';
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
      if (this.submitted && this.position['codigo']?.errors) {
      }
    }

    public generarCodigoUnicoJRV(): string {
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let codigo = '';
      for (let i = 0; i < 6; i++) {
        const caracterAleatorio = caracteres[Math.floor(Math.random() * caracteres.length)];
        codigo += caracterAleatorio;
      }
      return 'JRV'+codigo;
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
