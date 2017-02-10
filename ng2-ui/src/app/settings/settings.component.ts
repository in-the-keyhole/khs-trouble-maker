import {Component, OnInit} from "@angular/core";
import {AppService} from "../app.service";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
    private accessToken: string;
    private loadTimeoutMinutes: number;

    constructor(private appService: AppService) {
    }

    ngOnInit() {
        // GET ACCESS TOKEN VALUE
        this.appService.getAccessToken().subscribe(accessToken => {
            this.accessToken = accessToken;
        });

        this.loadTimeoutMinutes = 5;
    }

    // CLOSE SETTINGS
    close(): void {
        this.appService.toggleSettings(false);
    }
}
