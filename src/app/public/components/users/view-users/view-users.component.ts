import { Component, OnInit, ViewChild } from '@angular/core';
import { lenguage } from '@app/core/models/language.interface';
import { LenguageService } from '@app/core/services/lenguage.service';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';
import { installers } from '@app/core/models/installer.interface';
import { users } from '@app/core/models/auth.interface';
import { UsersService } from '@app/core/services/users.service';
import { PermissionService } from '@app/core/services/permission.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {

  public users: users[] = [];
  @ViewChild('dt') table!: Table;
  closeResult:any = "";

  public imageData: any;
  update: any;
  deleted: any;
  create: any;

  constructor(
    private modalService: NgbModal, 
    private UsersSrv: UsersService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private PermissionSrv: PermissionService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getPermissionRole(this.rol_id);
  }


  public getPermissionRole(id: any){
    this.PermissionSrv.getPermissionsByRole(id)
    .subscribe((permission: any) => {
      for(let permiss of permission){
        if(permiss.mod_id == 1){
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

  public getUsers(){
    this.UsersSrv.getUsers()
    .subscribe((data: any) => {
      this.users = data;
      this.imageData = data['user_images'];
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

  public deleteUser(id: any){
    this.UsersSrv.deleteUsers(id)
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

  public userLanguage(id: any){
    this.UsersSrv.deleteUsers(id)
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

  viewUsersModal(content: any, viewProduct:any) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' ,size: 'xl'}).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.userLanguage(viewProduct);
      }  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });  
  }

  deleteUserModal(content: any, viewProduct:any) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.deleteUser(viewProduct);
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
