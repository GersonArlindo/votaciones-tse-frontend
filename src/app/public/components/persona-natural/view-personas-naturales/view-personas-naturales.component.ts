import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { personaNatural } from '@app/core/models/personas_naturales.interface';
import { PermissionService } from '@app/core/services/permission.service';
import { PersonaNaturalService } from '@app/core/services/persona-natural.service';
import { environment } from '@encoding/environment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-view-personas-naturales',
  templateUrl: './view-personas-naturales.component.html',
  styleUrls: ['./view-personas-naturales.component.scss']
})
export class ViewPersonasNaturalesComponent implements OnInit {

  public personaNatural: any[] = [];
  @ViewChild('dt') table!: Table;
  closeResult:any = "";
  url:any;
  data:any;

  update: any;
  deleted: any;
  create: any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private PersonaNaturalSrv: PersonaNaturalService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private PermissionSrv: PermissionService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getPersonasNaturales();
    this.getPermissionRole(this.rol_id);
  }

  public getPersonasNaturales(){
    this.PersonaNaturalSrv.getPersonaNatural()
    .subscribe((data: any) => {
      this.personaNatural = (data);
    })
  }

  public getPermissionRole(id: any){
    this.PermissionSrv.getPermissionsByRole(id)
      .subscribe((permission: any) => {
        for(let permiss of permission){
          if(permiss.mod_id == 7){
            this.update = permiss['update'];
            this.deleted = permiss['deleted'];
            this.create = permiss['create'];
          }
        }
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
        setTimeout(() =>{
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
        }, 100);
      }
    })
  }



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
