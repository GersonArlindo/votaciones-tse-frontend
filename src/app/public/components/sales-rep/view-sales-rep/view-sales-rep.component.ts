import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { salesRep } from '@app/core/models/sales_rep.interface';
import { PermissionService } from '@app/core/services/permission.service';
import { SalesRepService } from '@app/core/services/sales-rep.service';
import { UsersService } from '@app/core/services/users.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-view-sales-rep',
  templateUrl: './view-sales-rep.component.html',
  styleUrls: ['./view-sales-rep.component.scss']
})
export class ViewSalesRepComponent implements OnInit {

  public salesRep: salesRep[] = [];
  @ViewChild('dt') table!: Table;
  closeResult:any = "";

  update: any;
  deleted: any;
  create: any;

  constructor(
    private modalService: NgbModal, 
    private SalesRepSrv: SalesRepService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private PermissionSrv: PermissionService
  ) { }

  ngOnInit(): void {
    this.getSalesRep();
    this.getPermissionRole(this.rol_id);
  }

  public getPermissionRole(id: any){
    this.PermissionSrv.getPermissionsByRole(id)
      .subscribe((permission: any) => {
        for(let permiss of permission){
          if(permiss.mod_id == 14){
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

  public getSalesRep(){
    this.SalesRepSrv.getSalesRep()
    .subscribe((data: any) => {
      this.salesRep = data;
    })
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

  
  public deleteSalesRep(id: any){
    this.SalesRepSrv.deleteSalesRep(id)
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

  public SalesRep(id: any){
    this.SalesRepSrv.getSalesRepById(id)
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

  viewSalesRepModal(content: any, viewProduct:any) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.deleteSalesRep(viewProduct);
      }  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });  
  }  

  deleteSalesRepModal(content: any, viewProduct:any) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.deleteSalesRep(viewProduct);
      }  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });  
  }  

  public convertStatus(id: any){
    if(id == 1){
      return "Active";
    }if(id == 0){
      return "Inactive"
    }
    return 
  }

  public getClassBasedOnStatus(id: any) {
    if(id == 1){
      return "user-badge status-active";
    }if(id == 0){
      return "user-badge status-inactive"
    }
    return 
  }

  
  public convertApptAvailability(id: any){
    if(id == 1){
      return "Virtual";
    }if(id == 2){
      return "In Person"
    }if(id == 3){
      return "Virtual / In Person"
    }
    return 
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
