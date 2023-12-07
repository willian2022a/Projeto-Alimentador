import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegistroComponent } from "./registro/registro.component";
import { HomeComponent } from "./home/home.component";

const APP_ROUTES: Routes = [
    { path: 'registros', component: RegistroComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
}) 

export class AppRoutingModule {}