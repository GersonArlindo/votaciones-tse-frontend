import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentOutcomeService } from '@app/core/services/appointment-outcome.service';
import { AssignAppmtService } from '@app/core/services/assign-appmt.service';
import { DisqualificationsService } from '@app/core/services/disqualifications.service';
import { EnergyProviderService } from '@app/core/services/energy-provider.service';
import { InstallerService } from '@app/core/services/installer.service';
import { LeadsService } from '@app/core/services/leads.service';
import { LenguageService } from '@app/core/services/lenguage.service';
import { ProviderService } from '@app/core/services/provider.service';
import { RoofService } from '@app/core/services/roof.service';
import { SalesRepService } from '@app/core/services/sales-rep.service';
import { StatesService } from '@app/core/services/states.service';
import { TimeZoneService } from '@app/core/services/time-zone.service';
import { UsersService } from '@app/core/services/users.service';
import { clear, Console } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-assign-appmt',
  templateUrl: './add-edit-assign-appmt.component.html',
  styleUrls: ['./add-edit-assign-appmt.component.scss'],
})
export class AddEditAssignAppmtComponent implements OnInit {
  form!: FormGroup;
  id: string = '';
  lead: string = '';

  public provider: any[] = [];
  public manager: any[] = [];
  public user: any[] = [];
  public apptOutcome: any[] = [];
  public language: any[] = [];
  public meterLocation: any[] = [];
  public energy: any[] = [];
  public roof: any[] = [];
  public replace: any[] = [];
  public apptType: any[] = [];
  public timeZone: any[] = [];
  public installer: any[] = [];
  public disqualification: any[] = [];
  public salesRep: any[] = [];
  public userWho: any;

  public formData: any = new FormData();
  public formDataLead: any = new FormData();
  public opcionSeleccionadaProvider!: number;
  public opcionSeleccionadaManager!: number;
  public opcionSeleccionadaUser!: number;
  public opcionSeleccionadaUserRep!: number;
  public opcionSeleccionadaAppointmentOutcome!: number;
  public opcionSeleccionadaLanguage!: number;
  public opcionSeleccionadaMeterLocation!: number;
  public opcionSeleccionadaRoof!: number;
  public opcionSeleccionadaApptType!: number;
  public opcionSeleccionadaTimeZone!: number;
  public opcionSeleccionadaInstaller!: number;
  public opcionSeleccionadaEnergyProvider!: number;
  public opcionSeleccionadaState!: any;
  public opcionSeleccionadaDisqualification!: number;
  public opcionSeleccionadaSalesRep!: number;
  public opcionSeleccionadaCity!: number;

  fullname: any;
  lead_id: any;
  first_name: any;
  last_name: any;
  phone_number: any;
  email: any;
  st_address: any;
  city: any;
  state_lead: any;
  state: any;
  zip_code: any;
  full_address: any;
  source: any;
  campaign_name: any;
  ad_set_name: any;
  ad_name: any;
  ad_account_id: any;
  agent_assigned: any;
  outcome: any;
  tags: any;
  notes: any;
  submitted = false;
  eventBankrupcy: any;
  selectedBankrupcy!: number;
  opcionSeleccionadaReplace!: number;

  public eventProvider: any;
  public eventCity: any;
  public eventManager: any;
  public eventSaleRep: any;
  public eventUser: any;
  public eventLenguage: any;
  public eventMeterLocation: any;
  public eventState: any;
  public eventEnergyProvider: any;
  public eventOutCome: any;
  public eventDisqualification: any;
  public eventRoof: any;
  public eventReplaceRoof: any;
  public eventApptType: any;
  public eventTimeZone: any;
  public eventSalesRep: any;
  public eventInstaller: any;
  public eventRequestDesign: any;
  public open_outcome: any = 0;
  public email_sale_rep: any;
  public username_sale_rep: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private LeadsSrv: LeadsService,
    private ProviderSrv: ProviderService,
    private LanguageSrv: LenguageService,
    private ManagerSrv: UsersService,
    private EnergySrv: EnergyProviderService,
    private apptOutcomeSrv: AppointmentOutcomeService,
    private roofSrv: RoofService,
    private timeZoneSrv: TimeZoneService,
    private installerSrv: InstallerService,
    private stateSrv: StatesService,
    private assignAppmtSrv: AssignAppmtService,
    private DisqualificationSrv: DisqualificationsService,
    private SalesRepSrv: SalesRepService,
    private UserSrv: UsersService,
    private LeadSrv: LeadsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.lead = this.route.snapshot.params['lead'];

