import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesRepService } from '@app/core/services/sales-rep.service';
import { StatesService } from '@app/core/services/states.service';
import { UsersService } from '@app/core/services/users.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-edit-sales-rep',
  templateUrl: './add-edit-sales-rep.component.html',
  styleUrls: ['./add-edit-sales-rep.component.scss'],
})

export class AddEditSalesRepComponent implements OnInit {
  form!: FormGroup;
  id: any;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;
  public emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  //public url = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg';

  public state: any[] = [];
  public user: any[] = [];
  public status: any[] = [];
  public color_appt: any[] = [];
  public typeavailability: any[] = [];

  public eventStatus: any;
  public eventtypeAvailability: any;

  public selectedSearchStateId!: number;
  public selectedSearchUserId!: number;

  public selectedStatus!: number;
  public selectedTypeAvailability!: number;

  //public uploadFiles: any;
  public formData: any = new FormData();
  //public getImage: any;
  public getName: any;
  public data: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private StateSrv: StatesService,
    private SalesRepSrv: SalesRepService,
    private UserSrv: UsersService
  ) {}

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];
    this.getState();
    this.getUser();
    this.getUserById(this.uid);

    this.status = [
      {id: 1, name: 'Active'},
      {id: 0, name: 'Inactive'}
    ];

    this.typeavailability = [
      {id: 1, name: 'Virtual'},
      {id: 2, name: 'In Person'},
      {id: 3, name: 'Virtual & In Person'}
    ];

    this.form = this.formBuilder.group({
      user_id: [this.selectedSearchUserId],
      state_id: [this.selectedSearchStateId],
      appointment_type_availability: [this.eventtypeAvailability],
      appt_status: [this.eventStatus],
      color_appt: [this.color_appt],
      created_by: [`${this.FullName}`],
    });

    this.title = 'Add Sales Rep';
    if (this.id) {
      // edit mode
      this.title = 'Edit Sales Rep';
      this.loading = true;
      this.id = this.route.snapshot.params['id'];

      this.SalesRepSrv.getSalesRep()
      .subscribe((next: any) => {
        for(let saleRep of next){
          if(saleRep.sales_rep_id == this.id){
            this.form = this.formBuilder.group({
              user_id: [saleRep.user_id],
              state_id: [saleRep.state_id],
              appointment_type_availability: [saleRep.appointment_type_availability],
              appt_status: [saleRep.appt_status],
              color_appt: [saleRep.color_appt],
              created_by: [saleRep.created_by],
            });
            this.selectedSearchStateId = saleRep.state_id;
            this.selectedSearchUserId = saleRep.user_id;
            this.selectedStatus = saleRep.appt_status;
            this.selectedTypeAvailability = saleRep.appointment_type_availability;
          }
        } 
      });
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

  public getState() {
    this.StateSrv.getStates().subscribe((state: any) => {
      this.state = state;
    });
  }

  public getUser() {
    this.UserSrv.getUsers().subscribe((user: any) => {
      this.user = user;
    });
  }

  public saveSalesRep() {
    if (this.id) {
      //this.formData.append('epc_name', this.form.get('epc_name')!.value);
      this.formData.append('user_id', this.selectedSearchUserId);
      this.formData.append('state_id', this.selectedSearchStateId);
      this.formData.append('appointment_type_availability', this.selectedTypeAvailability);
      this.formData.append('appt_status', this.selectedStatus);
      this.formData.append('color_appt', this.form.get('color_appt')!.value);
      this.formData.append('created_by', this.FullName);

      this.spinner.show();

      setTimeout(() => {
        this.SalesRepSrv.updateSalesRep(this.formData, this.id).subscribe(
          (res: any) => {
            if (res) {
              this.spinner.hide();
              this.router.navigate(['/sales-rep/view']);
            } else {
            }
          }
        );
      }, 1200);
    } else {
      this.formData.append('user_id', this.selectedSearchUserId);
      this.formData.append('state_id', this.selectedSearchStateId);
      this.formData.append('appointment_type_availability', this.selectedTypeAvailability);
      this.formData.append('appt_status', this.selectedStatus);
      this.formData.append('color_appt', this.form.get('color_appt')!.value);
      this.formData.append('created_by', this.FullName);

      this.spinner.show();

      setTimeout(() => {
        this.SalesRepSrv.createSalesRep(this.formData).subscribe(
          (res: any) => {
            if (res) {
              this.spinner.hide();
              this.router.navigate(['/sales-rep/view']);
            } else {
            }
          }
        );
      }, 1200);
    }
  }

  public getStatus(event:any){
    this.eventStatus = event;
  }

  public getTypeAvailability(event:any){
    this.eventtypeAvailability = event;
  }

  get position() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.submitted && this.position['user_id']?.errors) {
    }
    if (this.submitted && this.position['state_id']?.errors) {
    }
    if (this.submitted && this.position['appointment_type_availability']?.errors) {
    }
    if (this.submitted && this.position['appt_status']?.errors) {
    }
    if (this.submitted && this.position['color_appt']?.errors) {
    }
    if (this.submitted && this.position['created_by']?.errors) {
    }
  }

  public isValid() {
    return !this.form.valid;
  }

  isValidField(field: string) {
    return (
      (this.form.get(field) || this.form.get(field)?.dirty) &&
      !this.form.get(field)?.valid
    );
  }

  getUserInfo(inf: any) {
    const token = this.getTokens();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload)[`${inf}`];
    } else {
      return null;
    }
  }

  getTokens() {
    return localStorage.getItem('login-token');
  }

  uid: any = this.getUserInfo('uid');
  FullName: any = this.getUserInfo('name');

}
