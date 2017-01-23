/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';

import { EurekaServiceComponent } from './eurekaservice.component';

//import { EventlogComponent } from '../eventlog/eventlog.component';
//import { SettingsComponent } from '../settings/settings.component';
import { EventlogModule } from '../eventlog/eventlog.module';
import { SettingsModule } from '../settings/settings.module';

import { AppService } from '../app.service';

describe('ServicesComponent', () => {
  let component: EurekaServiceComponent;
  let fixture: ComponentFixture<EurekaServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        EurekaServiceComponent,
//        EventlogComponent,
//        SettingsComponent
      ],
      imports: [
        HttpModule,
        EventlogModule,
        SettingsModule
      ],
      providers: [
        AppService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EurekaServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