    // this.LeadsSrv.getLeadsById(this.lead)
    // .subscribe((next: any) => {
    //   this.fullname = next.first_name + ' ' + next.last_name; //
    //   this.campaign_name = next.campaign_name; //
    //   this.lead_id = next.lead_id;
    //   this.first_name = next.first_name; //
    //   this.last_name = next.last_name; //
    //   this.phone_number= next.phone_number; //
    //   this.email = next.email;
    //   this.st_address = next.st_address; //
    //   this.city = next.city; //
    //   this.state_lead = next.state; //
    //   this.zip_code = next.zip_code; //
    //   this.full_address = next.full_address; //
    //   this.source = next.source; //
    //   this.ad_set_name = next.ad_set_name; //
    //   this.ad_name = next.ad_name; //
    //   this.ad_account_id = next.ad_account_id;
    //   this.outcome = next.outcome;
    //   this.tags = next.tags;
    //   this.notes = next.notes;

    //   this.stateSrv.getStates()
    //   .subscribe((states: any) => {
    //     for(let state of states){
    //       if(state.name_state.toUpperCase() == next.state.toUpperCase()){
    //         this.opcionSeleccionadaState = state.name_state
    //       }
    //     }
    //   })
    // })
    //******************************************************************** */
    // Realizar solicitudes HTTP en paralelo
    forkJoin([
      this.LeadsSrv.getLeadsById(this.lead),
      this.stateSrv.getStates(),
    ]).subscribe(([next, states]: [any, any]) => {
      // Manejar la respuesta del lead
      this.fullname = next.first_name + ' ' + next.last_name;
      this.campaign_name = next.campaign_name; //
      this.lead_id = next.lead_id;
      this.first_name = next.first_name; //
      this.last_name = next.last_name; //
      this.phone_number = next.phone_number; //
      this.email = next.email;
      this.st_address = next.st_address; //
      this.city = next.city; //
      this.state_lead = next.state; //
      this.zip_code = next.zip_code; //
      this.full_address = next.full_address; //
      this.source = next.source; //
      this.ad_set_name = next.ad_set_name; //
      this.ad_name = next.ad_name; //
      this.ad_account_id = next.ad_account_id;
      this.outcome = next.outcome;
      this.tags = next.tags;
      this.notes = next.notes;
      // ... otros campos

      // Manejar la respuesta de los estados
      for (let state of states) {
        if (state.name_state.toUpperCase() == next.state.toUpperCase()) {
          this.opcionSeleccionadaState = state.name_state;
        }
      }
    });

    this.ProviderSrv.getProvider().subscribe((provider: any) => {
      this.provider = provider;
    });

    this.roofSrv.getRoof().subscribe((roof: any) => {
      this.roof = roof;
    });

    this.installerSrv.getInstaller().subscribe((installer: any) => {
      this.installer = installer;
    });

    this.SalesRepSrv.getSalesRep().subscribe((salesRep: any) => {
      this.salesRep = salesRep;
    });

    this.EnergySrv.getEnergy_Provider().subscribe((energy: any) => {
      this.energy = energy;
    });

    this.LanguageSrv.getLenguages().subscribe((language: any) => {
      this.language = language;
    });

    this.timeZoneSrv.getTime_Zone().subscribe((timeZone: any) => {
      this.timeZone = timeZone;
    });

    this.stateSrv.getStates().subscribe((states: any) => {
      this.state = states;
    });

    this.DisqualificationSrv.getDisqualification().subscribe(
      (disqualification: any) => {
        this.disqualification = disqualification;
      }
    );

    this.apptOutcomeSrv
      .getAppointmentOutcome()
      .subscribe((apptOutcome: any) => {
        this.apptOutcome = apptOutcome;
      });

    this.ManagerSrv.getUsers().subscribe((next: any) => {
      this.user = next;
      //this.opcionSeleccionadaUserRep = this.FullName
      this.opcionSeleccionadaUser = this.FullName;
      for (let manager of next) {
        if (manager.manager === 1) {
          this.manager.push(manager);
        }
      }
    });

