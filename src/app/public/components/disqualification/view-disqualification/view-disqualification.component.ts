import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { disqualification } from '@app/core/models/disqualifications.interface';
import { DisqualificationsService } from '@app/core/services/disqualifications.service';
import { PermissionService } from '@app/core/services/permission.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-view-disqualification',
  templateUrl: './view-disqualification.component.html',
  styleUrls: ['./view-disqualification.component.scss']
})
export class ViewDisqualificationComponent implements OnInit {

  public disqualification: disqualification[] = [];
  @ViewChild('dt') table!: Table;
  closeResult:any = "";  

  form!: FormGroup;
  update: any;
  delete: any;
  create: any;
  id?: string;
  submitting = false;
  submitted = false;
  title!: string;

  constructor(
    private modalService: NgbModal, 
    private formBuilder: FormBuilder,
    private DisqualificationsSrv: DisqualificationsService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private PermissionSrv: PermissionService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getDisqualification();
    this.getPermissionRole(this.rol_id);
    this.form = this.formBuilder.group({
      disqualification_name: ['', [Validators.required]],
    });
  }

  
  public getPermissionRole(id: any){
    this.PermissionSrv.getPermissionsByRole(id)
      .subscribe((permission: any) => {
        for(let permiss of permission){
          if(permiss.mod_id == 9){
            this.update = permiss['update'];
            this.delete = permiss['deleted'];
            this.create = permiss['create'];
          }
        }
      })
  }

  public getDisqualification(){
    this.DisqualificationsSrv.getDisqualification()
    .subscribe((data: any) => {
      this.disqualification = data;
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

  public deleteDisqualification(id: any){
    this.DisqualificationsSrv.deleteDisqualification(id)
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

   editDisqualificationModal(content: any, id: any) {
    this.DisqualificationsSrv.getDisqualificationById(id)
      .subscribe((next: any) => {
        this.form = this.formBuilder.group({
          disqualification_name: [next['disqualification_name'], [Validators.required]],
        });
      })
    if (id >= 1) {
      this.title = "Edit Disqualification"
    } else if (id == 0) {
      this.title = "Create Disqualification"
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

      if (result === 'yes') {
        if (id >= 1) {
          this.title = "Edit Disqualification"

          const formValue = this.form.value;
          this.spinner.show();

          setTimeout(() => {
            this.DisqualificationsSrv.updateDisqualification(formValue, id)
              .subscribe((res: any) => {
                if (res) {
                  this.spinner.hide();
                  this.router.navigate(['/disqualification/view'])
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
          this.title = "Create Disqualification"
          const formValue = this.form.value;
          this.spinner.show();

          setTimeout(() => {
            this.DisqualificationsSrv.createDisqualification(formValue)
              .subscribe((res: any) => {
                if (res) {
                  this.spinner.hide();
                  this.router.navigate(['/disqualification/view'])
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

  deleteDisqualificationModal(content: any, viewProduct:any) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.deleteDisqualification(viewProduct);
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
    if (this.submitted && this.position['disqualification_name']?.errors) {
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
