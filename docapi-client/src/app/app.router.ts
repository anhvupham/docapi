import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './services/gaurd.service';
import { RegisterComponent } from './register/register.component';

const app_routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

export const app_routing = RouterModule.forRoot(app_routes);
