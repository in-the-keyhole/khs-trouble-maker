import { Component, Input, OnInit } from '@angular/core';

import {TroublemakerService} from './troublemaker.service';
import {Event} from './event.model';

@Component({
  selector: 'app-eventlog',
  templateUrl: './eventlog.component.html',
  styleUrls: ['./eventlog.component.css']
})

export class EventlogComponent implements OnInit {
  // **********************************************************************
  private eventLog: Event[];

   @Input() showSettings: boolean = false;
  // **********************************************************************


  // **********************************************************************
  constructor(private troublemakerService: TroublemakerService) { 
  }

  ngOnInit() {
    // LOAD EVENT LOG INITIALLY
    this.loadEventLog();

    // LISTEN FOR EVENT TO RELOAD EVENT LOG FROM SERVICE
    this.troublemakerService.reloadEventLog.subscribe(boolValue => { 
      console.log('RELOAD OF EVENT LOG Triggered'); 
      this.loadEventLog();
    });
  }
  // **********************************************************************


  // **********************************************************************
  loadEventLog() {
    console.log('LOAD EVENT LOG');
    this.troublemakerService.getEvents().subscribe(events => {
      this.eventLog = events;
      console.log('EVENTS');
      console.dir(this.eventLog);
    });
  }
  // **********************************************************************

}
