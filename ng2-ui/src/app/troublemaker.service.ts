//import { EventEmitter } from 'events';
import { Injectable, Output, EventEmitter } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

import {Event} from './event.model';

@Injectable()
export class TroublemakerService {
    @Output() reloadEventLog: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: Http) { 

  }


  accessToken(): Observable<string> {
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

  killEurekaService(eurekaService): Observable<boolean> {
      this.reloadEventLog.emit(true);

      return this.http.get('/api/kill/' + eurekaService)
          .map(response => response.json() as boolean);

  }
  loadEurekaService(eurekaService): Observable<boolean> {
      return this.http.get('/api/load/' + eurekaService)
          .map(response => response.json() as boolean);
  }
  exceptionEurekaService(eurekaService): Observable<boolean> {
      return this.http.get('/api/exception/' + eurekaService)
          .map(response => response.json() as boolean);
  }
  memoryEurekaService(eurekaService): Observable<boolean> {
      return this.http.get('/api/memory/' + eurekaService)
          .map(response => response.json() as boolean);
  }


}
