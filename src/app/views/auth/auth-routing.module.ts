import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { IsVerifiedAccountStateGuard } from '../../core/guards/is-verified-account-state.guard';

const routes: Routes = [

    { 
      path: '', 
      component: AuthLayoutComponent, 
    //  canActivate:[AuthGuard,IsVerifiedAccountStateGuard],
      children:[
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
