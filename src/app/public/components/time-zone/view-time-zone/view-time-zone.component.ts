import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeZone } from '@app/core/models/time_zone.interface';
import { PermissionService } from '@app/core/services/permission.service';
import { TimeZoneService } from '@app/core/services/time-zone.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-view-time-zone',
  templateUrl: './view-time-zone.component.html',
  styleUrls: ['./view-time-zone.component.scss']
})
export class ViewTimeZoneComponent implements OnInit {

  public timeZone: timeZone[] = [];
  @ViewChild('dt') table!: Table;
  closeResult:any = "";  

  update: any;
  deleted: any;
  create: any;

  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
    private modalService: NgbModal, 
    private timeZoneSrv: TimeZoneService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private PermissionSrv: PermissionService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.getTimeZone();
    this.getPermissionRole(this.rol_id);

    this.form = this.formBuilder.group({
      time_zone_name: ['', [Validators.required]],
    });
  }

  public getPermissionRole(id: any){
    this.PermissionSrv.getPermissionsByRole(id)
      .subscribe((permission: any) => {
        for(let permiss of permission){
          if(permiss.mod_id == 10){
            this.update = permiss['update'];
            this.deleted = permiss['deleted'];
            this.create = permiss['create'];
          }
        }
      })
  }

  public getTimeZone(){
    this.timeZoneSrv.getTime_Zone()
    .subscribe((data: any) => {
      this.timeZone = data;
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

  public deleteTimeZone(id: any){
    this.timeZoneSrv.deleteTime_Zone(id)
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

  deleteTimeZoneModal(content: any, viewProduct:any) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.deleteTimeZone(viewProduct);
      }  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });  
  }  

  editTimeZoneModal(content: any, id: any) {
    this.timeZoneSrv.getTime_ZoneById(id)
    .subscribe((next: any) => {
      this.form = this.formBuilder.group({
        time_zone_name: [next['time_zone_name'], [Validators.required]],
      });
    })

    if (id >= 1) {
      this.title = "Edit TimeZone"
    } else if (id == 0) {
      this.title = "Create TimeZone"
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

      if (result === 'yes') {
        if (id >= 1) {
          this.title = "Edit TimeZone"

          const formValue = this.form.value;  
          this.spinner.show();
      
          setTimeout(() => {
            this.timeZoneSrv.updateTimeZone(formValue, id)
            .subscribe((res: any) => {
              if(res){
                this.spinner.hide();
                this.router.navigate(['/time-zone/view'])
                .then(() => {
                  let currentUrl = this.router.url;
                  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                  this.router.onSameUrlNavigation = 'reload';
                  this.router.navigate([currentUrl]);
                })
              }else{
              }
            })
          }, 1200);
    

        } else if (id == 0) {
          this.title = "Create TimeZone"
          
          const formValue = this.form.value;  
          this.spinner.show();
      
          setTimeout(() => {
            this.timeZoneSrv.createTime_Zone(formValue)
            .subscribe((res: any) => {
              if(res){
                this.spinner.hide();
                this.router.navigate(['/time-zone/view'])
                .then(() => {
                  let currentUrl = this.router.url;
                  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                  this.router.onSameUrlNavigation = 'reload';
                  this.router.navigate([currentUrl]);
                })
              }else{
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

  get position() { return this.form.controls}

  onSubmit(): void{
    this.submitted = true;
    if (this.submitted && this.position['time_zone_name']?.errors) { 
    }
  }

  public isValid() {
    return !this.form.valid
  }

  isValidField(field: string){
    return(
      (this.form.get(field) || this.form.get(field)?.dirty) && !this.form.get(field)?.valid
    );
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
