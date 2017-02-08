//import { EventEmitter } from 'events';
import { Injectable, Output, EventEmitter } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable, Subject} from 'rxjs';
import 'rxjs/add/operator/map';

import {Event} from './eventlog/event.model';
//import { WebsocketService } from './websocket.service';
import {EurekaService} from './eurekaservice/eurekaservice.model';
//
//const CHAT_URL = 'ws://' + window.location.hostname + ':3000/ws/';
//
//export interface Message {
//	author: string,
//	message: string
//}

@Injectable()
export class AppService {
    // THESE ARE OUTPUTS THAT WILL BE LISTENED FOR 
//    @Output() reloadEventLog: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() displaySettings: EventEmitter<boolean> = new EventEmitter<boolean>();


//    public messages: Subject<string>;
//    public applications: Observable<EurekaApplication[]>;


    constructor(private http: Http) { 

//        this.applications = <Observable<EurekaApplication[]>>wsService
//			.connect(CHAT_URL + 'services')
//			.map((response: MessageEvent): EurekaApplication[] => {
//				let data = JSON.parse(response.data);
//                console.log('MESSAGES: DATA');
//                console.dir(data);
//
//
//                return data;
//				//return {
//				//	author: data.author,
//				//	message: data.message
//				//}
//			});

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


    killEurekaService(eurekaInstance): Observable<boolean> {
        let url = '/api/kill/' + eurekaInstance.app + '/' + eurekaInstance.instanceId;
        console.log('KILL URL: ' + url);

        let returnValue = this.http.get(url)
          .map(response => response.json() as boolean);

        return returnValue;
    }
//    killEurekaService(eurekaService): Observable<boolean> {
//        let returnValue = this.http.get('/api/kill/' + eurekaService)
//          .map(response => response.json() as boolean);
//        return returnValue;
//    }

    loadEurekaService(eurekaInstance): Observable<boolean> {
        let url = '/api/load/' + eurekaInstance.app + '/' + eurekaInstance.instanceId;
        console.log('LOAD URL: ' + url);

        let returnValue = this.http.get(url)
          .map(response => response.json() as boolean);

        return returnValue;
    }
//    loadEurekaService(eurekaService): Observable<boolean> {
//        let returnValue = this.http.get('/api/load/' + eurekaService)
//          .map(response => response.json() as boolean);
//        return returnValue;
//    }

    exceptionEurekaService(eurekaInstance): Observable<boolean> {
        let url = '/api/exception/' + eurekaInstance.app + '/' + eurekaInstance.instanceId;
        console.log('EXCEPTION URL: ' + url);

        let returnValue = this.http.get(url)
          .map(response => response.json() as boolean);

        return returnValue;
    }
//    exceptionEurekaService(eurekaService): Observable<boolean> {
//        let returnValue = this.http.get('/api/exception/' + eurekaService)
//          .map(response => response.json() as boolean);
//        return returnValue;
//    }

    memoryEurekaService(eurekaInstance): Observable<boolean> {
        let url = '/api/memory/' + eurekaInstance.app + '/' + eurekaInstance.instanceId;
        console.log('MEMORY URL: ' + url);

        let returnValue = this.http.get(url)
          .map(response => response.json() as boolean);
          
        return returnValue;
    }
//    memoryEurekaService(eurekaService): Observable<boolean> {
//        let returnValue = this.http.get('/api/memory/' + eurekaService)
//          .map(response => response.json() as boolean);
//        return returnValue;
//    }

}
