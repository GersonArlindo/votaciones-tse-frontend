import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from '@app/core/services/module.service';
import { PermissionService } from '@app/core/services/permission.service';
import { RoleService } from '@app/core/services/role.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-edit-permisos',
  templateUrl: './add-edit-permisos.component.html',
  styleUrls: ['./add-edit-permisos.component.scss']
})
export class AddEditPermisosComponent implements OnInit {

  form!: FormGroup;
  id: any;
  type: any;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  public module: any[] = [];
  public role: any[] = [];
  public selectedSearchModuleId!: number;
  public selectedSearchRoleId!: number;
  public formData: any = new FormData();
  public getName: any;
  public data: any[] = [];
  public rol_name: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private ModuleSrv: ModuleService,
    private PermissionSrv: PermissionService,
    private RoleSrv: RoleService,

  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.type = this.route.snapshot.params['type'];

    this.getModule(this.type);
    this.getRoles();
    this.getRoleById(this.type);

    this.form = this.formBuilder.group({
      mod_id : [this.selectedSearchModuleId],
      rol_id: [this.selectedSearchRoleId],
    });

    this.title = 'Add Permission';
    if (this.id) {
        // edit mode
        this.title = 'Edit Permission';
        this.loading = true;
        
        this.PermissionSrv.getPermissionsById(this.id)
        .subscribe((next: any) => {
          this.form = this.formBuilder.group({
            mod_id: [next['mod_id']],
            rol_id: [next['rol_id']],
          });

          this.selectedSearchModuleId = next['mod_id']; 
          this.selectedSearchRoleId = next['rol_id'];

        })
    }
  }

  public getRoleById(id: any){
    this.RoleSrv.getRoleById(id)
    .subscribe((role: any) => {
      this.rol_name = role['rol_rol']
    })
  }

  public getRoles(){
    this.RoleSrv.getRole()
    .subscribe((role: any) => {
      this.role = role;
    })
  }

  public getModule(id: any){
    this.ModuleSrv.getModuleByIdRole(id)
    .subscribe((module: any) => {
      this.module = module;
    })
  }

  public getPermissionById(id: any){
    this.PermissionSrv.getPermissions()
    .subscribe((module: any) => {
      for(let modules of module){
        if(modules.mod_id == id){
          this.getName = `${modules.mod_nombre}`;
          this.data.push(this.getName)
        }
      }
    })
  }


  public savePermission(){
    if(this.id){
      this.formData.append("mod_id", this.selectedSearchModuleId);
      this.formData.append("rol_id", this.type);
      this.formData.append("status", 1);

      this.spinner.show();
  
      setTimeout(() => {
      this.PermissionSrv.updatePermissions(this.formData, this.id)
      .subscribe((res: any) => {
        if(res){
          this.spinner.hide();
          this.router.navigate(['/permisos/view', this.type]); 
        }else{
        }
      })
      }, 1200);

    }else{

      this.formData.append("mod_id", this.selectedSearchModuleId);
      this.formData.append("rol_id", this.type);
      this.formData.append("status", 1);

      this.spinner.show();
  
      setTimeout(() => {
      this.PermissionSrv.createPermissions(this.formData)
      .subscribe((res: any) => {
        if(res){
          this.spinner.hide();
          this.router.navigate(['/permisos/view', this.type]); 
        }else{
        }
      })
      }, 1200);
    }
  }

  get position() { return this.form.controls}

  onSubmit(): void{
    this.submitted = true;
    if (this.submitted && this.position['per_nombre']?.errors) { 
    }
    if (this.submitted && this.position['mod_id']?.errors) { 
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
    
}
