import {Component, OnInit, OnDestroy} from "@angular/core";
import {AppService} from "../app.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import {Subscription} from "rxjs/Subscription";

import {EurekaApplication, EurekaService} from './eurekaservice.model';

@Component({
    selector: 'app-eurekaservice',
    templateUrl: './eurekaservice.component.html',
    styleUrls: ['./eurekaservice.component.css']
})

export class EurekaServiceComponent implements OnInit, OnDestroy {

    //private eurekaServices: string[];
    private eurekaApplications: EurekaApplication[];
    //private eurekaServices: EurekaService[];

    private currentEurekaService: string;
    private showSettings: boolean = false;
    private serviceSocket: WebSocket;
    private serviceSubscription: Subscription;

    constructor(private appService: AppService) {
//        appService.applications.subscribe(msg => {			
//            console.log("Response from websocket: ");
//            console.dir(msg);
//            this.eurekaApplications = msg;
//		});
    }

    ngOnInit() {
        this.serviceSocket = new WebSocket('ws://' + window.location.hostname + ':3000/ws/services');
        this.serviceSubscription = Observable.fromEvent(this.serviceSocket, 'message').subscribe(services => {
            //console.log(services);
            //console.dir(services['data']);
            //console.dir(JSON.parse(services['data']));
            let tmpData = JSON.parse(services['data']);
            this.eurekaApplications = tmpData.applications;
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

//    changeService(eurekaServiceValue): void {
//        console.log('CHANGE SERVICE: ' + eurekaServiceValue);
//        this.currentEurekaService = eurekaServiceValue;
//    }

    kill(instanceId): void {
        if (instanceId) {
            //console.log('KILL THIS SERVICE: ' + this.currentEurekaService);
            if (confirm('Kill Service: ' + instanceId)) {
                this.appService.killEurekaService(instanceId).subscribe(returnValue => {

                    //this.appService.triggerEventLogReload();

                    if (!returnValue) {
                        alert('A problem occurred while trying to kill this service');
                    }
                });
            }
        }
    }
//    kill(): void {
//        if (this.currentEurekaService) {
//            //console.log('KILL THIS SERVICE: ' + this.currentEurekaService);
//            if (confirm('Kill Service: ' + this.currentEurekaService)) {
//                this.appService.killEurekaService(this.currentEurekaService).subscribe(returnValue => {
//
//                    this.appService.triggerEventLogReload();
//
//                    if (!returnValue) {
//                        alert('A problem occurred while trying to kill this service');
//                    }
//                });
//            }
//        }
//    }

    load(instanceId): void {
        if (instanceId) {
            //console.log('LOAD THIS SERVICE: ' + instanceId);
            if (confirm('Apply Load Service: ' + instanceId)) {
                this.appService.loadEurekaService(instanceId).subscribe(returnValue => {

                    //this.appService.triggerEventLogReload();

                    if (!returnValue) {
                        alert('A problem occurred while trying to apply load to this service');
                    }
                });
            }
        }
    }
//    load(): void {
//        if (this.currentEurekaService) {
//            //console.log('LOAD THIS SERVICE: ' + this.currentEurekaService);
//            if (confirm('Apply Load Service: ' + this.currentEurekaService)) {
//                this.appService.loadEurekaService(this.currentEurekaService).subscribe(returnValue => {
//
//                    this.appService.triggerEventLogReload();
//
//                    if (!returnValue) {
//                        alert('A problem occurred while trying to apply load to this service');
//                    }
//                });
//            }
//        }
//    }

    exception(instanceId): void {
        if (instanceId) {
            //console.log('EXCEPTION THIS SERVICE: ' + instanceId);
            if (confirm('Invoke Exception on: ' + instanceId)) {
                this.appService.exceptionEurekaService(instanceId).subscribe(returnValue => {

                    //this.appService.triggerEventLogReload();

                    if (!returnValue) {
                        alert('A problem occurred while trying to invoke exception on this service');
                    }
                });
            }
        }
    }
//    exception(): void {
//        if (this.currentEurekaService) {
//            //console.log('EXCEPTION THIS SERVICE: ' + this.currentEurekaService);
//            if (confirm('Invoke Exception on: ' + this.currentEurekaService)) {
//                this.appService.exceptionEurekaService(this.currentEurekaService).subscribe(returnValue => {
//
//                    this.appService.triggerEventLogReload();
//
//                    if (!returnValue) {
//                        alert('A problem occurred while trying to invoke exception on this service');
//                    }
//                });
//            }
//        }
//    }

    memory(instanceId): void {
        if (instanceId) {
            //console.log('MEMORY THIS SERVICE: ' + instanceId);
            if (confirm('Grow Memory on: ' + instanceId)) {
                this.appService.memoryEurekaService(instanceId).subscribe(returnValue => {

                    //this.appService.triggerEventLogReload();

                    if (!returnValue) {
                        alert('A problem occurred while trying to grow memory on this service');
                    }
                });
            }
        }
    }
//    memory(): void {
//        if (this.currentEurekaService) {
//            //console.log('MEMORY THIS SERVICE: ' + this.currentEurekaService);
//            if (confirm('Grow Memory on: ' + this.currentEurekaService)) {
//                this.appService.memoryEurekaService(this.currentEurekaService).subscribe(returnValue => {
//
//                    this.appService.triggerEventLogReload();
//
//                    if (!returnValue) {
//                        alert('A problem occurred while trying to grow memory on this service');
//                    }
//                });
//            }
//        }
//    }


}
