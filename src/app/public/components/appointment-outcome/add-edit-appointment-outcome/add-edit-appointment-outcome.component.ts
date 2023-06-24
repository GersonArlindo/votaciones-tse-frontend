import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentOutcomeService } from '@app/core/services/appointment-outcome.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-edit-appointment-outcome',
  templateUrl: './add-edit-appointment-outcome.component.html',
  styleUrls: ['./add-edit-appointment-outcome.component.scss']
})
export class AddEditAppointmentOutcomeComponent implements OnInit {

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
    private AppointmenOutcomeSrv: AppointmentOutcomeService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      apptm_outcome_name: ['', [Validators.required]],
    });
 
    this.title = 'Add Appointment Outcome';
    if (this.id) {
        // edit mode
        this.title = 'Edit Appointment Outcome';
        this.loading = true;
        
        this.AppointmenOutcomeSrv.getAppointmentOutcome()
        .subscribe((next: any) => { 
          for(let appointment of next){
            if(appointment.apptm_outcome_id == this.id){
              this.form = this.formBuilder.group({
                apptm_outcome_name: [appointment.apptm_outcome_name, [Validators.required]],
              });
            }
          }
          
        })
    }
  }

  public saveAppointmentOutcome(){
    if(this.id){

      const formValue = this.form.value;  
      this.spinner.show();
  
      setTimeout(() => {
      this.AppointmenOutcomeSrv.updateAppointmentOutcome(formValue, this.id)
      .subscribe((res: any) => {
        if(res){
          this.spinner.hide();
          this.router.navigate(['/appointment-outcome/view']); 
        }else{
        }
      })
      }, 1200);

    }else{

      const formValue = this.form.value;  
      this.spinner.show();
  
      setTimeout(() => {
      this.AppointmenOutcomeSrv.createAppointmentOutcome(formValue)
      .subscribe((res: any) => {
        if(res){
          this.spinner.hide();
          this.router.navigate(['/appointment-outcome/view']); 
        }else{
        }
      })
      }, 1200);
      
    }
  }

  get position() { return this.form.controls}

  onSubmit(): void{
    this.submitted = true;
    if (this.submitted && this.position['apptm_outcome_name']?.errors) { 
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
