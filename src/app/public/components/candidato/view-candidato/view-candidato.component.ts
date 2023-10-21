import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatoService } from '@app/core/services/candidato.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-view-candidato',
  templateUrl: './view-candidato.component.html',
  styleUrls: ['./view-candidato.component.scss']
})
export class ViewCandidatoComponent implements OnInit {
  public candidato: any[] = [];
  @ViewChild('dt') table!: Table;
  closeResult:any = "";
  url:any;
  data:any;
  update: any;
  deleted: any;
  create: any;
  form!: FormGroup;

  id?: string;
  submitting = false;
  submitted = false;
  title!: string;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private candidatoSrv: CandidatoService,
    private primengConfig: PrimeNGConfig,
    private router: Router,/* 
    private PermissionSrv: PermissionService, */
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getCandidatos();
  }

  public getCandidatos(){
    this.candidatoSrv.getCandidato()
    .subscribe((data: any) => {
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

  editCandidatoModal(content: any, id: any) {
    this.candidatoSrv.getCandidatoById(id)
      .subscribe((next: any) => {
        this.form = this.formBuilder.group({
          language_name: [next['language_name'], [Validators.required]],
        });
      })
    if (id >= 1) {
      this.title = "Editar Candidato"
    } else if (id == 0) {
      this.title = "Crear Candidato"
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

      if (result === 'yes') {
        if (id >= 1) {
          this.title = "Editar Candidato"

          const formValue = this.form.value;
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
          }, 1200);

        } else if (id == 0) {
          this.title = "Crear Candidato"
          const formValue = this.form.value;
          this.spinner.show();

          setTimeout(() => {
            this.candidatoSrv.createCandidato(formValue)
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
          }, 1200);

        }
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

  rol_id: any = this.getUserInfo('rol_id');



}
