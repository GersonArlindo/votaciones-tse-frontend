import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { provider } from '@app/core/models/provider.interface';
import { PermissionService } from '@app/core/services/permission.service';
import { ProviderService } from '@app/core/services/provider.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-view-providers',
  templateUrl: './view-providers.component.html',
  styleUrls: ['./view-providers.component.scss']
})
export class ViewProvidersComponent implements OnInit {

  public provider: provider[] = [];
  @ViewChild('dt') table!: Table;
  closeResult:any = ""; 

  public eventStatus: any;
  public status : any[] = [];
  public selectedSearchStatusId!: number;
  public selectedStatus!: number;

  update: any;
  deleted: any;
  create: any;
  form!: FormGroup;
  id?: string;
  submitting = false;
  submitted = false;
  title!: string;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal, 
    private ProviderSrv: ProviderService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private PermissionSrv: PermissionService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getProvider();
    this.getPermissionRole(this.rol_id);
    this.status=[
      {
        id:0,
        name:'inactive'
      },
      {
        id:1,
        name:'active'
      }
    ]
    this.form = this.formBuilder.group({
      name_provider: ['', [Validators.required]],
      description_provider: ['', [Validators.required]],
      status : [''],
    });
  }

  public getPermissionRole(id: any){
    this.PermissionSrv.getPermissionsByRole(id)
      .subscribe((permission: any) => {
        for(let permiss of permission){
          if(permiss.mod_id == 12){
            this.update = permiss['update'];
            this.deleted = permiss['deleted'];
            this.create = permiss['create'];
          }
        }
        
      })
  }

  public getProvider(){
    this.ProviderSrv.getProvider()
    .subscribe((data: any) => {
      this.provider = data;
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

  public Provider(id: any){
    this.ProviderSrv.deleteProvider(id)
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

  viewProviderModal(content: any, viewProduct:any) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.Provider(viewProduct);
      }  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });  
  }  

  public deleteProvider(id: any){
    this.ProviderSrv.deleteProvider(id)
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


  deleteProviderModal(content: any, viewProduct:any) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.deleteProvider(viewProduct);
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

  editProviderModal(content: any, id: any) {
    this.ProviderSrv.getProviderById(id)
      .subscribe((next: any) => {
        this.form = this.formBuilder.group({
          name_provider: [next['roof_name'], [Validators.required]],
          description_provider: [next['description_provider'], [Validators.required]],
          status: [next['description_roof'], [Validators.required]]
        });
        this.selectedStatus = next['status']
      })
    if (id >= 1) {
      this.title = "Edit Provider"
    } else if (id == 0) {
      this.title = "Create  Provider"
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        if (id >= 1) {
          this.title = "Edit  Provider"

          const formValue = this.form.value;
          this.spinner.show();

          setTimeout(() => {
            this.ProviderSrv.updateProvider(formValue, id)
              .subscribe((res: any) => {
                if (res) {
                  this.spinner.hide();
                  this.router.navigate(['/providers/view'])
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
          this.title = "Create Provider"
          const formValue = this.form.value;
          this.spinner.show();

          setTimeout(() => {
            this.ProviderSrv.createProvider(formValue)
              .subscribe((res: any) => {
                if (res) {
                  this.spinner.hide();
                  this.router.navigate(['/providers/view'])
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

  get position() { return this.form.controls }

  onSubmit(): void {
    this.submitted = true;
    if (this.submitted && this.position['name_provider']?.errors) {
    }
    if (this.submitted && this.position['description_provider	']?.errors) {
    }
    if (this.submitted && this.position['status	']?.errors) {
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
