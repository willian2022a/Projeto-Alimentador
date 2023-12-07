
import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { LoginComponent } from "./login/login.component";
import { RegistroComponent } from "./registro/registro.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./guards/auth-guard";

const APP_ROUTES: Routes = [
	{
		path: 'registros', 
		component: RegistroComponent,
		canActivate: [AuthGuard]
	},

	{ path: 'login', 
		component: LoginComponent },

	{ path: '', 
		component: HomeComponent, 
		canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(APP_ROUTES);
