import { Component, OnInit, ViewChild } from '@angular/core';
import { ModuleService } from '@app/core/services/module.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import {module} from '@core/models/modules.interface';
import { Router } from '@angular/router';
import { PermissionService } from '@app/core/services/permission.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-modulos',
  templateUrl: './view-modulos.component.html',
  styleUrls: ['./view-modulos.component.scss']
})
export class ViewModulosComponent implements OnInit {

  public module: module[] = [];
  @ViewChild('dt') table!: Table;
  closeResult:any = "";

  update: any;
  delete: any;
  create: any;
  form!: FormGroup;
  id?: string;
  submitting = false;
  submitted = false;
  title!: string;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder, 
    private ModuleSrv: ModuleService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private PermissionSrv: PermissionService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getModule();
    this.getPermissionRole(this.rol_id);
    this.form = this.formBuilder.group({
      mod_nombre: ['', [Validators.required]],
    });
  }

  public getPermissionRole(id: any){
    this.PermissionSrv.getPermissionsByRole(id)
      .subscribe((permission: any) => {
        for(let permiss of permission){
          if(permiss.mod_id == 1){
            this.update = permiss['update'];
            this.delete = permiss['deleted'];
            this.create = permiss['create'];
          }
        }
      })
  }

  public getModule(){
    this.ModuleSrv.getModules()
    .subscribe((data: any) => {
      this.module = data;
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

  public deleteModule(id: any){
    this.ModuleSrv.deleteModule(id)
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

  editModuleModal(content: any, id: any) {
    this.ModuleSrv.getModulesById(id)
      .subscribe((next: any) => {
        this.form = this.formBuilder.group({
          mod_nombre: [next['mod_nombre'], [Validators.required]],
        });
      })
    if (id == 0) {
      this.title = "Create Module"
    } 
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

      if (result === 'yes') {
         if (id == 0) {
          this.title = "Create Module"
          const formValue = this.form.value;
          this.spinner.show();

          setTimeout(() => {
            this.ModuleSrv.createModule(formValue)
              .subscribe((res: any) => {
                if (res) {
                  this.spinner.hide();
                  this.router.navigate(['/modulos/view'])
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

  deleteModuleModal(content: any, viewProduct:any) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.deleteModule(viewProduct);
      }  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });  
  } 
  getDismissReason(reason: any) {
    throw new Error('Method not implemented.');
  }

  get position() { return this.form.controls }

  onSubmit(): void {
    this.submitted = true;
    if (this.submitted && this.position['mod_nombre']?.errors) {
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
