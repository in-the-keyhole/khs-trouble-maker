import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventlogComponent } from './eventlog.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
      EventlogComponent
  ],
  declarations: [
      EventlogComponent
  ]
})

export class EventlogModule { }