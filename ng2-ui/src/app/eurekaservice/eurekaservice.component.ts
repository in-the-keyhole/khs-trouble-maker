import {Component, OnInit, OnDestroy} from "@angular/core";
import {AppService} from "../app.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import {Subscription} from "rxjs/Subscription";

import {EurekaService, EurekaServiceInstance} from './eurekaservice.model';

@Component({
    selector: 'app-eurekaservice',
    templateUrl: './eurekaservice.component.html',
    styleUrls: ['./eurekaservice.component.css']
})

export class EurekaServiceComponent implements OnInit, OnDestroy {

    private eurekaServices: EurekaService[];
    //private eurekaServices: EurekaService[];

    private currentEurekaService: string;
    private showSettings: boolean = false;
    private serviceSocket: WebSocket;
    private serviceSubscription: Subscription;

    constructor(private appService: AppService) {
    }

    ngOnInit() {
        this.serviceSocket = new WebSocket('ws://' + window.location.hostname + ':9110/ws/services');
        this.serviceSubscription = Observable.fromEvent(this.serviceSocket, 'message').subscribe(services => {
            //console.log(services);
            console.dir(services['data']);
            //console.dir(JSON.parse(services['data']));
            let tmpData = JSON.parse(services['data']);
            this.eurekaServices = tmpData.services;
        });


        // GET SERVICES
        // this.appService.getEurekaServices().subscribe(eurekaServices => {
        //   this.eurekaServices = eurekaServices;
        // });


        // LISTEN FOR CHANGE IN DISPLAYSETTINGS
        this.appService.displaySettings.subscribe(boolValue => {
            this.showSettings = boolValue;
        });
    }

    ngOnDestroy(): void {
        this.serviceSubscription.unsubscribe();
    }

    showSettingsInfo(): void {
        this.appService.toggleSettings(!this.showSettings);
    }



    kill(eurekaInstance): void {
        if (eurekaInstance) {
            if (confirm('Kill Service: ' + eurekaInstance.app + ' / ' + eurekaInstance.instanceId)) {
                this.appService.killEurekaService(eurekaInstance).subscribe(returnValue => {
                    //this.appService.triggerEventLogReload();
                    if (!returnValue) {
                        alert('A problem occurred while trying to kill this service');
                    }
                });
            }
        }
    }

    load(eurekaInstance): void {
        if (eurekaInstance) {
            if (confirm('Apply Load Service: ' + eurekaInstance.app + ' / ' + eurekaInstance.instanceId)) {
                this.appService.loadEurekaService(eurekaInstance).subscribe(returnValue => {
                    //this.appService.triggerEventLogReload();
                    if (!returnValue) {
                        alert('A problem occurred while trying to apply load to this service');
                    }
                });
            }
        }
    }

    exception(eurekaInstance): void {
        if (eurekaInstance) {
            if (confirm('Invoke Exception on: ' + eurekaInstance.app + ' / ' + eurekaInstance.instanceId)) {
                this.appService.exceptionEurekaService(eurekaInstance).subscribe(returnValue => {
                    //this.appService.triggerEventLogReload();
                    if (!returnValue) {
                        alert('A problem occurred while trying to invoke exception on this service');
                    }
                });
            }
        }
    }

    memory(eurekaInstance): void {
        if (eurekaInstance) {
            if (confirm('Grow Memory on: ' + eurekaInstance.app + ' / ' + eurekaInstance.instanceId)) {
                this.appService.memoryEurekaService(eurekaInstance).subscribe(returnValue => {
                    //this.appService.triggerEventLogReload();
                    if (!returnValue) {
                        alert('A problem occurred while trying to grow memory on this service');
                    }
                });
            }
        }
    }


}
