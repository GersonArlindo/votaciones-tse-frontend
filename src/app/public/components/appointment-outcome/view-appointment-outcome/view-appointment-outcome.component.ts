import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { appointmentOutcome } from '@app/core/models/appointmentOutcome.interface';
import { AppointmentOutcomeService } from '@app/core/services/appointment-outcome.service';
import { PermissionService } from '@app/core/services/permission.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-view-appointment-outcome',
  templateUrl: './view-appointment-outcome.component.html',
  styleUrls: ['./view-appointment-outcome.component.scss']
})
export class ViewAppointmentOutcomeComponent implements OnInit {

  public appointmentOutcome: appointmentOutcome[] = [];
  @ViewChild('dt') table!: Table;
  closeResult:any = "";

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
    private AppointmentOutcomeSrv: AppointmentOutcomeService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private PermissionSrv: PermissionService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAppointmentOutcome();
    this.getPermissionRole(this.rol_id);
    this.form = this.formBuilder.group({
      apptm_outcome_name: ['', [Validators.required]],
    });
  }

  public getPermissionRole(id: any){
    this.PermissionSrv.getPermissionsByRole(id)
      .subscribe((permission: any) => {
        for(let permiss of permission){
          if(permiss.mod_id == 2){
            this.update = permiss['update'];
            this.deleted = permiss['deleted'];
            this.create = permiss['create'];
          }
        }
      })
  }

  public getAppointmentOutcome(){
    this.AppointmentOutcomeSrv.getAppointmentOutcome()
    .subscribe((data: any) => {
      this.appointmentOutcome = data;
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

  public deleteAppointmentOutcome(id: any){
    this.AppointmentOutcomeSrv.deleteappointmentOutcome(id)
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

  public AppointmentOutcome(id: any){
    this.AppointmentOutcomeSrv.getAppointmentOutcomeById(id)
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
  
  editApptOutcomeModal(content: any, id: any) {
    this.AppointmentOutcomeSrv.getAppointmentOutcome()
      .subscribe((next: any) => {
        for(let appoint of next){
          if(appoint.apptm_outcome_id == id){
            this.form = this.formBuilder.group({
              apptm_outcome_name: [appoint.apptm_outcome_name, [Validators.required]],
            });
          }
        }
      })
    if (id >= 1) {
      this.title = "Edit Appoinment Outcome"
    } else if (id == 0) {
      this.title = "Create Appoinment Outcome"
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

      if (result === 'yes') {
        if (id >= 1) {
          this.title = "Edit Appoinment Outcome"

          const formValue = this.form.value;
          this.spinner.show();

          setTimeout(() => {
            this.AppointmentOutcomeSrv.updateAppointmentOutcome(formValue, id)
              .subscribe((res: any) => {
                if (res) {
                  this.spinner.hide();
                  this.router.navigate(['/appointment-outcome/view'])
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
          this.title = "Create Appointment Outcome"
          const formValue = this.form.value;
          this.spinner.show();

          setTimeout(() => {
            this.AppointmentOutcomeSrv.createAppointmentOutcome(formValue)
              .subscribe((res: any) => {
                if (res) {
                  this.spinner.hide();
                  this.router.navigate(['/appointment-outcome/view'])
                  .then(() => {
                      let currentUrl = this.router.url;
                      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                      this.router.onSameUrlNavigation = 'reload';
                      this.router.navigate([currentUrl]);
                  })
                } else {
                }
              })
          }, 1000);

        }
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  viewAppointmentOutcomeModal(content: any, viewProduct:any) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.AppointmentOutcome(viewProduct);
      }  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });  
  } 

  deleteAppointmentOutcomeModal(content: any, viewProduct:any) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.deleteAppointmentOutcome(viewProduct);
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
  
  get position() { return this.form.controls }

  onSubmit(): void {
    this.submitted = true;
    if (this.submitted && this.position['apptm_outcome_name']?.errors) {
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