    this.form = this.formBuilder.group({
      bill_amount: ['', [Validators.required]],
      credit_score: ['', [Validators.required]],
      anual_usage: ['', [Validators.required]],
      roof_age: ['', [Validators.required]],
      meter_number: ['', [Validators.required]],
      account_number: ['', [Validators.required]],
      appointment_datetime: ['', [Validators.required]],
      design_lead: ['', [Validators.required]],
      design_notes: ['', [Validators.required]],

      //Paso 1 Leads
      agent_assigned: ['', [Validators.required]],
      city: ['', [Validators.required]],
      //attendance_confirmed_date_time : ['', [Validators.required]]
      //provider_id: [this.selectedSearchProviderId],
    });

    this.meterLocation = [
      { id: 0, name: 'Inside' },
      { id: 1, name: 'Outside' },
    ];

    this.apptType = [
      { id: 1, name: 'Virtual' },
      { id: 2, name: 'In Person' },
    ];

    this.replace = [
      { id: 0, name: 'No' },
      { id: 1, name: 'Yes' },
    ];
  }

  public getProvider(event: any) {
    this.eventProvider = event;
    //console.log(this.eventProvider);
  }

  public getManager(event: any) {
    this.eventManager = event;
    //console.log(this.eventManager);
  }

  public getRoof(event: any) {
    this.eventRoof = event;
    //console.log(this.eventRoof);
  }

  public getCity(event: any) {
    this.eventCity = event;
    console.log(this.eventCity);
  }

  public getInstaller(event: any) {
    this.eventInstaller = event;
    //console.log(this.eventInstaller);
  }

  public getRequestDesign(event: any) {
    this.eventRequestDesign = event;
    //console.log(this.eventRequestDesign);
  }

  public getSalesRep(event: any) {
    this.eventSaleRep = event;

    this.SalesRepSrv.getSalesRep().subscribe((next: any) => {
      for (let saleRep of next) {
        if (saleRep.sales_rep_id == event) {
          this.email_sale_rep = saleRep.tbl_user.email;
          this.username_sale_rep = `${saleRep.tbl_user.first_name} ${saleRep.tbl_user.last_name}`;
        }
      }
    });
    //console.log(this.eventSaleRep);
  }

  public getUser(event: any) {
    this.eventUser = event;
    console.log(this.eventUser);
    this.UserSrv.getUsers().subscribe((next: any) => {
      for (let user of next) {
        if (user.user_id == event) {
          this.userWho = `${user.first_name} ${user.last_name}`;
          console.log(this.userWho);
        }
      }
    });
  }

  public getIdLanguage(event: any) {
    this.eventLenguage = event;
    //console.log(this.eventLenguage);
  }

  public getState(event: any) {
    this.eventState = event;
    //console.log(this.eventState);
  }

  public getReplaceRoof(event: any) {
    this.eventReplaceRoof = event;
    //console.log(this.eventReplaceRoof);
  }

  public getApptType(event: any) {
    this.eventApptType = event;
    //console.log(this.eventApptType);
  }

  public getTimeZone(event: any) {
    this.eventTimeZone = event;
    //console.log(this.eventTimeZone);
  }

  public getEnergyProvider(event: any) {
    this.eventEnergyProvider = event;
    //console.log(this.eventEnergyProvider);
  }

  public getMeterLocation(event: any) {
    this.eventMeterLocation = event;
    console.log(this.eventMeterLocation);
  }

  public getOutCome(event: any) {
    this.eventOutCome = event;
    if (event == 9) {
      this.open_outcome = 1;
    } else {
      this.open_outcome = 0;
    }
    //console.log(this.eventOutCome);
  }

  public getDisqualification(event: any) {
    this.eventDisqualification = event;
    console.log(this.eventDisqualification);
  }

  public getBankrupcy(event: any) {
    this.eventBankrupcy = event;
    //console.log(this.eventBankrupcy);
  }

  public saveAssignAppointment() {
    if (this.id) {
      this.formData.append('id_provider', this.eventProvider);
      this.formData.append('lead_id', this.lead);
      this.formData.append('manager', this.eventManager);
      this.formData.append('id_sales_rep', this.eventSaleRep);
      this.formData.append('user_id', this.eventUser);
      this.formData.append('id_language', this.eventLenguage);
      this.formData.append('bill_amount', this.form.get('bill_amount')!.value);
      this.formData.append(
        'credit_score',
        this.form.get('credit_score')!.value
      );
      this.formData.append('bankrupcy', this.eventBankrupcy);
      this.formData.append('id_energy_provider', this.eventEnergyProvider);
      this.formData.append('installer_id', this.eventInstaller);
      this.formData.append('anual_usage', this.form.get('anual_usage')!.value);
      this.formData.append('id_roof', this.opcionSeleccionadaRoof);
      this.formData.append('roof_age', this.form.get('roof_age')!.value);
      this.formData.append('replace_roof', this.eventReplaceRoof);
      this.formData.append(
        'meter_location',
        this.opcionSeleccionadaMeterLocation
      );
      this.formData.append(
        'meter_number',
        this.form.get('meter_number')!.value
      );
      this.formData.append(
        'account_number',
        this.form.get('account_number')!.value
      );
      this.formData.append('appointment_type', this.eventApptType);
      this.formData.append(
        'appointment_datetime',
        this.form.get('appointment_datetime')!.value
      );
      this.formData.append('id_timezone', this.eventTimeZone);
      this.formData.append('state_id', this.eventState);
      this.formData.append('status', 1); //
      this.formData.append('attendance_confirmed', 1); //
      this.formData.append('attendance_confirmed_date_time', '21-03-2023');
      this.formData.append('design_lead', this.eventRequestDesign);
      this.formData.append(
        'design_notes',
        this.form.get('design_notes')!.value
      );
      this.formData.append('approved_by', 1); //
      this.formData.append('doc_pending', 'Documento 1'); //
      this.formData.append('client_think', 'Pensamiento 1'); //
      this.formData.append('appt_outcome_id', this.eventOutCome);
      this.formData.append('disqualification_id', this.eventDisqualification);
      this.formData.append('crc_date', '21/03/2023'); //
      this.formData.append('financier', 'No se que es'); //
      this.formData.append('modify_by', this.FullName);
      this.spinner.show();
      setTimeout(() => {
        this.assignAppmtSrv
          .updateAssign_appmt(this.formData, this.id)
          .subscribe((res: any) => {
            if (res) {
              this.spinner.hide();
              this.router.navigate(['/leads/view']);
            } else {
            }
          });
      }, 1200);
    } else {
      this.formData.append('id_provider', this.eventProvider);
      this.formData.append('lead_id', this.lead);
      this.formData.append('manager', this.eventManager);
      this.formData.append('id_sales_rep', this.eventSaleRep);
      this.formData.append('user_id', this.eventUser ?? this.uid);
      this.formData.append('id_language', this.eventLenguage);
      this.formData.append('bill_amount', this.form.get('bill_amount')!.value);
      this.formData.append(
        'credit_score',
        this.form.get('credit_score')!.value
      );
      this.formData.append('bankrupcy', this.eventBankrupcy);
      this.formData.append('id_energy_provider', this.eventEnergyProvider);
      this.formData.append('installer_id', this.eventInstaller);
      this.formData.append('anual_usage', this.form.get('anual_usage')!.value);
      this.formData.append('id_roof', this.opcionSeleccionadaRoof);
      this.formData.append('roof_age', this.form.get('roof_age')!.value);
      this.formData.append('replace_roof', this.eventReplaceRoof);
      this.formData.append(
        'meter_location',
        this.opcionSeleccionadaMeterLocation
      );
      this.formData.append(
        'meter_number',
        this.form.get('meter_number')!.value
      );
      this.formData.append(
        'account_number',
        this.form.get('account_number')!.value
      );
      this.formData.append('appointment_type', this.eventApptType);
      this.formData.append(
        'appointment_datetime',
        this.form.get('appointment_datetime')!.value
      );
      this.formData.append('id_timezone', this.eventTimeZone);
      this.formData.append('state_id', this.eventState);
      this.formData.append('status', 1); // -------------------------------------------------
      this.formData.append('attendance_confirmed', 1); //------------------------------------
      this.formData.append('attendance_confirmed_date_time', '21-03-2023');
      this.formData.append('design_lead', this.eventRequestDesign);
      this.formData.append('design_notes', this.form.get('design_notes')!.value);
      this.formData.append('approved_by', 1); //---------------------------------------------
      this.formData.append('doc_pending', 'Documento 1'); //---------------------------------
      this.formData.append('client_think', 'Pensamiento 1'); //------------------------------
      this.formData.append('appt_outcome_id', this.eventOutCome);
      this.formData.append('disqualification_id', this.eventDisqualification);
      this.formData.append('crc_date', '21/03/2023'); //-------------------------------------
      this.formData.append('financier', 'No se que es'); //----------------------------------
      this.formData.append('created_by', this.FullName);
      this.formData.append('modify_by', this.FullName);
      this.formData.append('email', this.email_sale_rep);
      this.formData.append('name_assigned', this.username_sale_rep);

      this.spinner.show();
      setTimeout(() => {
        this.assignAppmtSrv
          .createAssign_appmt(this.formData)
          .subscribe((res: any) => {
            if (res) {
              this.formDataLead.append(
                'agent_assigned',
                this.userWho ?? this.FullName
              );
              this.formDataLead.append('city', this.eventCity ?? this.city);
              this.formDataLead.append('state', this.opcionSeleccionadaState);
              this.formDataLead.append('status_lead', 1);
              this.LeadSrv.updateLeads(
                this.formDataLead,
                this.lead_id
              ).subscribe((next: any) => {
                if (next) {
                  this.spinner.hide();
                  Swal.fire({
                    position: 'top-end',
                    title: 'Your work has been saved',
                    text: '',
                    showConfirmButton: false,
                    timer: 1000,
                    icon: 'success',
                  }).then(() => {
                    this.router.navigate(['/leads/view']);
                  });
                }
              });
            } else {
            }
          });
      }, 1200);
    }
  }

  get position() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.submitted && this.position['id_provider']?.errors) {
    }
    if (this.submitted && this.position['lead_id']?.errors) {
    }
    if (this.submitted && this.position['manager']?.errors) {
    }
    if (this.submitted && this.position['id_sales_rep']?.errors) {
    }
    if (this.submitted && this.position['user_id']?.errors) {
    }
    if (this.submitted && this.position['id_language']?.errors) {
    }
    if (this.submitted && this.position['bill_amount']?.errors) {
    }
    if (this.submitted && this.position['credit_score']?.errors) {
    }
    if (this.submitted && this.position['bankrupcy']?.errors) {
    }
    if (this.submitted && this.position['id_energy_provider']?.errors) {
    }
    if (this.submitted && this.position['anual_usage']?.errors) {
    }
    if (this.submitted && this.position['id_roof']?.errors) {
    }
    if (this.submitted && this.position['roof_age']?.errors) {
    }
    if (this.submitted && this.position['replace_roof']?.errors) {
    }
    if (this.submitted && this.position['meter_location']?.errors) {
    }
    if (this.submitted && this.position['meter_number']?.errors) {
    }
    if (this.submitted && this.position['account_number']?.errors) {
    }
    if (this.submitted && this.position['appointment_type']?.errors) {
    }
    if (this.submitted && this.position['appointment_datetime']?.errors) {
    }
    if (this.submitted && this.position['id_timezone']?.errors) {
    }
    if (this.submitted && this.position['status']?.errors) {
    }
    if (this.submitted && this.position['attendance_confirmed']?.errors) {
    }
    if (
      this.submitted &&
      this.position['attendance_confirmed_date_time']?.errors
    ) {
    }
    if (this.submitted && this.position['design_lead']?.errors) {
    }
    if (this.submitted && this.position['design_notes']?.errors) {
    }
    if (this.submitted && this.position['aproved_by']?.errors) {
    }
    if (this.submitted && this.position['doc_pending']?.errors) {
    }
    if (this.submitted && this.position['client_think']?.errors) {
    }
    if (this.submitted && this.position['appt_outcome_id']?.errors) {
    }
    if (this.submitted && this.position['disqualification_id']?.errors) {
    }
    if (this.submitted && this.position['crc_date']?.errors) {
    }
    if (this.submitted && this.position['financier']?.errors) {
    }
    if (this.submitted && this.position['financier']?.errors) {
    }
    if (this.submitted && this.position['modify_by']?.errors) {
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
