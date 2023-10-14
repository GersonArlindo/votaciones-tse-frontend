import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JrvService } from '@app/core/services/jrv.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';

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

  public token: any
  id_centro_votacion: any;

  public opcionSeleccionadaCentroVotacion: any;
  
  public jrvs: any[] = [];
  public centro_votacion: any[] = []
  

  constructor(
    private jrvSrv: JrvService,
    private modalService: NgbModal,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }



  ngOnInit(): void {
    this.getJrvs();
    this.centro_votacion=[
      {
        id:2,
        name:'Centro 1'
      },
      {
        id:3,
        name:'Centro 2'
      }
    ]
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
      })
  }

  editJrvModal(content: any, id: any) {
      this.jrvSrv.getJrvById(id)
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
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
  
        if (result === 'yes') {
          if (id >= 1) {
            this.title = "Editar Jrv"
  
            const formJrv: any = {
              codigo: this.form.value.codigo,
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
              id_centro_votacion: Number(this.id_centro_votacion),
            }
            this.spinner.show();
  
            setTimeout(() => {
              this.jrvSrv.createJrv(formJrv)
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

  public getCentroVotacion($event: any){
    this.id_centro_votacion = $event
    console.log($event)
  }

  public Jrv(id: any) {
    this.jrvSrv.getJrvById(id)
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
