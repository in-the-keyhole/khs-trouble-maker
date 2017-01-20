import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import {TroublemakerService} from './troublemaker.service';
//import { SettingsComponent } from './settings.component';


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

  private showSettings: boolean = false;
  // **********************************************************************



  // **********************************************************************
  constructor(private troublemakerService: TroublemakerService) { 
  }

  ngOnInit() {
    // GET SERVICES
    this.troublemakerService.getEurekaServices().subscribe(eurekaServices => {
      this.eurekaServices = eurekaServices;
      //console.log('EUREKA SERVICES');
      //console.dir(this.eurekaServices);
    });

    // LISTEN FOR CHANGE IN DISPLAYSETTINGS 
    this.troublemakerService.displaySettings.subscribe(boolValue => { 
      //console.log('DISPLAY SETTINGS Triggered: ' + boolValue); 
      this.showSettings = boolValue;
    });
  }
  // **********************************************************************



  // **********************************************************************
  showSettingsInfo(): void {
    this.troublemakerService.toggleSettings(true);
  }

  changeService(eurekaServiceValue): void {
    //console.log('CHANGE SERVICE');
    this.currentEurekaService = eurekaServiceValue;
    //console.dir(this.currentEurekaService);
  }


  kill(): void {
    if(this.currentEurekaService) {
      //console.log('KILL THIS SERVICE: ' + this.currentEurekaService);

      if (confirm('Kill Service: ' + this.currentEurekaService))  {
        this.troublemakerService.killEurekaService(this.currentEurekaService).subscribe(returnValue => {
          //console.log('KILL EUREKA SERVICE: ' + returnValue);
          if(!returnValue) {
            alert('A problem occurred while trying to kill this service');
          }
        });
		 }
    }
  }

  load(): void {
    if(this.currentEurekaService) {
      //console.log('LOAD THIS SERVICE: ' + this.currentEurekaService);

      if (confirm('Apply Load Service: ' + this.currentEurekaService))  {
        this.troublemakerService.loadEurekaService(this.currentEurekaService).subscribe(returnValue => {
          //console.log('LOAD EUREKA SERVICE: ' + returnValue);
          if(!returnValue) {
            alert('A problem occurred while trying to apply load to this service');
          }
        });
		 }
    }
  }

  exception(): void {
    if(this.currentEurekaService) {
      //console.log('EXCEPTION THIS SERVICE: ' + this.currentEurekaService);

      if (confirm('Invoke Exception on: ' + this.currentEurekaService))  {
        this.troublemakerService.exceptionEurekaService(this.currentEurekaService).subscribe(returnValue => {
          //console.log('EXCEPTION EUREKA SERVICE: ' + returnValue);
          if(!returnValue) {
            alert('A problem occurred while trying to invoke exception on this service');
          }
        });
		 }
    }
  }

  memory(): void {
    if(this.currentEurekaService) {
      //console.log('MEMORY THIS SERVICE: ' + this.currentEurekaService);

      if (confirm('Grow Memory on: ' + this.currentEurekaService))  {
        this.troublemakerService.memoryEurekaService(this.currentEurekaService).subscribe(returnValue => {
          //console.log('MEMORY EUREKA SERVICE: ' + returnValue);
          if(!returnValue) {
            alert('A problem occurred while trying to grow memory on this service');
          }
        });
		 }
    }
  }
  // **********************************************************************


}
