import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatesService } from '@app/core/services/states.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-edit-state',
  templateUrl: './add-edit-state.component.html',
  styleUrls: ['./add-edit-state.component.scss']
})
export class AddEditStateComponent implements OnInit {

  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;
  selectedCoveredVirtually!:number;
  selectedCoveredInPerson!:number; 

  public virtually: any;
  public person: any;
  public availableV: any[] = [];
  public availableP: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private StateSrv: StatesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.availableV = [
      {id: 1, name: 'Yes'},
      {id: 0, name: 'No'}
    ];

    this.availableP = [
      {id: 1, name: 'Yes'},
      {id: 0, name: 'No'}
    ];

    this.form = this.formBuilder.group({
      name_state: ['', [Validators.required]],
      abbreviation: ['',[Validators.required]],
      covered_virtually: [this.virtually],
      covered_inperson: [this.person],
      status: ['1']
    });

    this.title = 'Add State';
    if (this.id) {
      // edit mode
      this.title = 'Edit State';
      this.loading = true;
      this.id = this.route.snapshot.params['id'];

      this.StateSrv.getStates()
        .subscribe((next: any) => {
          for(let state of next){
            if(state.state_id == this.id){
              this.form = this.formBuilder.group({
                name_state: [state.name_state, [Validators.required]],
                abbreviation: [state.abbreviation, [Validators.required]],
                covered_virtually: [state.covered_virtually],
                covered_inperson: [state.covered_inperson],
                status: [state.status]
              });

              this.selectedCoveredVirtually = state.covered_virtually;
              this.selectedCoveredInPerson = state.covered_inperson; 
            }
          }
        })
    }
  }

  public getCoveredV(event:any){
    this.virtually = event;
  }

  public getCoveredP(event:any){
    this.person = event;
  }

  public saveState() {
    if (this.id) {

      var data: any = {
        name_state: this.form.controls['name_state'].value,
        abbreviation: this.form.controls['abbreviation'].value,
        covered_virtually: this.virtually,
        covered_inperson: this.person,
        status: 1
      }

      this.spinner.show();

      setTimeout(() => {
        this.StateSrv.updateStates(data, this.id)
          .subscribe((res: any) => {
            if (res) {
              this.spinner.hide();
              this.router.navigate(['/state/view']);
            } else {
            }
          })
      }, 1200);

    } else {

      var data: any = {
        name_state: this.form.controls['name_state'].value,
        abbreviation: this.form.controls['abbreviation'].value,
        covered_virtually: this.virtually,
        covered_inperson: this.person,
        status: 1
      }

      const formValue = this.form.value;
      this.spinner.show();

      setTimeout(() => {
        this.StateSrv.createStates(data)
          .subscribe((res: any) => {
            if (res) {
              this.spinner.hide();
              this.router.navigate(['/state/view']);
            } else {
            }
          })
      }, 1200);
    }
  }

  get position() { return this.form.controls}

  onSubmit(): void{
    this.submitted = true;
    if (this.submitted && this.position['name_state']?.errors) { 
    }
    if (this.submitted && this.position['abbreviation']?.errors) { 
    }
    if (this.submitted && this.position['covered_virtually']?.errors) { 
    }
    if (this.submitted && this.position['covered_inperson']?.errors) { 
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

