import { NgModule} from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from "@angular/forms";

import { NavbarComponent } from "../shared/components/navbar/navbar.component";

import {AuthenticatedGuard} from "../shared/guards/authenticated.guard";
import {UnauthenticatedGuard} from "../shared/guards/unauthenticated.guard";

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        NavbarComponent
    ],
    exports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NavbarComponent
    ], 
    providers: [
        AuthenticatedGuard,
        UnauthenticatedGuard
    ]
})
export class SharedModule {
    constructor() {
    }
}