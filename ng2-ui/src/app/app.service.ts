//import { EventEmitter } from 'events';
import { Injectable, Output, EventEmitter } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable, Subject} from 'rxjs';
import 'rxjs/add/operator/map';

import {Event} from './eventlog/event.model';
import {EurekaService} from './eurekaservice/eurekaservice.model';

@Injectable()
export class AppService {
    // THESE ARE OUTPUTS THAT WILL BE LISTENED FOR 
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

    getEurekaServices(): Observable<EurekaService[]> {
        return this.http.get('/api/services')
          .map(response => response.json() as EurekaService[]);
    }

    getEvents(): Observable<Event[]> {
        return this.http.get('/api/events')
          .map(response => response.json() as Event[]);
    }

//    triggerEventLogReload(): void {
//        this.reloadEventLog.emit(true);
//    }

    generateApiUrl(action, eurekaInstance): string {
        let tmpUrl = '/api/' + action + '/' + eurekaInstance.app + '/' + eurekaInstance.instanceId;
        console.log(action.toUpperCase() + ' URL: ' + tmpUrl);
        return tmpUrl;
    }

    killEurekaService(eurekaInstance): Observable<boolean> {
        let url = this.generateApiUrl('kill', eurekaInstance);

        let returnValue = this.http.get(url)
          .map(response => response.json() as boolean);

        return returnValue;
    }

    loadEurekaService(eurekaInstance): Observable<boolean> {
        let url = this.generateApiUrl('load', eurekaInstance);

        let returnValue = this.http.get(url)
          .map(response => response.json() as boolean);

        return returnValue;
    }

    exceptionEurekaService(eurekaInstance): Observable<boolean> {
        let url = this.generateApiUrl('exception', eurekaInstance);

        let returnValue = this.http.get(url)
          .map(response => response.json() as boolean);

        return returnValue;
    }

    memoryEurekaService(eurekaInstance): Observable<boolean> {
        let url = this.generateApiUrl('memory', eurekaInstance);

        let returnValue = this.http.get(url)
          .map(response => response.json() as boolean);
          
        return returnValue;
    }

}
