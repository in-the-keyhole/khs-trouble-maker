import { Component, OnInit } from '@angular/core';

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
  // **********************************************************************


  // **********************************************************************
  constructor(private troublemakerService: TroublemakerService) { 

    this.troublemakerService.reloadEventLog.subscribe(boolValue => { console.log('##### Triggered'); });
  }

  ngOnInit() {
    this.loadEventLog();
    //this.troublemakerService.getEvents().subscribe(events => {
    //  this.eventLog = events;
    //  console.log('EVENTS');
    //  console.dir(this.eventLog);
    //})
  }
  // **********************************************************************


  loadEventLog() {
    //console.log('RELOAD EVENT LOG: ' + boolValue);
    this.troublemakerService.getEvents().subscribe(events => {
      this.eventLog = events;
      console.log('EVENTS');
      console.dir(this.eventLog);
    });
  }

}
