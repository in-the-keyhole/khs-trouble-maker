import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EurekaServiceComponent} from "./eurekaservice.component";
import {EventlogModule} from "../eventlog/eventlog.module";
import {SettingsModule} from "../settings/settings.module";
import {EmailModule} from "../email/email.module";
import {ModalModule} from "angular2-modal";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";

@NgModule({
    imports: [
        CommonModule,
        EventlogModule,
        SettingsModule,
        EmailModule,
        ModalModule.forRoot(),
        BootstrapModalModule
    ],
    exports: [
        EurekaServiceComponent
    ],
    declarations: [
        EurekaServiceComponent
    ]
})

export class EurekaServiceModule {
}