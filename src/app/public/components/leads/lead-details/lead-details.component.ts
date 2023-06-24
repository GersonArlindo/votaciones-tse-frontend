import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { leads } from '@app/core/models/leads.interface';
import { LeadsService } from '@app/core/services/leads.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit {

  public leads: leads[] = [];
  @ViewChild('dt') table!: Table;
  closeResult:any = "";
  
  lead: string = '';
  
  fullname: any;
  lead_id:any;
  first_name:any;
  last_name:any;
  phone_number:any;
  email:any;
  st_address:any;
  city:any;
  state:any;
  zip_code:any;
  full_address:any;
  source:any;
  campaign_name:any;
  ad_set_name:any;
  ad_name:any;
  ad_account_id:any;
  agent_assigned:any;
  outcome:any;
  tags:any;
  home_owner: any;
  bill_amount: any;
  notes:any;
  submitted = false;
  eventBankrupcy: any;
  selectedBankrupcy!: number;
  opcionSeleccionadaReplace!: number;


  constructor(
    private modalService: NgbModal, 
    private LeadsSrv: LeadsService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.lead = this.route.snapshot.params['lead'];

    this.LeadsSrv.getLeadsById(this.lead)
    .subscribe((next: any) => {
      this.fullname = next.first_name + ' ' + next.last_name; //
      this.campaign_name = next.campaign_name; //
      this.lead_id = next.lead_id;  //
      this.first_name = next.first_name; //
      this.last_name = next.last_name; //
      this.phone_number= next.phone_number; //
      this.email = next.email; //
      this.st_address = next.st_address; //
      this.full_address = next.st_address + ' ' + next.city + ' ' + next.state + ' ' + next.zip_code; 
      this.city = next.city; //
      this.state = next.state; 
      this.zip_code = next.zip_code; //
      //this.full_address = lead.full_address; //
      this.source = next.source; //
      this.ad_set_name = next.ad_set_name; //
      this.ad_name = next.ad_name; //
      this.ad_account_id = next.ad_account_id;  //
      this.outcome = next.outcome; //
      this.tags = next.tags;  //
      this.home_owner = next.home_owner;
      this.bill_amount = next.bill_amount;
      this.notes = next.notes; //
    })

    this.getLeads();
  }
  
  
  public getLeads(){
    this.LeadsSrv.getLeads()
    .subscribe((data: any) => {
      this.leads = data;
    })
  }
  
}