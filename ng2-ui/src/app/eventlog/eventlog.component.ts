import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {AppService} from '../app.service';
import {Event} from './event.model';

import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-eventlog',
  templateUrl: './eventlog.component.html',
  styleUrls: ['./eventlog.component.css']
})

export class EventlogComponent implements OnInit, OnDestroy {
  private eventLog: Event[];
  @Input() showSettings: boolean = false;

  private webSocket: WebSocket;
  private subscription: Subscription;

  constructor(private appService: AppService) { 
  }

  ngOnInit() {
//    // LOAD EVENT LOG INITIALLY
//    this.loadEventLog();
//
//    // LISTEN FOR EVENT TO RELOAD EVENT LOG FROM SERVICE
//    this.appService.reloadEventLog.subscribe(boolValue => { 
//      this.loadEventLog();
//    });


    this.webSocket = new WebSocket('ws://' + window.location.hostname + ':3000/ws/events');
    this.subscription = Observable.fromEvent(this.webSocket, 'message').subscribe(events => {
      console.log(events);
      let tmpData = JSON.parse(events['data']);
      this.eventLog = tmpData;
      //this.eventLog = events;
    });

  }
  ngOnDestroy(): void {
        this.subscription.unsubscribe();
  }


//  loadEventLog() {
//    this.appService.getEvents().subscribe(events => {
//      this.eventLog = events;
//    });
//  }

}
