import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from './auth-guard';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
