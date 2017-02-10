import {HttpModule} from "@angular/http";
/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {EventlogComponent} from "./eventlog.component";
import {AppService} from "../app.service";

describe('EventlogComponent', () => {
    let component: EventlogComponent;
    let fixture: ComponentFixture<EventlogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                EventlogComponent
            ],
            imports: [
                HttpModule
            ],
            providers: [
                AppService
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventlogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
