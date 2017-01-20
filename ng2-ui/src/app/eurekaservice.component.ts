import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import {TroublemakerService} from './troublemaker.service';
//import { EventlogComponent } from './eventlog.component';


@Component({
  selector: 'app-eurekaservice',
  templateUrl: './eurekaservice.component.html',
  styleUrls: ['./eurekaservice.component.css']
})
export class EurekaServiceComponent implements OnInit {
  // **********************************************************************
  private eurekaServices: string[];
  private currentEurekaService: string;

//  @Output() reloadEventLog: EventEmitter<boolean> = new EventEmitter<boolean>();
  // **********************************************************************



  // **********************************************************************
  constructor(private troublemakerService: TroublemakerService) { 
  }

  ngOnInit() {
    this.troublemakerService.getEurekaServices().subscribe(eurekaServices => {
      this.eurekaServices = eurekaServices;
      console.log('EUREKA SERVICES');
      console.dir(this.eurekaServices);
    })
  }
  // **********************************************************************



  // **********************************************************************
  changeService(eurekaServiceValue): void {
    console.log('CHANGE SERVICE');
    this.currentEurekaService = eurekaServiceValue;
    console.dir(this.currentEurekaService);
  }


  kill(): void {
    if(this.currentEurekaService) {
      console.log('KILL THIS SERVICE: ' + this.currentEurekaService);

      if (confirm('Kill Service: ' + this.currentEurekaService))  {
        this.troublemakerService.killEurekaService(this.currentEurekaService).subscribe(returnValue => {
          console.log('KILL EUREKA SERVICE: ' + returnValue);
        });


        // RELOAD EVENT LOG
        //this.eventlogComponent.reloadEventLog();
        //this.reloadEventLog.emit(true)
		 }
    }
  }

  load(): void {
    if(this.currentEurekaService) {
      console.log('LOAD THIS SERVICE: ' + this.currentEurekaService);

      if (confirm('Apply Load Service: ' + this.currentEurekaService))  {
        this.troublemakerService.loadEurekaService(this.currentEurekaService).subscribe(returnValue => {
          console.log('LOAD EUREKA SERVICE: ' + returnValue);
        });

        // RELOAD EVENT LOG
        //this.reloadEventLog.emit(true)
		 }
    }
  }

  exception(): void {
    if(this.currentEurekaService) {
      console.log('EXCEPTION THIS SERVICE: ' + this.currentEurekaService);

      if (confirm('Invoke Exception on: ' + this.currentEurekaService))  {
        this.troublemakerService.exceptionEurekaService(this.currentEurekaService).subscribe(returnValue => {
          console.log('EXCEPTION EUREKA SERVICE: ' + returnValue);
        });

        // RELOAD EVENT LOG
		 }
    }
  }

  memory(): void {
    if(this.currentEurekaService) {
      console.log('MEMORY THIS SERVICE: ' + this.currentEurekaService);

      if (confirm('Grow Memory on: ' + this.currentEurekaService))  {
        this.troublemakerService.memoryEurekaService(this.currentEurekaService).subscribe(returnValue => {
          console.log('MEMORY EUREKA SERVICE: ' + returnValue);
        });

        // RELOAD EVENT LOG
		 }
    }
  }
  // **********************************************************************


}
