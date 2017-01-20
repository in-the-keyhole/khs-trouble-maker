/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';

import { EurekaServiceComponent } from './eurekaservice.component';
import { EventlogComponent } from './eventlog.component';
import { SettingsComponent } from './settings.component';
import { TroublemakerService } from './troublemaker.service';

describe('ServicesComponent', () => {
  let component: EurekaServiceComponent;
  let fixture: ComponentFixture<EurekaServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        EurekaServiceComponent,
        EventlogComponent,
        SettingsComponent
      ],
      imports: [
        HttpModule
      ],
      providers: [
        TroublemakerService
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
