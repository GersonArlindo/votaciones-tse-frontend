import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from '@app/core/services/provider.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-edit-providers',
  templateUrl: './add-edit-providers.component.html',
  styleUrls: ['./add-edit-providers.component.scss']
})
export class AddEditProvidersComponent implements OnInit {

  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  public eventStatus: any;
  public status : any[] = [];
  public selectedSearchStatusId!: number;
  public selectedStatus!: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ProviderSrv: ProviderService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
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
      status: [this.eventStatus],
      description_provider: ['', [Validators.required]],

    });
 
    this.title = 'Add Provider';
    if (this.id) {
        // edit mode
        this.title = 'Edit Provider';
        this.loading = true;
        
        this.ProviderSrv.getProviderById(this.id)
        .subscribe((next: any) => {
          this.form = this.formBuilder.group({
            name_provider: [next['name_provider'], [Validators.required]],
            status: [next['status'], [Validators.required]],
            description_provider: [next['description_provider'], [Validators.required]],
          });
          this.selectedStatus = next['status']
        })
    }
  }
  public saveProvider(){
    if(this.id){

      const formValue = this.form.value;  
      this.spinner.show();
  
      setTimeout(() => {
      this.ProviderSrv.updateProvider(formValue, this.id)
      .subscribe((res: any) => {
        if(res){
          this.spinner.hide();
          this.router.navigate(['/providers/view']); 
        }else{
        }
      })
      }, 1200);

    }else{

      const formValue = this.form.value;  
      this.spinner.show();
  
      setTimeout(() => {
      this.ProviderSrv.createProvider(formValue)
      .subscribe((res: any) => {
        if(res){
          this.spinner.hide();
          this.router.navigate(['/providers/view']); 
        }else{
        }
      })
      }, 1200);
      
    }
  }

  get position() { return this.form.controls}

  onSubmit(): void{
    this.submitted = true;
    if (this.submitted && this.position['name_provider']?.errors) { 
    }    
    if (this.submitted && this.position['status']?.errors) { 
    }   
    if (this.submitted && this.position['description_provider']?.errors) { 
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
