import {Component, OnInit, OnDestroy} from "@angular/core";
import {AppService} from "../app.service";
import {Event} from "./event.model";
import "rxjs/add/observable/fromEvent";

@Component({
    selector: 'app-eventlog',
    templateUrl: './eventlog.component.html',
    styleUrls: ['./eventlog.component.css']
})

export class EventlogComponent implements OnInit, OnDestroy {
    private eventLog: Event[];
    private webSocket: WebSocket;

    constructor(private appService: AppService) {
    }

    ngOnInit() {
        // LOAD ALL EVENTS INITIALLY
        this.appService.getEvents().subscribe(events => {

            // SET EVENTLOG
            this.eventLog = events;

            // SETUP WEBSOCKET TO LISTEN FOR NEW EVENTS
            this.webSocket = new WebSocket('ws://' + window.location.hostname + ':9110/ws/events');

            // SET UP WEBSOCKET TO HANDLE MESSAGE FROM SERVER
            let self = this;
            this.webSocket.onmessage = function (message) {

                let jsonData = JSON.parse(message['data']);

                if (jsonData !== null) {
                    // PUSH NEW EVENT ON THE END OF THE EVENT LOG
                    //self.eventLog.push.apply(self.eventLog, tmp);
                    self.eventLog.push(jsonData);
                }
            };
        });
    }

    ngOnDestroy(): void {
    }


    refreshData(): void {
        this.appService.getEvents().subscribe(events => {
            this.eventLog = events;
        });
    }
}
