import {NgModule} from '@angular/core';

import { routing } from "../auth/auth.routes";

import { AuthPageComponent } from "../auth/pages/auth.page";
import { SharedModule } from "../../shared/shared.module";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        SharedModule,
        routing,

        NgbModule.forRoot()
    ],
    declarations: [
        AuthPageComponent
    ],
    exports: [
        
    ]
})
export class AuthModule {
    
}