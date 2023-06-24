import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '@app/core/services/role.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-edit-roles',
  templateUrl: './add-edit-roles.component.html',
  styleUrls: ['./add-edit-roles.component.scss']
})
export class AddEditRolesComponent implements OnInit {
  
  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private RoleSrv: RoleService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      rol_rol: ['', [Validators.required]],
      rol_descripcion: ['', [Validators.required]],
    });
 
    this.title = 'Add Role';
    if (this.id) {
        // edit mode
        this.title = 'Edit Role';
        this.loading = true;
        
        this.RoleSrv.getRoleById(this.id)
        .subscribe((next: any) => {
          this.form = this.formBuilder.group({
            rol_rol: [next['rol_rol'], [Validators.required]],
            rol_descripcion: [next['rol_descripcion'], [Validators.required]],
          });
        })
    }
  }
  public saveRole(){
    if(this.id){

      const formValue = this.form.value;  
      this.spinner.show();
  
      setTimeout(() => {
      this.RoleSrv.updateRole(formValue, this.id)
      .subscribe((res: any) => {
        if(res){
          this.spinner.hide();
          this.router.navigate(['/roles/view']); 
        }else{
        }
      })
      }, 1200);

    }else{

      const formValue = this.form.value;  
      this.spinner.show();
  
      setTimeout(() => {
      this.RoleSrv.createRole(formValue)
      .subscribe((res: any) => {
        if(res){
          this.spinner.hide();
          this.router.navigate(['/roles/view']); 
        }else{
        }
      })
      }, 1200);
    }
  }

  get position() { return this.form.controls}

  onSubmit(): void{
    this.submitted = true;
    if (this.submitted && this.position['rol_rol']?.errors) { 
    }    
    if (this.submitted && this.position['rol_descripcion']?.errors) { 
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
