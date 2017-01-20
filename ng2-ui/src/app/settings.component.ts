import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { TroublemakerService } from './troublemaker.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  private accessToken: string;

  // **********************************************************************
  constructor(private troublemakerService: TroublemakerService) { 
  }

  ngOnInit() {
    //console.log('LOAD EVENT LOG');
    this.troublemakerService.getAccessToken().subscribe(accessToken => {
      this.accessToken = accessToken;
      //console.log('ACCESS TOKEN');
      //console.dir(this.accessToken);
    });  
  }
  // **********************************************************************


  // **********************************************************************
  close(): void {
    //console.log('CLOSE SETTINGS');
    //this.closeSettings.emit(true);
    this.troublemakerService.toggleSettings(false);
  }
  // **********************************************************************

}
