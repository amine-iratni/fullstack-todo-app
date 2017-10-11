import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
const appRoutes:Routes = [
    {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full'
    },
    {
        path: 'todos',
        loadChildren: './modules/todos/todos.module#TodosModule',
    },
    {
        path: 'auth', 
        loadChildren: './modules/auth/auth.module#AuthModule'
    }
];

export const routes:ModuleWithProviders = RouterModule.forRoot(appRoutes);