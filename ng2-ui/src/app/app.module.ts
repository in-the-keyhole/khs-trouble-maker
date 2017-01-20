import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EurekaServiceComponent } from './eurekaservice.component';
import { EventlogComponent } from './eventlog.component';
import { TroublemakerService } from './troublemaker.service';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [
    AppComponent,
    EurekaServiceComponent,
    EventlogComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TroublemakerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
