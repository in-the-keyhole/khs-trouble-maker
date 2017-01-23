import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import {AppService} from '../app.service';


@Component({
  selector: 'app-eurekaservice',
  templateUrl: './eurekaservice.component.html',
  styleUrls: ['./eurekaservice.component.css']
})

export class EurekaServiceComponent implements OnInit {
  private eurekaServices: string[];
  private currentEurekaService: string;
  private showSettings: boolean = false;




  constructor(private appService: AppService) { 
  }

  ngOnInit() {
    // GET SERVICES
    this.appService.getEurekaServices().subscribe(eurekaServices => {
      this.eurekaServices = eurekaServices;
    });

    // LISTEN FOR CHANGE IN DISPLAYSETTINGS 
    this.appService.displaySettings.subscribe(boolValue => { 
      this.showSettings = boolValue;
    });
  }




  showSettingsInfo(): void {
    this.appService.toggleSettings(true);
  }

  changeService(eurekaServiceValue): void {
    this.currentEurekaService = eurekaServiceValue;
  }

  kill(): void {
    if(this.currentEurekaService) {
      //console.log('KILL THIS SERVICE: ' + this.currentEurekaService);
      if (confirm('Kill Service: ' + this.currentEurekaService))  {
        this.appService.killEurekaService(this.currentEurekaService).subscribe(returnValue => {

          this.appService.triggerEventLogReload();

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
        this.appService.loadEurekaService(this.currentEurekaService).subscribe(returnValue => {

          this.appService.triggerEventLogReload();

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
        this.appService.exceptionEurekaService(this.currentEurekaService).subscribe(returnValue => {

          this.appService.triggerEventLogReload();

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
        this.appService.memoryEurekaService(this.currentEurekaService).subscribe(returnValue => {

          this.appService.triggerEventLogReload();

          if(!returnValue) {
            alert('A problem occurred while trying to grow memory on this service');
          }
        });
		 }
    }
  }


}
