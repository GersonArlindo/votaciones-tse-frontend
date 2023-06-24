import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LenguageService } from '@app/core/services/lenguage.service';
import { ModuleService } from '@app/core/services/module.service';
import { RoleService } from '@app/core/services/role.service';
import { UsersService } from '@app/core/services/users.service';
import { environment } from '@encoding/environment';
import { emit, on } from 'cluster';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.scss']
})
export class AddEditUsersComponent implements OnInit {

  form!: FormGroup;
  id: any;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;
  public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  public url = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg';


  public eventStatus: any;
  public role: any[] = [];
  public language: any[] = [];
  public status : any[] = [];

  public selectedSearchLanguageId!: number;
  public selectedSearchRolId!: number;
  public selectedStatus!: number;
  public uploadFiles: any;
  public formData: any = new FormData();
  public getImage: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private UsersSrv: UsersService,
    private LenguageSrv: LenguageService,
    private RoleSrv: RoleService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getRoles();
    this.getLanguage();
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
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      username: ['', [Validators.required]],
      user_images: [''],
      email: ['', [Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone_number: [''],
      language_id: [this.selectedSearchLanguageId],
      rol_id: [this.selectedSearchRolId],
      status: [this.eventStatus]
    });
 
    this.title = 'Add Users';
    if (this.id) {
        // edit mode
        this.title = 'Edit Users';
        this.loading = true;
        
        this.UsersSrv.getUserById(this.id)
        .subscribe((next: any) => {
          console.log(next)
          this.form = this.formBuilder.group({
            first_name: [next['first_name'], [Validators.required]],
            last_name: [next['last_name'], [Validators.required]],
            birthdate: [next['birthdate'], [Validators.required]],
            username: [next['username'], [Validators.required]],
            user_images: [next['user_images']],
            email: [next['email'], [Validators.pattern(this.emailPattern)]],
            password: [next['password'], [Validators.required, Validators.minLength(6)]],
            phone_number: [next['phone_number']],
            language_id: [next['language_id']],
            rol_id: [next['rol_id']],
            status: [next['status'], [Validators.required]]
          });

          this.url = `${environment.API_URL}images/${next['user_images']}`;
          this.selectedSearchLanguageId = next['language_id'];          
          this.selectedSearchRolId = next['rol_id'];
          this.selectedStatus = next['status']
        })
    }
  }

  public getRoles(){
    this.RoleSrv.getRole()
    .subscribe((role: any) => {
      this.role = role;
    })

    console.log(this.role)
  }

  public getLanguage(){
    this.LenguageSrv.getLenguages()
    .subscribe((data: any) => {
      this.language = data;
    })
  }

  public getStatus(event:any){
    this.eventStatus = event;
  }

  public saveUsers(){
    if(this.id){
      this.formData.append("first_name", this.form.get('first_name')!.value);
      this.formData.append("last_name", this.form.get('last_name')!.value);
      this.formData.append("birthdate", this.form.get('birthdate')!.value);
      this.formData.append("username", this.form.get('username')!.value);
      this.formData.append("user_images", this.uploadFiles)
      this.formData.append("email", this.form.get('email')!.value);
      this.formData.append("phone_number", this.form.get('phone_number')!.value);
      this.formData.append("language_id", this.selectedSearchLanguageId);
      this.formData.append("rol_id", this.selectedSearchRolId);
      this.formData.append("status", this.selectedStatus);

      this.spinner.show();
  
      setTimeout(() => {
      this.UsersSrv.updateUsers(this.formData, this.id)
      .subscribe((res: any) => {
        if(res){
          this.spinner.hide();
          this.router.navigate(['/users/view']); 
        }else{
        }
      })
      }, 1200);

    }else{

      this.formData.append("first_name", this.form.get('first_name')!.value);
      this.formData.append("last_name", this.form.get('last_name')!.value);
      this.formData.append("birthdate", this.form.get('birthdate')!.value);
      this.formData.append("username", this.form.get('username')!.value);
      this.formData.append("user_images", this.uploadFiles);
      this.formData.append("email", this.form.get('email')!.value);
      this.formData.append("password", this.form.get('password')!.value);
      this.formData.append("phone_number", this.form.get('phone_number')!.value);
      this.formData.append("language_id", this.selectedSearchLanguageId);
      this.formData.append("rol_id", this.selectedSearchRolId);
      this.formData.append("status", this.selectedStatus);

      this.spinner.show();
  
      setTimeout(() => {
      this.UsersSrv.createUsers(this.formData)
      .subscribe((res: any) => {
        if(res){
          this.spinner.hide();
          this.router.navigate(['/users/view']); 
        }else{
        }
      })
      }, 1200);
      
    }
  }

  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  onFileSelect(event: any) {
    if(event.target.files && event.target.files[0]) { 
      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.uploadFiles = event.target.files[0];
    }
  }

  get position() { return this.form.controls}

  onSubmit(): void{
    this.submitted = true;
    if (this.submitted && this.position['user_name']?.errors) { 
    }
    if (this.submitted && this.position['last_name']?.errors) { 
    }
    if (this.submitted && this.position['username']?.errors) { 
    }
    if (this.submitted && this.position['user_images']?.errors) { 
    }
    if (this.submitted && this.position['email']?.errors) { 
    }
    if (this.submitted && this.position['password']?.errors) { 
    }
    if (this.submitted && this.position['phone_number']?.errors) { 
    }
    if (this.submitted && this.position['language_id']?.errors) { 
    }
    if (this.submitted && this.position['rol_id']?.errors) { 
    }
    if (this.submitted && this.position['status']?.errors) { 
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
