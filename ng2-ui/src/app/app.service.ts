//import { EventEmitter } from 'events';
import { Injectable, Output, EventEmitter } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

import {Event} from './eventlog/event.model';

@Injectable()
export class AppService {
    // THESE ARE OUTPUTS THAT WILL BE LISTENED FOR 
    @Output() reloadEventLog: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() displaySettings: EventEmitter<boolean> = new EventEmitter<boolean>();



    constructor(private http: Http) { 

    }



    toggleSettings(val): void {
        this.displaySettings.emit(val);
    }

    getAccessToken(): Observable<string> {
        return this.http.get('/api/access/token')
          .map(response => response.text() as string);
    }

    getEurekaServices(): Observable<string[]> {
        return this.http.get('/api/services')
          .map(response => response.json() as string[]);
    }

    getEvents(): Observable<Event[]> {
        return this.http.get('/api/events')
          .map(response => response.json() as Event[]);
    }

    triggerEventLogReload(): void {
        this.reloadEventLog.emit(true);
    }

    killEurekaService(eurekaService): Observable<boolean> {
        let returnValue = this.http.get('/api/kill/' + eurekaService)
          .map(response => response.json() as boolean);

        return returnValue;
    }

    loadEurekaService(eurekaService): Observable<boolean> {
        let returnValue = this.http.get('/api/load/' + eurekaService)
          .map(response => response.json() as boolean);

        return returnValue;
    }

    exceptionEurekaService(eurekaService): Observable<boolean> {
        let returnValue = this.http.get('/api/exception/' + eurekaService)
          .map(response => response.json() as boolean);

        return returnValue;
    }

    memoryEurekaService(eurekaService): Observable<boolean> {
        let returnValue = this.http.get('/api/memory/' + eurekaService)
          .map(response => response.json() as boolean);

        return returnValue;
    }

}
