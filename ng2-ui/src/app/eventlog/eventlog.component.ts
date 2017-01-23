import { Component, Input, OnInit } from '@angular/core';

import {AppService} from '../app.service';
import {Event} from './event.model';

@Component({
  selector: 'app-eventlog',
  templateUrl: './eventlog.component.html',
  styleUrls: ['./eventlog.component.css']
})

export class EventlogComponent implements OnInit {
  private eventLog: Event[];
  @Input() showSettings: boolean = false;



  constructor(private appService: AppService) { 
  }

  ngOnInit() {
    // LOAD EVENT LOG INITIALLY
    this.loadEventLog();

    // LISTEN FOR EVENT TO RELOAD EVENT LOG FROM SERVICE
    this.appService.reloadEventLog.subscribe(boolValue => { 
      this.loadEventLog();
    });
  }


  loadEventLog() {
    this.appService.getEvents().subscribe(events => {
      this.eventLog = events;
    });
  }

}
