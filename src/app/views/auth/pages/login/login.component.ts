import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '../../../../core/services/navigation.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth.service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
title="Connexion"
subtitle="Accédez gratuitement à votre espace Sica Conseil Int"
  constructor(
    private fb: FormBuilder,
        private authService:AuthService,
        private toastrService:ToastrService,
        private navigationService: NavigationService,
        private lsService:LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  handleSubmit() {
    if (this.loginForm.valid) {


        this.authService.login(this.loginForm.value).subscribe((res:any)=>{
          this.toastrService.success(res.message)

          this.lsService.set(GlobalName.tokenName,res.data.access_token)

            this.authService.me().subscribe((res:any)=>{
          this.toastrService.success(res.message)

          this.lsService.set(GlobalName.userName,res.data)
                this.navigationService.navigate('/customer/dashboard');

    
        },
        (err:any)=>{
    
          console.log(err)
            AppSweetAlert.simpleAlert("error","Connexion",err.error.message)
        })
    
        },
        (err:any)=>{
    
          console.log(err)
            AppSweetAlert.simpleAlert("error","Connexion",err.error.message)
        })
    }
  }

  navigate(path: string) {
    this.navigationService.navigate(path);
  }
}
