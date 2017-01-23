import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
      SettingsComponent
  ],
  declarations: [
      SettingsComponent
  ]
})

export class SettingsModule { }