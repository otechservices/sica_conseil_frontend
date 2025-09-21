import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthHeaderComponent } from './auth-layout/includes/auth-header/auth-header.component';
import { AuthFooterComponent } from './auth-layout/includes/auth-footer/auth-footer.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';



@NgModule({
  declarations: [
    AuthHeaderComponent,
    AuthFooterComponent,
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
