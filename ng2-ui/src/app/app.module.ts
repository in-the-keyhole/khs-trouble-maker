import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EurekaServiceModule } from './eurekaservice/eurekaservice.module';
import { EventlogModule } from './eventlog/eventlog.module';
import { AppService } from './app.service';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EventlogModule,
    SettingsModule,
    EurekaServiceModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
