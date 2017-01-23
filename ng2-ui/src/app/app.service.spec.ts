/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppService } from './app.service';

import {MockBackend, MockConnection} from '@angular/http/testing';

import {HttpModule, Http, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';


describe('TroublemakerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        AppService,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    });
  });

  it('should be able to be injected',
    inject([AppService], (service: AppService) => {
      expect(service instanceof AppService).toBe(true);
  }));

  it('should be able to be instantiated with "new"', inject([Http], (http: Http) => {
        expect(http).not.toBeNull('http should be provided');
        let service = new AppService(http);
        expect(service instanceof AppService).toBe(true, '"new" service should be of type AppService');
  }));

  it('should be able to inject MockBackend',
        inject([XHRBackend], (backend: MockBackend) => {
            expect(backend).not.toBeNull('backend should be provided');
  }));

  // *******************************************************************
  describe('Get Access Token', () => {
    let backend: MockBackend;
    let response: Response;    
    let service: AppService;
    let fakeToken: string;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
        backend = be;
        service = new AppService(http);
        fakeToken = 'Random Access Token';
        // SETUP MOCK RESPONSE
        let options = new ResponseOptions({status: 200, body: fakeToken});
        response = new Response(options);
    }));

    // TEST FOR VALUE
    it(': should return Access Token', async(inject([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        service.getAccessToken()
          .do(resp => {
            //console.dir(resp);
            expect(resp).toBe(fakeToken, `expected access token to be "${fakeToken}"`);
          }).toPromise();
    })));

    // TEST FOR NOT VALUE
    it(': should return Access Token', async(inject([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        service.getAccessToken()
          .do(resp => {
            expect(resp).not.toBe(fakeToken + '2', `expected access token to be "${fakeToken}"`);
          }).toPromise();
    })));

  });
  // *******************************************************************




});
