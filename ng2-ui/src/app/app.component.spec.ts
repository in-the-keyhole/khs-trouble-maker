/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EurekaServiceComponent } from './eurekaservice.component';
import { EventlogComponent } from './eventlog.component';
import { SettingsComponent } from './settings.component';
import { TroublemakerService } from './troublemaker.service';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        EurekaServiceComponent,
        EventlogComponent,
        SettingsComponent
      ],
      imports: [
        HttpModule
      ],
      providers: [TroublemakerService]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

//  it(`should have as title 'app works!'`, async(() => {
//    const fixture = TestBed.createComponent(AppComponent);
//    const app = fixture.debugElement.componentInstance;
//    expect(app.title).toEqual('app works!');
//  }));
//
//  it('should render title in a h1 tag', async(() => {
//    const fixture = TestBed.createComponent(AppComponent);
//    fixture.detectChanges();
//    const compiled = fixture.debugElement.nativeElement;
//    expect(compiled.querySelector('h1').textContent).toContain('app works!');
//  }));
});
