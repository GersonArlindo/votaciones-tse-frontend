
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InstallerService } from '@app/core/services/installer.service';
import { StatesService } from '@app/core/services/states.service';
import { UsersService } from '@app/core/services/users.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-edit-installers',
  templateUrl: './add-edit-installers.component.html',
  styleUrls: ['./add-edit-installers.component.scss']
})
export class AddEditInstallersComponent implements OnInit {

  form!: FormGroup;
  id: any;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;
  public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  public url = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg';

  public state: any[] = [];
  public selectedSearchStateId!: number;
  public uploadFiles: any;
  public formData: any = new FormData();
  public getImage: any;
  public getName: any;
  public data: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private StateSrv: StatesService,
    private InstallerSrv: InstallerService,
    private UserSrv: UsersService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getState();
    this.getUserById(this.uid);

    this.form = this.formBuilder.group({
      epc_name: ['', [Validators.required]],
      installers_images: [''],
      state_id : [this.selectedSearchStateId],
      contact_email: ['',[Validators.pattern(this.emailPattern)]],
      installers_phone: [''],
      created_by: [`${this.FullName}`]
    });

    this.title = 'Add Installer';
    if (this.id) {
        // edit mode
        this.title = 'Edit Installer';
        this.loading = true;
        
        this.InstallerSrv.getInstallerById(this.id)
        .subscribe((next: any) => {
          this.form = this.formBuilder.group({
            epc_name: [next['epc_name'], [Validators.required]],
            installers_images: [next['installers_images']],
            state_id: [next['state_id']],
            contact_email: [next['contact_email'],[Validators.pattern(this.emailPattern)]],
            installers_phone: [next['installers_phone']],
            created_by: [next['created_by']]
          });

          this.url = `${next['installers_images']}`;
          this.selectedSearchStateId = next['state_id'];         
        })
    }
  }

  public getUserById(uid: any){
    this.UserSrv.getUsers()
    .subscribe((user: any) => {
      for(let users of user){
        if(users.user_id == uid){
          this.getName = `${users.first_name} ${users.last_name}`;
          this.data.push(this.getName)
        }
      }
    })
  }

  public getState(){
    this.StateSrv.getStates()
    .subscribe((state: any) => {
      this.state = state;
    })
  }

  public saveInstallers(){
    if(this.id){
      this.formData.append("epc_name", this.form.get('epc_name')!.value);
      this.formData.append("state_id", this.selectedSearchStateId);
      this.formData.append("contact_email", this.form.get('contact_email')!.value);
      this.formData.append("installers_phone", this.form.get('installers_phone')!.value);
      this.formData.append("created_by", this.FullName);
      this.formData.append("installers_images", this.uploadFiles)

      this.spinner.show();
  
      setTimeout(() => {
      this.InstallerSrv.updateInstaller(this.formData, this.id)
      .subscribe((res: any) => {
        if(res){
          this.spinner.hide();
          this.router.navigate(['/installers/view']); 
        }else{
        }
      })
      }, 1200);

    }else{

      this.formData.append("epc_name", this.form.get('epc_name')!.value);
      this.formData.append("state_id", this.selectedSearchStateId);
      this.formData.append("contact_email", this.form.get('contact_email')!.value);
      this.formData.append("installers_phone", this.form.get('installers_phone')!.value);
      this.formData.append("created_by",this.FullName);
      this.formData.append("installers_images", this.uploadFiles)

      this.spinner.show();
  
      setTimeout(() => {
      this.InstallerSrv.createInstaller(this.formData)
      .subscribe((res: any) => {
        if(res){
          this.spinner.hide();
          this.router.navigate(['/installers/view']); 
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
    if (this.submitted && this.position['epc_name']?.errors) { 
    }
    if (this.submitted && this.position['installers_images']?.errors) { 
    }
    if (this.submitted && this.position['state_id']?.errors) { 
    }
    if (this.submitted && this.position['contact_email']?.errors) { 
    }
    if (this.submitted && this.position['installers_phone']?.errors) { 
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

  uid: any = this.getUserInfo('uid');
  FullName: any = this.getUserInfo('name');

}
