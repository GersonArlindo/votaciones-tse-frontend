import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { permission } from '@app/core/models/permission.interface';
import { PermissionService } from '@app/core/services/permission.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-view-permisos',
  templateUrl: './view-permisos.component.html',
  styleUrls: ['./view-permisos.component.scss']
})
export class ViewPermisosComponent implements OnInit {

  public permissions: permission[] = [];
  @ViewChild('dt') table!: Table;
  closeResult:any = "";
  public id: any;

  constructor(
    private modalService: NgbModal, 
    private PermissionSrv: PermissionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getPermission();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.table.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  public getPermission(){
    this.PermissionSrv.getPermissionsByRole(this.id)
    .subscribe((data: any) => {
      this.permissions = data;
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
  public deletePermission(id: any){
    this.PermissionSrv.deletePermissions(id)
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

  deletePermissionModal(content: any, viewProduct:any) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.deletePermission(viewProduct);
      }  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });  
  } 
  getDismissReason(reason: any) {
    throw new Error('Method not implemented.');
  }
}
