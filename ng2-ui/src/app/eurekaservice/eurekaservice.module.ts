import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EurekaServiceComponent } from './eurekaservice.component';
import { EventlogModule } from '../eventlog/eventlog.module';
import { SettingsModule } from '../settings/settings.module';

@NgModule({
  imports: [
    CommonModule,
    EventlogModule,
    SettingsModule
  ],
  exports: [
      EurekaServiceComponent
  ],
  declarations: [
      EurekaServiceComponent
  ]
})

export class EurekaServiceModule { }