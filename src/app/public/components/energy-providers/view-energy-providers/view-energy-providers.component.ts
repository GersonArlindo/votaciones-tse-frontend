import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { energy_provider } from '@app/core/models/energy_provider.interface';
import { EnergyProviderService } from '@app/core/services/energy-provider.service';
import { PermissionService } from '@app/core/services/permission.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-view-energy-providers',
    templateUrl: './view-energy-providers.component.html',
    styleUrls: ['./view-energy-providers.component.scss']
})
export class ViewEnergyProvidersComponent implements OnInit {

    public energy_provider: energy_provider[] = [];
    @ViewChild('dt') table!: Table;
    closeResult: any = "";

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
        private EnergyProviderSrv: EnergyProviderService,
        private primengConfig: PrimeNGConfig,
        private router: Router,
        private PermissionSrv: PermissionService,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit(): void {
        this.getEnergyProvider(); 
        this.getPermissionRole(this.rol_id); 
        this.form = this.formBuilder.group({
          energy_provider_name: ['', [Validators.required]],
          energy_provider_description: ['', [Validators.required]],
        });   
    }

    public getEnergyProvider(){
        this.EnergyProviderSrv.getEnergy_Provider()
        .subscribe((data: any) => {
          this.energy_provider = data;
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

    public deleteEnergyProvider(id: any){
        this.EnergyProviderSrv.deleteEnergy_Provider(id)
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

    public EnergyProvider(id: any){
      this.EnergyProviderSrv.deleteEnergy_Provider(id)
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

    viewEnergyProviderModal(content: any, viewProduct:any) {  
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
        this.closeResult = `Closed with: ${result}`;  
        if (result === 'yes') {  
          this.EnergyProvider(viewProduct);
        }  
      }, (reason) => {  
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
      });  
  }  

    deleteEnergyProviderModal(content: any, viewProduct:any) {  
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
          this.closeResult = `Closed with: ${result}`;  
          if (result === 'yes') {  
            this.deleteEnergyProvider(viewProduct);
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

    public getPermissionRole(id: any){
      this.PermissionSrv.getPermissionsByRole(id)
        .subscribe((permission: any) => {
          for(let permiss of permission){
            if(permiss.mod_id == 8){
              this.update = permiss['update'];
              this.deleted = permiss['deleted'];
              this.create = permiss['create'];
            }
          }
        })
    }
  
    editEnergyProviderModal(content: any, id: any) {
      this.EnergyProviderSrv.getEnergy_ProviderById(id)
        .subscribe((next: any) => {
          this.form = this.formBuilder.group({
            energy_provider_name: [next['energy_provider_name'], [Validators.required]],
            energy_provider_description: [next['energy_provider_description'], [Validators.required]]
          });
        })
      if (id >= 1) {
        this.title = "Edit Energy Provider"
      } else if (id == 0) {
        this.title = "Create Energy Provider"
      }
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        if (result === 'yes') {
          if (id >= 1) {
            this.title = "Edit Energy Provider"
  
            const formValue = this.form.value;
            this.spinner.show();
  
            setTimeout(() => {
              this.EnergyProviderSrv.updateEnergy_Provider(formValue, id)
                .subscribe((res: any) => {
                  if (res) {
                    this.spinner.hide();
                    this.router.navigate(['/energy-providers/view'])
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
            this.title = "Create Energy Provider"
            const formValue = this.form.value;
            this.spinner.show();
  
            setTimeout(() => {
              this.EnergyProviderSrv.createEnergy_Provider(formValue)
                .subscribe((res: any) => {
                  if (res) {
                    this.spinner.hide();
                    this.router.navigate(['/energy-providers/view'])
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
    if (this.submitted && this.position['energy_provider_name']?.errors) {
    }
    if (this.submitted && this.position['energy_provider_name']?.errors) {
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
