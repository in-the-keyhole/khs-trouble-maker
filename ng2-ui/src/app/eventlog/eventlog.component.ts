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

    // LOAD ALL EVENTS INITIALLY
    this.appService.getEvents().subscribe(events => {
      console.log('LOAD EVENT LOG');
      console.dir(events);

      // APPEND TO EVENTLOG
      this.eventLog = events;

      // SETUP WEBSOCKET TO LISTEN FOR NEW EVENTS
      this.webSocket = new WebSocket('ws://' + window.location.hostname + ':9110/ws/events');

      this.webSocket.onopen = function(){
        console.log('* Events Connection open!');
      }

      this.subscription = Observable.fromEvent(this.webSocket, 'message').subscribe(events => {
        console.log('WEBSOCKET LOAD EVENT LOG');
        //console.dir(events);
        let jsonData = JSON.parse(events['data']);
        console.dir(jsonData['events']);

        // REPLACE EVENTS WITH DATA FROM WEBSOCKET
        this.eventLog = jsonData['events'];

        // PUSH NEW EVENTS INTO EVENTLOG FROM WEBSOCKET
        //this.eventLog.push.apply(this.eventLog, jsonData['events']);
      });


    });


//    this.webSocket = new WebSocket('ws://' + window.location.hostname + ':9110/ws/events');
//    this.subscription = Observable.fromEvent(this.webSocket, 'message').subscribe(events => {
//      console.log('WEBSOCKET LOAD EVENT LOG');
//      console.dir(events);
//      let tmpData = JSON.parse(events['data']);
//
//      this.eventLog = tmpData;
//    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


//  loadEventLog() {
//    this.appService.getEvents().subscribe(events => {
//      console.log('LOAD EVENT LOG');
//      console.dir(events);
//      this.eventLog = events;
//    });
//  }

}
