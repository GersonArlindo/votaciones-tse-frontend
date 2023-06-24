import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/angular';
import { Draggable } from '@fullcalendar/interaction'; // for dateClick
import { createEventId } from './event-utils';
import { AssignAppmtService } from '@app/core/services/assign-appmt.service';
import { Router } from '@angular/router';
import { LeadsService } from '@app/core/services/leads.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('externalEvents', {static: true}) externalEvents!: ElementRef;
  public calendarEvent: any[] = [];
  currentEvents: EventApi[] = [];
  initialLoad: boolean = true;
  initialEvent: boolean = true;
  calendarOptions!: CalendarOptions;

  constructor(
    private LeadsSrv: LeadsService,
    private router: Router,
    private AssignAppmtSrv: AssignAppmtService
  ) { }

  ngOnInit(): void {
    this.getCalenderData();

    // For external-events dragging
    new Draggable(this.externalEvents.nativeElement, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText,
          backgroundColor: eventEl.getAttribute('bgColor'),
          borderColor: eventEl.getAttribute('bdColor')
        };
      }
    });
  }
  public getCalenderData(){
    const self = this;
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,today,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,

      events: (_fetchInfo:any, successCallback:any, _failureCallback:any) => {
        
        this.AssignAppmtSrv.getAssign_appmt()
        .subscribe((next: any) => {
          if (next && this.initialEvent == true){
            this.initialEvent = false;
            for(let assign of next){
              this.calendarEvent.push({
                id: `${assign.lead_id}`,
                start: `${assign.appointment_datetime.slice(0, -5)}`,
                end: `${assign.appointment_datetime.slice(0, -5)}`,
                title: `${assign.tbl_sales_rep.tbl_user.first_name} ${assign.tbl_sales_rep.tbl_user.last_name}`,
                description: `${assign.design_notes}`,
                backgroundColor: `${assign.tbl_sales_rep.color_appt}`,
                borderColor: '#0168fa',
                display: 'block'
              })
              console.log(assign.tbl_sales_rep.color_appt);
            }
            successCallback(this.calendarEvent);
          }        
        },
        (error: any) => {
        })
      },
      eventClick(evetData:any) {
        const event_id = evetData.event.id;
        if(event_id){
          console.log(event_id);
          self.AssignAppmtSrv.getAssign_appmt() 
           .subscribe((next: any)=>{
            for(let assign of next){
              if(assign.lead_id == event_id){
                self.router.navigate(['/assign-appmt/edit',  event_id, assign.appointment_id])
              }
            }
           })
        }
      }
    };
  }
  
  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: 'rgba(0,204,204,.25)',
        borderColor: '#00cccc'
        
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
}
