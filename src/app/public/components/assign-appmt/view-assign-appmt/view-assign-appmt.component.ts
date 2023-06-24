import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignAppmtService } from '@app/core/services/assign-appmt.service';
import { LeadsService } from '@app/core/services/leads.service';


@Component({
  selector: 'app-view-assign-appmt',
  templateUrl: './view-assign-appmt.component.html',
  styleUrls: ['./view-assign-appmt.component.scss']
})
export class ViewAssignAppmtComponent implements OnInit {
  id: string = '';
  lead: any;
  LeadsService: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    LeadsService: LeadsService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = id;
      this.LeadsService.getLeadsById(this.id).subscribe((data: any) => {
        this.lead = data;
      });
    }
  }
  
}