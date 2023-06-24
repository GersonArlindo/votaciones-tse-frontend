import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { leads } from '@app/core/models/leads.interface';
import { LeadsService } from '@app/core/services/leads.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-view-leads',
  templateUrl: './view-leads.component.html',
  styleUrls: ['./view-leads.component.scss']
})
export class ViewLeadsComponent implements OnInit {

  public leads: leads[] = [];
  @ViewChild('dt') table!: Table;
  closeResult:any = "";
  
  constructor(
    private modalService: NgbModal, 
    private LeadsSrv: LeadsService,
    private primengConfig: PrimeNGConfig,
    private router: Router
  ) { }

  ngOnInit(): void {
   this.LeadsSrv.reloadLead()
    .subscribe((next: any)=>{ })          
    
    this.getLeads();
  }
  
  public getLeads(){
    this.LeadsSrv.getLeads()
    .subscribe((data: any) => {
      this.leads = data;
    })
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.table.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  // public convertDateTime(date: any){
  //   const date_locale = new Date(`${date}`).toLocaleDateString('es', {
  //     day: 'numeric',
  //     month: 'short',
  //     year: 'numeric'
  //   });

  //   var date_timer_ = new Date(`${date}`);
  //   var hours = date_timer_.getUTCHours();
  //   var minutes = date_timer_.getUTCMinutes();
  //   var militaryTime = (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;
    
  //   const formatted = `${date_locale} ${this.to12HourTime(militaryTime)}`;
  //   return formatted
  // }

  // public to12HourTime(time: any) {
  //   var b = time.split(/\D/);
  //   return (b[0]%12 || 12) + ':' + b[1] +
  //          (b[0]<=11? ' am' : ' pm');
  // }

  public convertStatus(id: any){
    if(id == 1){
      return "Active";
    }if(id == 0){
      return "Inactive"
    }
    return 
  }

  public getClassBasedOnOutcome(outcome: any) {
    if(outcome == "Lead In" || outcome == "New Lead In"){
      return "lead-badge leadIn";
    }if(outcome == "Follow Up" ){
      return "lead-badge followUp"
    }if(outcome == "Not Interested"){
      return "lead-badge notInterested"
    }if(outcome == "Discovery Scheduled"){
      return "lead-badge demoSheduled"
    }if(outcome == "No Contact"){
      return "lead-badge  leadIn"
    }if(outcome == "Duplicated"){
      return "lead-badge duplicated"
    }if(outcome == "Wrong Number"){
      return "lead-badge wrongnumber"
    }if(outcome == "Duplicated"){
      return "lead-badge duplicated"
    }if(outcome == "Demo - Scheduled"){
      return "lead-badge demoSheduled"
    }if(/^DQ/.test(outcome)){
      return "lead-badge disqualification";
    }
    else{
      return "lead-badge noaplica"
    }
    return 
  }

  public deleteLeads(id: any){
    this.LeadsSrv.deleteLeads(id)
    .subscribe((res: any) =>{
      if(res){
        setTimeout(() =>{
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
        }, 100);      
      }
    })
  }

  deleteLeadsModal(content: any, viewProduct:any) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.deleteLeads(viewProduct);
      }  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });  
  } 
  getDismissReason(reason: any) {
    throw new Error('Method not implemented.');
  }
}